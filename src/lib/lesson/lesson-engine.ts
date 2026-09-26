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
  /** One postponed retry for each question missed on the first pass. */
  retryQueue?: string[];
  retryCursor?: number;
  /** Already submitted delayed retries, used to resume safely after reload. */
  retryResults?: string[];
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
  if (session.currentIndex >= lesson.flow.length) {
    const nextCursor = (session.retryCursor ?? 0) + 1;
    return {
      ...session,
      retryCursor: nextCursor,
      status: nextCursor >= (session.retryQueue?.length ?? 0) ? "completed" : "active",
    };
  }
  const nextIndex = session.currentIndex + 1;
  if (nextIndex >= lesson.flow.length) {
    const retryQueue = session.answers.filter((answer) => !answer.correct).map((answer) => answer.questionId);
    return {
      ...session,
      currentIndex: nextIndex,
      retryQueue,
      retryCursor: 0,
      retryResults: [],
      status: retryQueue.length ? "active" : "completed",
    };
  }
  return { ...session, currentIndex: nextIndex, status: "active" };
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

/** Delayed retries never overwrite first-pass correctness or first-pass XP. */
export function recordDelayedRetry(session: LessonSession, questionId: string): LessonSession {
  if (session.retryQueue?.[session.retryCursor ?? 0] !== questionId)
    throw new Error("Unexpected delayed retry question");
  return {...session, retryResults: [...new Set([...(session.retryResults ?? []), questionId])]};
}
