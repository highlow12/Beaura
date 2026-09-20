import { describe, expect, it } from "vitest";
import { layoutCurriculumDag } from "../../src/lib/curriculum/dag-layout";
import type { CurriculumNode } from "../../src/lib/content/types";

const nodes: CurriculumNode[] = [
  { lesson: "root", requires: [] },
  { lesson: "left", requires: ["root"] },
  { lesson: "right", requires: ["root"] },
  { lesson: "merge", requires: ["left", "right"] },
  { lesson: "cross-track", requires: ["outside"] },
  { lesson: "outside", requires: [] },
  { lesson: "outside-parent", requires: [] },
  { lesson: "outside-child", requires: ["outside-parent"] },
  { lesson: "needs-outside-child", requires: ["outside-child"] },
  { lesson: "late-root", requires: [] },
  { lesson: "late-middle", requires: ["late-root"] },
  { lesson: "late-target", requires: ["late-middle", "late-outside"] },
  { lesson: "late-outside", requires: [] },
];

describe("curriculum DAG layout", () => {
  it("uses a top-to-bottom layered layout for branch and merge dependencies", async () => {
    const layout = await layoutCurriculumDag(
      ["root", "left", "right", "merge"],
      nodes,
      {
        nodeWidth: 100,
        nodeHeight: 50,
        horizontalGap: 12,
        verticalGap: 18,
        padding: 10,
      },
    );

    const byId = new Map(layout.nodes.map((node) => [node.id, node]));
    expect(layout.nodes.map(({ id, rank }) => ({ id, rank }))).toEqual([
      { id: "root", rank: 0 },
      { id: "left", rank: 1 },
      { id: "right", rank: 1 },
      { id: "merge", rank: 2 },
    ]);
    expect(byId.get("root")!.y).toBeLessThan(byId.get("left")!.y);
    expect(byId.get("root")!.y).toBeLessThan(byId.get("right")!.y);
    expect(byId.get("left")!.y).toBeLessThan(byId.get("merge")!.y);
    expect(byId.get("right")!.y).toBeLessThan(byId.get("merge")!.y);
    expect(byId.get("left")!.x).not.toBe(byId.get("right")!.x);
    expect(layout.width).toBeGreaterThan(0);
    expect(layout.height).toBeGreaterThan(0);
    expect(
      layout.edges.map(({ sourceId, targetId }) => [sourceId, targetId]),
    ).toEqual([
      ["root", "left"],
      ["root", "right"],
      ["left", "merge"],
      ["right", "merge"],
    ]);
    expect(layout.edges.every((edge) => edge.path.startsWith("M "))).toBe(true);
    for (const node of layout.nodes) {
      expect((node.y - 10) % (50 + 18)).toBe(0);
    }
  });

  it("renders direct external prerequisites above the selected track", async () => {
    const layout = await layoutCurriculumDag(["cross-track"], nodes);
    expect(layout.nodes).toEqual([
      expect.objectContaining({
        id: "outside",
        isExternal: true,
        rank: 0,
        prerequisites: [],
      }),
      expect.objectContaining({
        id: "cross-track",
        isExternal: false,
        rank: 1,
        externalPrerequisiteCount: 1,
        prerequisites: ["outside"],
      }),
    ]);
    expect(layout.edges).toEqual([
      expect.objectContaining({ sourceId: "outside", targetId: "cross-track" }),
    ]);
  });

  it("does not expand prerequisites of an external prerequisite", async () => {
    const layout = await layoutCurriculumDag(["needs-outside-child"], nodes);
    expect(layout.nodes.map((node) => node.id)).toEqual([
      "outside-child",
      "needs-outside-child",
    ]);
    expect(layout.nodes.some((node) => node.id === "outside-parent")).toBe(
      false,
    );
    expect(
      layout.edges.map(({ sourceId, targetId }) => [sourceId, targetId]),
    ).toEqual([["outside-child", "needs-outside-child"]]);
  });

  it("places an external prerequisite near a later lesson instead of the top row", async () => {
    const layout = await layoutCurriculumDag(
      ["late-root", "late-middle", "late-target"],
      nodes,
    );
    const byId = new Map(layout.nodes.map((node) => [node.id, node]));

    expect(byId.get("late-root")?.rank).toBe(0);
    expect(byId.get("late-outside")?.rank).toBe(1);
    expect(byId.get("late-middle")?.rank).toBe(1);
    expect(byId.get("late-target")?.rank).toBe(2);
  });

  it("is deterministic for duplicate lesson ids and missing curriculum entries", async () => {
    const layout = await layoutCurriculumDag(
      ["root", "root", "unknown"],
      nodes,
    );
    expect(layout.nodes.map((node) => node.id)).toEqual(["root", "unknown"]);
    expect(layout.nodes.find((node) => node.id === "unknown")?.rank).toBe(0);
  });
});
