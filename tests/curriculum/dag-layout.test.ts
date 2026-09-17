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
  });

  it("retains external prerequisites as node metadata while laying out the selected track", async () => {
    const layout = await layoutCurriculumDag(["cross-track"], nodes);
    expect(layout.nodes).toEqual([
      expect.objectContaining({
        id: "cross-track",
        rank: 0,
        externalPrerequisiteCount: 1,
        prerequisites: [],
      }),
    ]);
    expect(layout.edges).toEqual([]);
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
