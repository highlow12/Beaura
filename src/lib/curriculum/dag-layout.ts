import ELK from "elkjs/lib/elk.bundled.js";
import type { ElkNode } from "elkjs/lib/elk-api";
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

const elk = new ELK();

export function emptyCurriculumDagLayout(): DagLayout {
  return {
    width: 0,
    height: 0,
    rankCount: 0,
    laneCount: 0,
    nodes: [],
    edges: [],
  };
}

/**
 * Arrange a subset of curriculum nodes with ELK's layered layout.
 *
 * ELK chooses a readable horizontal order, then nodes are projected onto a
 * card-sized grid so every row and column aligns exactly.
 */
export async function layoutCurriculumDag(
  lessonIds: readonly string[],
  curriculumNodes: readonly CurriculumNode[],
  options: DagLayoutOptions = {},
): Promise<DagLayout> {
  const config = { ...DEFAULTS, ...options };
  const ids = uniqueIds(lessonIds);
  if (!ids.length) return emptyCurriculumDagLayout();

  const selected = new Set(ids);
  const sourceById = new Map(
    curriculumNodes.map((node) => [node.lesson, node]),
  );
  const order = new Map(ids.map((id, index) => [id, index]));
  const prerequisites = new Map<string, string[]>();
  const edgeMetadata = new Map<
    string,
    { sourceId: string; targetId: string }
  >();
  const elkEdges: {
    id: string;
    sources: string[];
    targets: string[];
  }[] = [];

  let edgeIndex = 0;
  for (const id of ids) {
    const required = sourceById.get(id)?.requires ?? [];
    const inGraph = required.filter((requiredId) => selected.has(requiredId));
    prerequisites.set(id, inGraph);

    for (const requiredId of inGraph) {
      const edgeId = `dependency-${edgeIndex++}`;
      elkEdges.push({
        id: edgeId,
        sources: [requiredId],
        targets: [id],
      });
      edgeMetadata.set(edgeId, { sourceId: requiredId, targetId: id });
    }
  }

  const graph: ElkNode = {
    id: "curriculum",
    layoutOptions: {
      "elk.algorithm": "layered",
      "elk.direction": "DOWN",
      "elk.edgeRouting": "ORTHOGONAL",
      "elk.spacing.nodeNode": String(config.horizontalGap),
      "elk.layered.spacing.nodeNodeBetweenLayers": String(config.verticalGap),
      "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
      "elk.padding": paddingOption(config.padding),
    },
    children: ids.map((id) => ({
      id,
      width: config.nodeWidth,
      height: config.nodeHeight,
    })),
    edges: elkEdges,
  };
  const result = await elk.layout(graph);

  const resultById = new Map(
    (result.children ?? []).map((node) => [node.id, node]),
  );
  const dependents = deriveDependents(ids, prerequisites);
  const ranks = deriveRanks(ids, prerequisites, dependents, order);
  const lanes = deriveLanes(ids, ranks, resultById, order);
  const rankCount = Math.max(1, ...[...ranks.values()].map((rank) => rank + 1));
  const rankSizes = Array.from(
    { length: rankCount },
    (_, rank) => ids.filter((id) => ranks.get(id) === rank).length,
  );
  const laneCount = Math.max(1, ...rankSizes);
  const horizontalPitch = config.nodeWidth + config.horizontalGap;
  const verticalPitch = config.nodeHeight + config.verticalGap;

  const nodes = ids.map<DagLayoutNode>((id) => {
    const rank = ranks.get(id) ?? 0;
    const lane = lanes.get(id) ?? 0;
    const rowOffset = (laneCount - (rankSizes[rank] ?? 1)) / 2;
    return {
      id,
      rank,
      lane,
      x: config.padding + (lane + rowOffset) * horizontalPitch,
      y: config.padding + rank * verticalPitch,
      width: config.nodeWidth,
      height: config.nodeHeight,
      prerequisites: prerequisites.get(id) ?? [],
      externalPrerequisiteCount: (sourceById.get(id)?.requires ?? []).filter(
        (requiredId) => !selected.has(requiredId),
      ).length,
    };
  });
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const edges = elkEdges.map<DagLayoutEdge>((edge) => {
    const metadata = edgeMetadata.get(edge.id)!;
    const source = nodeById.get(metadata.sourceId)!;
    const target = nodeById.get(metadata.targetId)!;
    return {
      ...metadata,
      path: dependencyPath(source, target),
    };
  });

  return {
    width: contentWidth(nodes, config.padding),
    height: contentHeight(nodes, config.padding),
    rankCount,
    laneCount,
    nodes,
    edges,
  };
}

function uniqueIds(ids: readonly string[]): string[] {
  return [...new Set(ids.filter((id) => id.trim().length > 0))];
}

function paddingOption(padding: number): string {
  return `[top=${padding},left=${padding},bottom=${padding},right=${padding}]`;
}

function deriveDependents(
  ids: readonly string[],
  prerequisites: ReadonlyMap<string, readonly string[]>,
): Map<string, string[]> {
  const dependents = new Map<string, string[]>();
  for (const id of ids) {
    for (const prerequisite of prerequisites.get(id) ?? []) {
      const children = dependents.get(prerequisite) ?? [];
      children.push(id);
      dependents.set(prerequisite, children);
    }
  }
  return dependents;
}

function deriveRanks(
  ids: readonly string[],
  prerequisites: ReadonlyMap<string, readonly string[]>,
  dependents: ReadonlyMap<string, readonly string[]>,
  order: ReadonlyMap<string, number>,
): Map<string, number> {
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

  if (processed.size !== ids.length) {
    const fallbackRank = Math.max(...ranks.values(), 0) + 1;
    ids
      .filter((id) => !processed.has(id))
      .sort((left, right) => (order.get(left) ?? 0) - (order.get(right) ?? 0))
      .forEach((id, index) => ranks.set(id, fallbackRank + index));
  }

  return ranks;
}

function deriveLanes<T extends { x?: number }>(
  ids: readonly string[],
  ranks: ReadonlyMap<string, number>,
  resultById: ReadonlyMap<string, T>,
  order: ReadonlyMap<string, number>,
): Map<string, number> {
  const lanes = new Map<string, number>();
  const groups = new Map<number, string[]>();

  for (const id of ids) {
    const rank = ranks.get(id) ?? 0;
    const group = groups.get(rank) ?? [];
    group.push(id);
    groups.set(rank, group);
  }

  for (const group of groups.values()) {
    group.sort((left, right) => {
      const leftX = resultById.get(left)?.x;
      const rightX = resultById.get(right)?.x;
      if (leftX !== undefined && rightX !== undefined && leftX !== rightX) {
        return leftX - rightX;
      }
      return (order.get(left) ?? 0) - (order.get(right) ?? 0);
    });
    group.forEach((id, lane) => lanes.set(id, lane));
  }

  return lanes;
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

function contentWidth(
  nodes: readonly DagLayoutNode[],
  padding: number,
): number {
  return Math.max(
    padding * 2,
    ...nodes.map((node) => node.x + node.width + padding),
  );
}

function contentHeight(
  nodes: readonly DagLayoutNode[],
  padding: number,
): number {
  return Math.max(
    padding * 2,
    ...nodes.map((node) => node.y + node.height + padding),
  );
}
