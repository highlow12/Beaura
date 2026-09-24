import { describe, expect, it } from "vitest";
import {
  advanceLesson,
  createLessonSession,
  retreatLesson,
  previousContentIndex,
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

  it("skips questions and finds the nearest earlier explanation without altering progress", () => {
    const mixed: Lesson = {...lesson,flow:[
      {type:"content",blocks:[]},
      {type:"question",ref:"q1"},
      {type:"content",blocks:[]},
      {type:"question",ref:"q2"},
      {type:"question",ref:"q3"},
    ]};
    const session = {...createLessonSession(mixed),currentIndex:4};
    expect(previousContentIndex(mixed,session.currentIndex)).toBe(2);
    expect(previousContentIndex(mixed,2)).toBe(0);
    expect(previousContentIndex(mixed,0)).toBe(-1);
    expect(session.currentIndex).toBe(4);
  });

  it("does not move before the first step", () => {
    const session = createLessonSession(lesson);

    expect(retreatLesson(session).currentIndex).toBe(0);
  });
});
