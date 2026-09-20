import { describe, expect, it } from "vitest";
import {
  advanceLesson,
  createLessonSession,
  retreatLesson,
} from "../../src/lib/lesson/lesson-engine";
import type { Lesson } from "../../src/lib/content/types";

const lesson: Lesson = {
  schemaVersion: 1,
  id: "lesson.navigation",
  revision: 1,
  track: "test",
  title: "Navigation",
  description: "Lesson navigation fixture",
  flow: [
    { type: "content", blocks: [] },
    { type: "content", blocks: [] },
  ],
};

describe("lesson navigation", () => {
  it("moves an active session back one step", () => {
    const session = advanceLesson(createLessonSession(lesson), lesson);

    expect(retreatLesson(session)).toEqual(
      expect.objectContaining({ currentIndex: 0, status: "active" }),
    );
  });

  it("does not move before the first step", () => {
    const session = createLessonSession(lesson);

    expect(retreatLesson(session).currentIndex).toBe(0);
  });
});
