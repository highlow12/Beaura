import type { CurriculumNode } from "$lib/content/types";

export interface DagLayoutOptions {
  nodeWidth?: number;
  nodeHeight?: number;
  horizontalGap?: number;
  verticalGap?: number;
  padding?: number;
}

export interface DagLayoutNode {
  id: string;
  rank: number;
  lane: number;
  x: number;
  y: number;
  width: number;
  height: number;
  prerequisites: string[];
  externalPrerequisiteCount: number;
}

export interface DagLayoutEdge {
  sourceId: string;
  targetId: string;
  path: string;
}

export interface DagLayout {
  width: number;
  height: number;
  rankCount: number;
  laneCount: number;
  nodes: DagLayoutNode[];
  edges: DagLayoutEdge[];
}

const DEFAULTS: Required<DagLayoutOptions> = {
  nodeWidth: 136,
  nodeHeight: 84,
  horizontalGap: 20,
  verticalGap: 28,
  padding: 16,
};

/**
 * Arrange a subset of curriculum nodes as a top-to-bottom dependency graph.
 *
 * Ranks are calculated from the actual `requires` edges. Requirements outside
 * the selected subset remain metadata on the node, so a track can be viewed
 * on its own without pretending that cross-track prerequisites do not exist.
 * The helper is intentionally independent from lesson state and the DOM so it
 * can be reused by other curriculum surfaces and tested with small fixtures.
 */
export function layoutCurriculumDag(
  lessonIds: readonly string[],
  curriculumNodes: readonly CurriculumNode[],
  options: DagLayoutOptions = {},
): DagLayout {
  const config = { ...DEFAULTS, ...options };
  const ids = uniqueIds(lessonIds);
  const selected = new Set(ids);
  const order = new Map(ids.map((id, index) => [id, index]));
  const sourceById = new Map(
    curriculumNodes.map((node) => [node.lesson, node]),
  );
  const prerequisites = new Map<string, string[]>();
  const dependents = new Map<string, string[]>();

  for (const id of ids) {
    const source = sourceById.get(id);
    const required = source?.requires ?? [];
    const inGraph = required.filter((requiredId) => selected.has(requiredId));
    prerequisites.set(id, inGraph);
    for (const requiredId of inGraph) {
      const children = dependents.get(requiredId) ?? [];
      children.push(id);
      dependents.set(requiredId, children);
    }
  }

  const indegree = new Map(
    ids.map((id) => [id, prerequisites.get(id)?.length ?? 0]),
  );
  const ranks = new Map(ids.map((id) => [id, 0]));
  const ready = ids.filter((id) => indegree.get(id) === 0);
  const processed = new Set<string>();

  while (ready.length) {
    ready.sort(
      (left, right) => (order.get(left) ?? 0) - (order.get(right) ?? 0),
    );
    const id = ready.shift()!;
    processed.add(id);
    for (const child of dependents.get(id) ?? []) {
      ranks.set(
        child,
        Math.max(ranks.get(child) ?? 0, (ranks.get(id) ?? 0) + 1),
      );
      const nextIndegree = (indegree.get(child) ?? 0) - 1;
      indegree.set(child, nextIndegree);
      if (nextIndegree === 0) ready.push(child);
    }
  }

  // Content validation rejects cycles, but keep the layout finite and
  // deterministic if a partially edited curriculum reaches this helper.
  if (processed.size !== ids.length) {
    const fallbackRank = Math.max(...ranks.values(), 0) + 1;
    ids
      .filter((id) => !processed.has(id))
      .sort((left, right) => (order.get(left) ?? 0) - (order.get(right) ?? 0))
      .forEach((id, index) => ranks.set(id, fallbackRank + index));
  }

  const groups = new Map<number, string[]>();
  for (const id of ids) {
    const rank = ranks.get(id) ?? 0;
    const group = groups.get(rank) ?? [];
    group.push(id);
    groups.set(rank, group);
  }

  const laneById = new Map<string, number>();
  const sortedRanks = [...groups.keys()].sort((left, right) => left - right);
  for (const rank of sortedRanks) {
    const group = groups.get(rank)!;
    group.sort((left, right) => {
      const leftParents = prerequisites.get(left) ?? [];
      const rightParents = prerequisites.get(right) ?? [];
      const leftCenter = average(leftParents.map((id) => laneById.get(id)));
      const rightCenter = average(rightParents.map((id) => laneById.get(id)));
      return (
        leftCenter - rightCenter ||
        (order.get(left) ?? 0) - (order.get(right) ?? 0)
      );
    });
    group.forEach((id, lane) => laneById.set(id, lane));
  }

  const maxLanes = Math.max(
    1,
    ...[...groups.values()].map((group) => group.length),
  );
  const nodes = ids.map<DagLayoutNode>((id) => {
    const rank = ranks.get(id) ?? 0;
    const lane = laneById.get(id) ?? 0;
    const rankSize = groups.get(rank)?.length ?? 1;
    const centeredOffset =
      ((maxLanes - rankSize) * (config.nodeWidth + config.horizontalGap)) / 2;
    const source = sourceById.get(id);
    const required = source?.requires ?? [];
    return {
      id,
      rank,
      lane,
      x:
        config.padding +
        centeredOffset +
        lane * (config.nodeWidth + config.horizontalGap),
      y: config.padding + rank * (config.nodeHeight + config.verticalGap),
      width: config.nodeWidth,
      height: config.nodeHeight,
      prerequisites: prerequisites.get(id) ?? [],
      externalPrerequisiteCount: required.filter(
        (requiredId) => !selected.has(requiredId),
      ).length,
    };
  });
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const edges: DagLayoutEdge[] = [];

  for (const target of nodes) {
    for (const sourceId of target.prerequisites) {
      const source = nodeById.get(sourceId);
      if (!source) continue;
      edges.push({
        sourceId,
        targetId: target.id,
        path: dependencyPath(source, target),
      });
    }
  }

  return {
    width:
      config.padding * 2 +
      maxLanes * config.nodeWidth +
      Math.max(0, maxLanes - 1) * config.horizontalGap,
    height:
      config.padding * 2 +
      Math.max(1, sortedRanks.length) * config.nodeHeight +
      Math.max(0, sortedRanks.length - 1) * config.verticalGap,
    rankCount: Math.max(1, sortedRanks.length),
    laneCount: maxLanes,
    nodes,
    edges,
  };
}

function uniqueIds(ids: readonly string[]): string[] {
  return [...new Set(ids.filter((id) => id.trim().length > 0))];
}

function average(values: (number | undefined)[]): number {
  const defined = values.filter(
    (value): value is number => value !== undefined,
  );
  return defined.length
    ? defined.reduce((sum, value) => sum + value, 0) / defined.length
    : 0;
}

function dependencyPath(source: DagLayoutNode, target: DagLayoutNode): string {
  const sourceX = source.x + source.width / 2;
  const sourceY = source.y + source.height;
  const targetX = target.x + target.width / 2;
  const targetY = target.y;
  if (sourceX === targetX) return `M ${sourceX} ${sourceY} V ${targetY}`;
  const middleY = sourceY + (targetY - sourceY) / 2;
  return `M ${sourceX} ${sourceY} V ${middleY} H ${targetX} V ${targetY}`;
}
