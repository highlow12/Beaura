import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { describe, expect, it } from "vitest";

type CacheRequest = string | URL | { url: string };

function worker(
  options: {
    rejectRuntimeWrite?: boolean;
    scope?: string;
    version?: string;
    seedCaches?: string[];
    migrationMarker?: boolean;
    clientUrls?: string[];
  } = {},
) {
  const handlers = new Map<string, (event: Record<string, unknown>) => void>();
  const stored = new Map<string, Map<string, Response>>();
  const scope = options.scope ?? "https://app.test/";
  const origin = new URL(scope).origin;
  const basePath = new URL(scope).pathname.replace(/\/$/, "");
  const migrationCache = "cs-duolingo-migrations";
  const markerUrl = new URL("migration-pages-base-path-v2", scope).href;
  const calls: string[] = [];
  const messages: unknown[] = [];
  const clients = (options.clientUrls ?? []).map((url) => ({
    url,
    postMessage: (message: unknown) => messages.push(message),
    navigate: (nextUrl: string) => {
      calls.push(`navigate:${nextUrl}`);
      return Promise.resolve();
    },
  }));
  const contentFiles = [
    `${basePath}/generated/manifest.json`,
    `${basePath}/generated/catalog.json`,
    ...Array.from(
      { length: 24 },
      (_, i) => `${basePath}/generated/questions/test-${i}.json`,
    ),
    `${basePath}/generated/questions/unvisited.json`,
  ];
  let online = true;
  let largestAddAllBatch = 0;
  const normalize = (request: CacheRequest) =>
    new URL(
      typeof request === "string"
        ? request
        : request instanceof URL
          ? request.href
          : request.url,
      scope,
    ).href;
  for (const name of options.seedCaches ?? []) stored.set(name, new Map());
  if (options.migrationMarker) {
    if (!stored.has(migrationCache)) stored.set(migrationCache, new Map());
    stored.get(migrationCache)!.set(markerUrl, new Response("complete"));
  }

  const fetcher = async (request: CacheRequest) => {
    const url = normalize(request);
    calls.push(`fetch:${url}`);
    if (!online) throw new Error("offline");
    return new Response(url);
  };
  const cacheHandle = (name: string) => {
    if (!stored.has(name)) stored.set(name, new Map());
    const entries = stored.get(name)!;
    return {
      match: async (request: CacheRequest) =>
        entries.get(normalize(request))?.clone(),
      put: async (request: CacheRequest, response: Response) => {
        if (options.rejectRuntimeWrite) throw new Error("QuotaExceededError");
        entries.set(normalize(request), response);
      },
      add: async (request: CacheRequest) =>
        entries.set(normalize(request), await fetcher(request)),
      addAll: async (requests: string[]) => {
        largestAddAllBatch = Math.max(largestAddAllBatch, requests.length);
        for (const request of requests)
          entries.set(normalize(request), await fetcher(request));
      },
    };
  };
  const cachesMock = {
    open: async (name: string) => cacheHandle(name),
    keys: async () => [...stored.keys()],
    delete: async (name: string) => {
      calls.push(`delete:${name}`);
      return stored.delete(name);
    },
  };
  const source = readFileSync("src/service-worker.ts", "utf8").replace(
    /import[^;]+from "\$service-worker";/,
    `const build=[${JSON.stringify(`${basePath}/_app/start.js`)}];const files=${JSON.stringify(contentFiles)};const version=${JSON.stringify(options.version ?? "test")};`,
  );
  vm.runInNewContext(
    ts.transpile(source, {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.None,
    }),
    {
      URL,
      Response,
      caches: cachesMock,
      fetch: fetcher,
      self: {
        location: { origin },
        registration: { scope },
        skipWaiting: async () => calls.push("skipWaiting"),
        clients: {
          claim: async () => calls.push("claim"),
          matchAll: async () => clients,
        },
        addEventListener: (
          name: string,
          handler: (event: Record<string, unknown>) => void,
        ) => handlers.set(name, handler),
      },
    },
  );

  async function lifecycle(name: string, data?: unknown) {
    const handler = handlers.get(name);
    if (!handler) throw new Error(`No ${name} handler was registered`);
    let pending: Promise<unknown> | undefined;
    handler({
      data,
      waitUntil: (promise: Promise<unknown>) => (pending = promise),
    });
    if (!pending) throw new Error(`${name} did not register waitUntil`);
    await pending;
  }
  async function request(path: string, mode = "cors") {
    const handler = handlers.get("fetch");
    if (!handler) throw new Error("No fetch handler was registered");
    let pending: Promise<Response> | undefined;
    handler({
      request: { method: "GET", url: `${origin}${path}`, mode },
      respondWith: (promise: Promise<Response>) => (pending = promise),
    });
    if (!pending) throw new Error(`Fetch handler ignored ${path}`);
    return pending;
  }
  return {
    lifecycle,
    request,
    setOffline: () => (online = false),
    cacheNames: () => [...stored.keys()],
    hasMigrationMarker: () =>
      stored.get(migrationCache)?.has(markerUrl) ?? false,
    largestAddAllBatch: () => largestAddAllBatch,
    calls,
    messages,
  };
}

describe("offline installed app", () => {
  it("preloads bounded content and serves the cached shell and unvisited content offline under a base path", async () => {
    const sw = worker({ scope: "https://app.test/Beaura/" });
    await sw.lifecycle("install");
    expect(sw.largestAddAllBatch()).toBeLessThanOrEqual(12);
    const prefetchedUnvisitedContent =
      "https://app.test/Beaura/generated/questions/unvisited.json";
    expect(sw.calls).toContain(`fetch:${prefetchedUnvisitedContent}`);

    sw.setOffline();
    expect(
      await (await sw.request("/Beaura/lesson/unvisited", "navigate")).text(),
    ).toBe("https://app.test/Beaura/");
    expect(
      await (
        await sw.request("/Beaura/generated/questions/unvisited.json")
      ).text(),
    ).toBe(prefetchedUnvisitedContent);
  });

  it("waits for confirmation when an existing migration marker covers an update and removes only obsolete app caches", async () => {
    const sw = worker({
      scope: "https://app.test/Beaura/",
      version: "release-2",
      seedCaches: [
        "cs-duolingo-shell-release-1",
        "cs-duolingo-content-release-1",
        "cs-duolingo-runtime-release-1",
        "foreign-cache",
      ],
      migrationMarker: true,
    });

    await sw.lifecycle("install");
    expect(sw.calls).not.toContain("skipWaiting");
    expect(sw.hasMigrationMarker()).toBe(true);

    await sw.lifecycle("message", { type: "ACTIVATE_UPDATE" });
    expect(sw.calls.filter((item) => item === "skipWaiting")).toHaveLength(1);
    await sw.lifecycle("activate");

    expect(
      sw.calls.filter((item) => item.startsWith("delete:")).sort(),
    ).toEqual([
      "delete:cs-duolingo-content-release-1",
      "delete:cs-duolingo-runtime-release-1",
      "delete:cs-duolingo-shell-release-1",
    ]);
    expect(sw.cacheNames()).toEqual(
      expect.arrayContaining([
        "cs-duolingo-shell-release-2",
        "cs-duolingo-content-release-2",
        "cs-duolingo-migrations",
        "foreign-cache",
      ]),
    );
    expect(sw.calls).toContain("claim");
    expect(sw.calls.filter((item) => item.startsWith("navigate:"))).toEqual([]);
  });

  it("auto-activates once for the base-path migration and navigates existing windows", async () => {
    const clientUrl = "https://app.test/Beaura/lesson/current";
    const sw = worker({
      scope: "https://app.test/Beaura/",
      version: "release-2",
      seedCaches: ["cs-duolingo-shell-release-1", "foreign-cache"],
      clientUrls: [clientUrl],
    });

    await sw.lifecycle("install");
    expect(sw.calls.filter((item) => item === "skipWaiting")).toHaveLength(1);
    expect(sw.hasMigrationMarker()).toBe(true);
    expect(sw.calls.filter((item) => item.startsWith("navigate:"))).toEqual([]);

    await sw.lifecycle("activate");
    expect(sw.calls).toContain(`navigate:${clientUrl}`);
    expect(sw.cacheNames()).toContain("foreign-cache");
    expect(sw.cacheNames()).toContain("cs-duolingo-migrations");
  });

  it("returns an error response and reports an offline miss without the query string", async () => {
    const sw = worker({
      clientUrls: ["https://app.test/Beaura/lesson/current"],
    });
    await sw.lifecycle("install");
    sw.setOffline();

    const response = await sw.request(
      "/Beaura/generated/questions/missing.json?token=not-in-diagnostic",
    );
    expect(response.type).toBe("error");
    expect(response.status).toBe(0);
    expect(sw.messages).toEqual([
      {
        type: "BEAURA_SERVICE_WORKER_FETCH_ERROR",
        kind: "asset",
        path: "/Beaura/generated/questions/missing.json",
      },
    ]);
  });

  it("serves a successful network response when runtime caching is full", async () => {
    const sw = worker({ rejectRuntimeWrite: true });
    expect(await (await sw.request("/uncached-resource")).text()).toBe(
      "https://app.test/uncached-resource",
    );
    expect(sw.calls).toContain("fetch:https://app.test/uncached-resource");
  });
});
