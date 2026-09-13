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
  it("derives ranks and keeps branch/merge edges from curriculum requirements", () => {
    const layout = layoutCurriculumDag(
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

    expect(
      layout.nodes.map(({ id, rank, lane }) => ({ id, rank, lane })),
    ).toEqual([
      { id: "root", rank: 0, lane: 0 },
      { id: "left", rank: 1, lane: 0 },
      { id: "right", rank: 1, lane: 1 },
      { id: "merge", rank: 2, lane: 0 },
    ]);
    expect(
      layout.edges.map(({ sourceId, targetId }) => [sourceId, targetId]),
    ).toEqual([
      ["root", "left"],
      ["root", "right"],
      ["left", "merge"],
      ["right", "merge"],
    ]);
    expect(layout.width).toBe(232);
    expect(layout.height).toBe(206);
    expect(layout.nodes.find((node) => node.id === "root")?.x).toBe(66);
    expect(layout.nodes.find((node) => node.id === "merge")?.x).toBe(66);
    expect(layout.nodes.find((node) => node.id === "left")?.x).toBe(10);
    expect(layout.nodes.find((node) => node.id === "right")?.x).toBe(122);
  });

  it("retains external prerequisites as node metadata while laying out the selected track", () => {
    const layout = layoutCurriculumDag(["cross-track"], nodes);
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

  it("is deterministic for duplicate lesson ids and missing curriculum entries", () => {
    const layout = layoutCurriculumDag(["root", "root", "unknown"], nodes);
    expect(layout.nodes.map((node) => node.id)).toEqual(["root", "unknown"]);
    expect(layout.nodes.find((node) => node.id === "unknown")?.rank).toBe(0);
  });
});
