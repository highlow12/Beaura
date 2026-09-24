import { describe, expect, it } from "vitest";
import {
  advanceLesson,
  createLessonSession,
  retreatLesson,
  previousContentIndex,
  recordAnswer,
  recordDelayedRetry,
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

  it("postpones all first-pass mistakes until the end and completes after one revisit each", () => {
    const mixed: Lesson = {...lesson,flow:[
      {type:"content",blocks:[]},
      {type:"question",ref:"q1"},
      {type:"question",ref:"q2"},
    ]};
    let session = createLessonSession(mixed);
    session = advanceLesson(session,mixed);
    session = recordAnswer(session,"q1",false);
    session = advanceLesson(session,mixed);
    session = recordAnswer(session,"q2",false);
    session = advanceLesson(session,mixed);
    expect(session).toMatchObject({currentIndex:3,status:"active",retryQueue:["q1","q2"],retryCursor:0});
    session = recordDelayedRetry(session,"q1");
    session = advanceLesson(session,mixed);
    expect(session).toMatchObject({status:"active",retryCursor:1,retryResults:["q1"]});
    session = recordDelayedRetry(session,"q2");
    session = advanceLesson(session,mixed);
    expect(session.status).toBe("completed");
    expect(session.answers.map((answer) => answer.correct)).toEqual([false,false]);
  });

  it("does not move before the first step", () => {
    const session = createLessonSession(lesson);

    expect(retreatLesson(session).currentIndex).toBe(0);
  });
});
