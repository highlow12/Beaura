import { describe, expect, it } from "vitest";
import { nextLessonForDashboard } from "../../src/lib/application/dashboard-selection";
import type { Curriculum, Lesson } from "../../src/lib/content/types";
import type { LessonState } from "../../src/lib/learning/domain/states";

const curriculum: Curriculum = {
  schemaVersion: 1,
  tracks: [],
  nodes: [
    { lesson: "python-1", requires: [] },
    { lesson: "arch-1", requires: [] },
    { lesson: "arch-2", requires: ["arch-1"] },
    { lesson: "arch-3", requires: ["arch-2"] },
  ],
};

const lessons = [
  { id: "python-1", track: "python" },
  { id: "arch-1", track: "computer-architecture" },
  { id: "arch-2", track: "computer-architecture" },
  { id: "arch-3", track: "computer-architecture" },
] as Lesson[];

function state(
  lessonId: string,
  status: LessonState["status"],
  lastStudiedAt: number,
): LessonState {
  return {
    lessonId,
    status,
    lastStudiedAt,
  } as LessonState;
}

describe("dashboard lesson selection", () => {
  it("keeps the recommendation inside the most recently studied track", () => {
    const states = [
      state("python-1", "completed", 100),
      state("arch-1", "completed", 200),
    ];

    expect(nextLessonForDashboard(curriculum, lessons, states)?.id).toBe(
      "arch-2",
    );
  });

  it("continues an in-progress lesson in the most recently studied track", () => {
    const states = [
      state("python-1", "in-progress", 100),
      state("arch-1", "in-progress", 200),
    ];

    expect(nextLessonForDashboard(curriculum, lessons, states)?.id).toBe(
      "arch-1",
    );
  });

  it("shows the track's last lesson when that track has no next lesson", () => {
    const states = [
      state("python-1", "completed", 100),
      state("arch-1", "completed", 200),
      state("arch-2", "completed", 300),
      state("arch-3", "completed", 400),
    ];

    expect(nextLessonForDashboard(curriculum, lessons, states)?.id).toBe(
      "arch-3",
    );
  });

  it("uses the existing global first-available fallback with no study history", () => {
    expect(nextLessonForDashboard(curriculum, lessons, [])?.id).toBe(
      "python-1",
    );
  });
});
