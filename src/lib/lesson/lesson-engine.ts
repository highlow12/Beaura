import type { Lesson } from "$lib/content/types";

export interface SessionAnswer {
  questionId: string;
  correct: boolean;
  answeredAt: number;
}

export interface LessonSession {
  lessonId: string;
  contentRevision?: number;
  currentIndex: number;
  status: "active" | "completed";
  answers: SessionAnswer[];
}

export function createLessonSession(lesson: Lesson): LessonSession {
  return {
    lessonId: lesson.id,
    contentRevision: lesson.revision,
    currentIndex: 0,
    status: lesson.flow.length === 0 ? "completed" : "active",
    answers: [],
  };
}

export function advanceLesson(
  session: LessonSession,
  lesson: Lesson,
): LessonSession {
  const nextIndex = session.currentIndex + 1;
  return {
    ...session,
    currentIndex: nextIndex,
    status: nextIndex >= lesson.flow.length ? "completed" : "active",
  };
}

export function retreatLesson(session: LessonSession): LessonSession {
  return {
    ...session,
    currentIndex: Math.max(0, session.currentIndex - 1),
    status: "active",
  };
}

export function recordAnswer(
  session: LessonSession,
  questionId: string,
  correct: boolean,
): LessonSession {
  return {
    ...session,
    answers: [
      ...session.answers,
      { questionId, correct, answeredAt: Date.now() },
    ],
  };
}

/** Find the nearest preceding explanation, skipping all intervening questions. */
export function previousContentIndex(lesson: Lesson, fromIndex: number): number {
  for (let index = fromIndex - 1; index >= 0; index--) {
    if (lesson.flow[index].type === "content") return index;
  }
  return -1;
}
