import "fake-indexeddb/auto";

import { afterEach, describe, expect, it, vi } from "vitest";
import type { Lesson } from "$lib/content/types";
import {
  createLessonSession,
  recordDelayedRetry,
  type LessonSession,
} from "$lib/lesson/lesson-engine";
import type { SingleChoiceQuestion } from "$lib/questions/types";
import { LearningDatabase } from "$lib/storage/db";
import { LearningRepository } from "$lib/storage/repositories/learning-repository";

let database: LearningDatabase | undefined;
let currentTime = Date.UTC(2026, 0, 1, 12);
let databaseCounter = 0;

const prompt = [{ type: "text" as const, text: "문제" }];

function question(
  id: string,
  revision = 1,
  lessonId = "lesson.one",
): SingleChoiceQuestion {
  return {
    schemaVersion: 1,
    id,
    lessonId,
    revision,
    type: "single-choice",
    prompt,
    options: [
      { id: "yes", content: prompt },
      { id: "no", content: prompt },
    ],
    correctOptionId: "yes",
    shuffleOptions: false,
  };
}

function lesson(id = "lesson.one", revision = 1): Lesson {
  return {
    schemaVersion: 1,
    id,
    revision,
    track: "python",
    title: "레슨",
    description: "테스트 레슨",
    flow: [
      { type: "content", blocks: prompt },
      { type: "question", ref: `${id}.q1` },
      { type: "question", ref: `${id}.q2` },
    ],
  };
}

function repository(
  name = `learning-test-${databaseCounter++}`,
): LearningRepository {
  database = new LearningDatabase(name);
  return new LearningRepository({
    database,
    clock: () => currentTime,
    userId: "test-user",
    deviceId: "test-device",
  });
}

async function closeDatabase(): Promise<void> {
  if (!database) return;
  const current = database;
  database = undefined;
  current.close();
  await current.delete();
}

afterEach(async () => {
  vi.restoreAllMocks();
  await closeDatabase();
  currentTime = Date.UTC(2026, 0, 1, 12);
});

describe("LearningRepository", () => {
  it("persists attempts when reopened with a new database instance", async () => {
    const first = repository();
    const q = question("lesson.one.q1");
    await first.saveAttempt({
      id: "attempt:persist",
      question: q,
      correct: true,
      durationMs: 250,
      mode: "lesson",
    });
    const before = await first.getSnapshot();
    const name = first.database.name;
    first.database.close();
    database = undefined;

    const reopenedDatabase = new LearningDatabase(name);
    database = reopenedDatabase;
    const reopened = new LearningRepository({
      database: reopenedDatabase,
      clock: () => currentTime,
      userId: "different-user-is-ignored-after-open",
      deviceId: "different-device-is-ignored-after-open",
    });
    await expect(reopened.getSnapshot()).resolves.toMatchObject(before);
    await expect(reopenedDatabase.studyEvents.count()).resolves.toBe(1);
    await expect(reopenedDatabase.questionStates.count()).resolves.toBe(1);
  });

  it("persists a lesson answer in the attempt transaction before session advancement", async () => {
    const first = repository();
    const currentLesson = lesson();
    await first.startLesson(currentLesson);
    const q = question(`${currentLesson.id}.q1`);
    await first.saveAttempt({
      id: "attempt:crash-window",
      question: q,
      correct: true,
      durationMs: 100,
      mode: "lesson",
    });
    const name = first.database.name;
    first.database.close();
    database = undefined;

    const reopenedDatabase = new LearningDatabase(name);
    database = reopenedDatabase;
    const reopened = new LearningRepository({
      database: reopenedDatabase,
      clock: () => currentTime,
    });
    await expect(reopened.startLesson(currentLesson)).resolves.toMatchObject({
      currentIndex: 0,
      status: "active",
      answers: [{ questionId: q.id, correct: true }],
    });
  });

  it("keeps delayed retries separate from first-pass lesson stats and XP", async () => {
    const repo = repository();
    const baseLesson = lesson();
    const currentLesson: Lesson = {
      ...baseLesson,
      flow: [
        { type: "content", blocks: prompt },
        { type: "question", ref: `${baseLesson.id}.q1` },
      ],
    };
    const q = question(`${currentLesson.id}.q1`);
    let session = await repo.startLesson(currentLesson);

    await repo.saveAttempt({
      id: "attempt:first-pass-wrong",
      question: q,
      correct: false,
      durationMs: 100,
      mode: "lesson",
      attemptNumber: 1,
    });
    session = await repo.startLesson(currentLesson);
    session = {
      ...session,
      currentIndex: currentLesson.flow.length,
      status: "active",
      retryQueue: [q.id],
      retryCursor: 0,
      retryResults: [],
    };
    await repo.saveSession(session);

    await repo.saveAttempt({
      id: "attempt:delayed-retry-correct",
      question: q,
      correct: true,
      durationMs: 80,
      mode: "lesson",
      attemptNumber: 2,
    });

    await expect(repo.startLesson(currentLesson)).resolves.toMatchObject({
      answers: [{ questionId: q.id, correct: false }],
      retryQueue: [q.id],
      retryCursor: 0,
      retryResults: [q.id],
    });
    const afterRetry = await repo.getSnapshot();
    expect(afterRetry.lessonStates.find((state) => state.lessonId === currentLesson.id)).toMatchObject({
      attemptedQuestions: 1,
      completedQuestions: 1,
      correctCount: 0,
      incorrectCount: 1,
    });
    expect(afterRetry.game.xp).toBe(0);

    const backup = await repo.exportBackup();
    await repo.resetProgress();
    await repo.importBackup(backup);
    const restored = await repo.getSnapshot();
    expect(restored.lessonStates.find((state) => state.lessonId === currentLesson.id)).toMatchObject({
      attemptedQuestions: 1,
      completedQuestions: 1,
      correctCount: 0,
      incorrectCount: 1,
    });
    expect(restored.game.xp).toBe(0);
    await expect(repo.startLesson(currentLesson)).resolves.toMatchObject({
      answers: [{ questionId: q.id, correct: false }],
      retryResults: [q.id],
    });
  });

  it("makes saveAttempt idempotent for the same event id", async () => {
    const repo = repository();
    const q = question("lesson.one.q1");
    const input = {
      id: "attempt:idempotent",
      question: q,
      correct: true,
      durationMs: 50,
      mode: "review" as const,
    };

    await repo.saveAttempt(input);
    await repo.saveAttempt(input);

    const events = await repo.database.studyEvents.toArray();
    const state = await repo.database.questionStates.get(q.id);
    expect(events).toHaveLength(1);
    expect(state?.stateVersion).toBe(1);
    expect((await repo.getSnapshot()).game.xp).toBe(10);
  });

  it("rolls back every write when an attempt transaction fails", async () => {
    const repo = repository();
    const q = question("lesson.one.q1");
    vi.spyOn(repo.database.questionStates, "put").mockRejectedValue(
      new Error("injected state write failure"),
    );

    await expect(
      repo.saveAttempt({
        id: "attempt:rollback",
        question: q,
        correct: true,
        durationMs: 50,
        mode: "lesson",
      }),
    ).rejects.toThrow("injected state write failure");

    expect(await repo.database.studyEvents.count()).toBe(0);
    expect(await repo.database.questionStates.count()).toBe(0);
    expect(await repo.database.lessonStates.count()).toBe(0);
    expect(await repo.database.gameState.count()).toBe(0);
    expect(await repo.database.gameEvents.count()).toBe(0);
    expect(await repo.database.outbox.count()).toBe(0);
    expect(await repo.database.syncMeta.count()).toBe(0);
  });

  it("stores a final wrong visit as Again and a later new visit as Good", async () => {
    const repo = repository();
    const q = question("lesson.one.q1");

    await repo.saveAttempt({
      id: "attempt:again",
      question: q,
      correct: false,
      durationMs: 100,
      mode: "lesson",
    });
    currentTime += 24 * 60 * 60 * 1000;
    await repo.saveAttempt({
      id: "attempt:good",
      question: q,
      correct: true,
      durationMs: 100,
      mode: "review",
    });

    const events = (
      await repo.database.studyEvents.orderBy("clientSeq").toArray()
    ).filter((event) => event.eventType === "review-attempt");
    expect(
      events.map((event) => ({
        result: event.result,
        rating: event.rating,
        final: event.final,
      })),
    ).toEqual([
      { result: "incorrect", rating: "again", final: true },
      { result: "correct", rating: "good", final: true },
    ]);
    const state = await repo.database.questionStates.get(q.id);
    expect(state?.correctCount).toBe(1);
    expect(state?.incorrectCount).toBe(1);
  });

  it("expires the current streak after a missed local calendar day", async () => {
    const repo = repository();
    const q = question("lesson.one.q1");
    await repo.saveAttempt({
      id: "attempt:streak",
      question: q,
      correct: true,
      durationMs: 100,
      mode: "review",
    });
    currentTime += 2 * 24 * 60 * 60 * 1000;

    await expect(repo.getSnapshot()).resolves.toMatchObject({
      studyDates: ["2026-01-01"],
      game: { streak: 0, longestStreak: 1, xp: 10 },
    });
  });

  it("reconciles a learned revision as due now while excluding never-studied questions", async () => {
    const repo = repository();
    const learned = question("lesson.one.q1", 1);
    const revised = question(learned.id, 2);
    const neverStudied = question("lesson.one.never", 1);
    await repo.saveAttempt({
      id: "attempt:revision",
      question: learned,
      correct: true,
      durationMs: 100,
      mode: "review",
    });

    const queue = await repo.getReviewQueue([revised, neverStudied]);
    expect(queue.map((item) => item.id)).toEqual([learned.id]);
    const state = await repo.database.questionStates.get(learned.id);
    expect(state).toMatchObject({
      contentRevision: 2,
      status: "learning",
      nextReviewAt: currentTime,
    });
    expect(
      await repo.database.studyEvents
        .where("eventType")
        .equals("content-revision")
        .count(),
    ).toBe(1);
    // A body fetch can fail after reconciliation; retrying must not duplicate the event.
    expect((await repo.getReviewQueue([{ id: revised.id, lessonId: revised.lessonId, revision: revised.revision }])).map((item) => item.id)).toEqual([learned.id]);
    expect(await repo.database.studyEvents.where("eventType").equals("content-revision").count()).toBe(1);
  });

  it("ranks review candidates using metadata and indexed candidate state reads", async () => {
    const repo = repository();
    const learned = question("lesson.one.q1", 1);
    await repo.saveAttempt({
      id: "attempt:metadata-queue", question: learned, correct: true,
      durationMs: 100, mode: "review",
    });
    currentTime += 2 * 24 * 60 * 60 * 1000;
    const fullScan = vi.spyOn(repo.database.questionStates, "toArray");
    const candidate = { id: learned.id, lessonId: learned.lessonId, revision: learned.revision };
    expect(await repo.getReviewQueue([candidate])).toEqual([candidate]);
    expect(fullScan).not.toHaveBeenCalled();
    fullScan.mockRestore();
  });

  it("replays a backup, and rejects an invalid backup without changing current data", async () => {
    const repo = repository();
    const q = question("lesson.one.q1");
    await repo.saveAttempt({
      id: "attempt:backup",
      question: q,
      correct: true,
      durationMs: 100,
      mode: "lesson",
    });
    await repo.updateSettings({ dailyGoal: 100, reviewLimit: 50 });
    const originalSnapshot = await repo.getSnapshot();
    const backup = await repo.exportBackup();

    await repo.resetProgress();
    await repo.importBackup(backup);
    expect(await repo.getSnapshot()).toEqual(originalSnapshot);

    const beforeReject = await repo.exportBackup();
    const malformed = JSON.parse(beforeReject) as {
      settings: { dailyGoal: number };
    };
    malformed.settings.dailyGoal = 0;
    await expect(
      repo.importBackup(JSON.stringify(malformed)),
    ).rejects.toThrow();
    expect(await repo.exportBackup()).toBe(beforeReject);
  });

  it("restores an in-progress lesson before its first question is answered", async () => {
    const repo = repository();
    const currentLesson = lesson();
    const started = await repo.startLesson(currentLesson);
    const contentOnlyProgress = { ...started, currentIndex: 1 };
    await repo.saveSession(contentOnlyProgress);
    const backup = await repo.exportBackup();

    await repo.resetProgress();
    await repo.importBackup(backup);

    await expect(repo.getSnapshot()).resolves.toMatchObject({
      lessonStates: [
        expect.objectContaining({
          lessonId: currentLesson.id,
          status: "in-progress",
          contentRevision: currentLesson.revision,
        }),
      ],
    });
    await expect(repo.startLesson(currentLesson)).resolves.toEqual(
      contentOnlyProgress,
    );
  });

  it("resumes sessions and reopens a completed lesson with a fresh active session", async () => {
    const repo = repository();
    const currentLesson = lesson();
    const started = await repo.startLesson(currentLesson);
    expect(started).toEqual(createLessonSession(currentLesson));

    const partial: LessonSession = {
      ...started,
      currentIndex: 2,
      answers: [
        {
          questionId: `${currentLesson.id}.q1`,
          correct: true,
          answeredAt: currentTime,
        },
      ],
    };
    await repo.saveSession(partial);
    const resumed = await repo.startLesson(currentLesson);
    expect(resumed).toEqual(partial);

    const completed: LessonSession = {
      ...partial,
      currentIndex: currentLesson.flow.length,
      status: "completed",
      answers: [
        ...partial.answers,
        {
          questionId: `${currentLesson.id}.q2`,
          correct: false,
          answeredAt: currentTime,
        },
      ],
    };
    await repo.completeLesson(currentLesson, completed);
    await expect(repo.startLesson(currentLesson)).resolves.toEqual(
      createLessonSession(currentLesson),
    );
    await expect(repo.getSnapshot()).resolves.toMatchObject({
      lessonStates: [
        expect.objectContaining({
          lessonId: currentLesson.id,
          status: "completed",
        }),
      ],
    });
  });

  it("resumes an active same-revision session even when its lesson is completed", async () => {
    const repo = repository();
    const currentLesson = lesson();
    await repo.startLesson(currentLesson);
    const state = await repo.database.lessonStates.get(currentLesson.id);
    if (!state) throw new Error("expected lesson state");
    await repo.database.lessonStates.put({ ...state, status: "completed" });
    const saved: LessonSession = {
      lessonId: currentLesson.id,
      currentIndex: 1,
      status: "active",
      answers: [],
    };
    await repo.saveSession(saved);

    await expect(repo.startLesson(currentLesson)).resolves.toEqual(saved);
    await expect(
      repo.database.lessonStates.get(currentLesson.id),
    ).resolves.toMatchObject({ status: "completed" });
  });

  it("requires every question answer before completing a lesson", async () => {
    const repo = repository();
    const currentLesson = lesson();
    await repo.startLesson(currentLesson);
    await expect(
      repo.completeLesson(currentLesson, {
        lessonId: currentLesson.id,
        currentIndex: currentLesson.flow.length,
        status: "completed",
        answers: [
          {
            questionId: `${currentLesson.id}.q1`,
            correct: true,
            answeredAt: currentTime,
          },
        ],
      }),
    ).rejects.toThrow("unanswered");
  });

  it("accepts UI setting limits and rejects non-positive or excessive values", async () => {
    const repo = repository();
    await repo.updateSettings({ dailyGoal: 10, reviewLimit: 5 });
    await repo.updateSettings({ dailyGoal: 20, reviewLimit: 10 });
    await repo.updateSettings({ dailyGoal: 30, reviewLimit: 20 });
    await repo.updateSettings({ dailyGoal: 50, reviewLimit: 30 });
    await repo.updateSettings({ dailyGoal: 100, reviewLimit: 50 });
    await expect(repo.getSnapshot()).resolves.toMatchObject({
      settings: { dailyGoal: 100, reviewLimit: 50 },
    });
    await expect(repo.updateSettings({ dailyGoal: 0 })).rejects.toThrow();
    await expect(repo.updateSettings({ reviewLimit: 51 })).rejects.toThrow();
    await expect(repo.updateSettings({ dailyGoal: 101 })).rejects.toThrow();
  });
});

describe('independent content revisions', () => {
  it('persists question revision 2 in lesson revision 1 and rejects a stale session', async () => {
    const repo=repository();const currentLesson=lesson();
    const original=await repo.startLesson(currentLesson);
    await repo.saveAttempt({id:'different-revisions',question:question('lesson.one.q1',2),correct:true,durationMs:30,mode:'lesson'});
    expect((await repo.startLesson(currentLesson)).answers).toHaveLength(1);
    await repo.startLesson({...currentLesson,revision:2});
    await expect(repo.saveSession(original)).rejects.toThrow('older content revision');
  });
  it('restarts a saved session whose index is outside the authored flow', async () => {
    const repo=repository();const currentLesson=lesson();
    const started=await repo.startLesson(currentLesson);
    await repo.saveSession({...started,currentIndex:999});
    expect((await repo.startLesson(currentLesson)).currentIndex).toBe(0);
  });
});

describe("audited backup, session, and clock boundaries", () => {
  it("restores lesson revision from its session when a question revision differs", async () => {
    const repo = repository();
    const currentLesson = lesson("lesson.one", 1);
    const started = await repo.startLesson(currentLesson);
    await repo.saveAttempt({
      id: "independent-revision-backup",
      question: question("lesson.one.q1", 2),
      correct: true,
      durationMs: 30,
      mode: "lesson",
    });
    const backup = await repo.exportBackup();

    await repo.resetProgress();
    await repo.importBackup(backup);

    await expect(repo.startLesson(currentLesson)).resolves.toMatchObject({
      ...started,
      answers: [{ questionId: "lesson.one.q1", correct: true }],
    });
    await expect(repo.database.lessonStates.get(currentLesson.id)).resolves.toMatchObject({
      contentRevision: 1,
      status: "in-progress",
      attemptedQuestions: 1,
      completedQuestions: 1,
      correctCount: 1,
      incorrectCount: 0,
    });
  });

  it("rejects stale answers and retry results while accepting current lesson saves", async () => {
    const repo = repository();
    const currentLesson = lesson();
    const stale = await repo.startLesson(currentLesson);
    const q = question(`${currentLesson.id}.q1`);

    await repo.saveAttempt({
      id: "committed-before-session-save",
      question: q,
      correct: true,
      durationMs: 30,
      mode: "lesson",
    });
    await expect(repo.saveSession(stale)).rejects.toThrow("stale");
    const committed = await repo.startLesson(currentLesson);
    expect(committed.answers).toHaveLength(1);
    await expect(
      repo.saveSession({
        ...committed,
        answers: committed.answers.map((answer) => ({
          ...answer,
          correct: !answer.correct,
        })),
      }),
    ).rejects.toThrow("stale");

    await expect(
      repo.saveSession({
        ...committed,
        currentIndex: 0,
        answers: committed.answers.map((answer) => ({
          ...answer,
          answeredAt: answer.answeredAt + 1,
        })),
      }),
    ).resolves.toBeUndefined();
    await expect(repo.startLesson(currentLesson)).resolves.toMatchObject({
      currentIndex: 0,
      answers: [{ questionId: q.id, correct: true }],
    });

    const retrySession: LessonSession = {
      ...committed,
      currentIndex: currentLesson.flow.length,
      retryQueue: [q.id],
      retryCursor: 0,
      retryResults: [],
    };
    await repo.saveSession(retrySession);
    await repo.saveAttempt({
      id: "committed-before-retry-session-save",
      question: q,
      correct: true,
      durationMs: 30,
      mode: "lesson",
      attemptNumber: 2,
    });
    await expect(repo.saveSession(retrySession)).rejects.toThrow("stale");
    await expect(
      repo.saveSession(recordDelayedRetry(retrySession, q.id)),
    ).resolves.toBeUndefined();
  });

  it("keeps streak and XP stable when study dates move backward and return", async () => {
    const repo = repository();
    const dates = [3, 4, 3, 4];
    for (const [index, day] of dates.entries()) {
      currentTime = new Date(2026, 0, day, 12).getTime();
      await repo.saveAttempt({
        id: `clock-reversal-${index}`,
        question: question(`lesson.clock.q${index + 1}`),
        correct: true,
        durationMs: 30,
        mode: "review",
      });
    }

    const before = await repo.getSnapshot();
    const gameBefore = await repo.database.gameState.get("local");
    expect(before).toMatchObject({
      studyDates: ["2026-01-03", "2026-01-04"],
      game: { streak: 2, longestStreak: 2, todayXp: 20, xp: 40 },
    });
    expect(gameBefore).toMatchObject({
      lastStudyDate: "2026-01-04",
      todayDate: "2026-01-04",
      todayXp: 20,
      xp: 40,
    });

    const backup = await repo.exportBackup();
    await repo.resetProgress();
    await repo.importBackup(backup);

    await expect(repo.getSnapshot()).resolves.toEqual(before);
    await expect(repo.database.gameState.get("local")).resolves.toEqual(gameBefore);
  });

  it("records a previously unseen past study date without lowering the streak", async () => {
    const repo = repository();
    for (const [index, day] of [3, 4, 2].entries()) {
      currentTime = new Date(2026, 0, day, 12).getTime();
      await repo.saveAttempt({
        id: `unseen-past-date-${index}`,
        question: question(`lesson.past-date.q${index + 1}`),
        correct: true,
        durationMs: 30,
        mode: "review",
      });
    }

    const before = await repo.getSnapshot();
    const gameBefore = await repo.database.gameState.get("local");
    expect(before).toMatchObject({
      studyDates: ["2026-01-02", "2026-01-03", "2026-01-04"],
      game: { streak: 2, longestStreak: 2, xp: 30, todayXp: 0 },
    });
    expect(gameBefore).toMatchObject({
      lastStudyDate: "2026-01-04",
      todayDate: "2026-01-04",
      todayXp: 10,
      xp: 30,
    });

    const backup = await repo.exportBackup();
    await repo.resetProgress();
    await repo.importBackup(backup);

    await expect(repo.getSnapshot()).resolves.toEqual(before);
    await expect(repo.database.gameState.get("local")).resolves.toEqual(gameBefore);
  });

  it("replays linked events after legacy game events without event IDs", async () => {
    const repo = repository();
    for (const [index, day] of [3, 4].entries()) {
      currentTime = new Date(2026, 0, day, 12).getTime();
      await repo.saveAttempt({
        id: `mixed-game-events-${index}`,
        question: question(`lesson.mixed-events.q${index + 1}`),
        correct: true,
        durationMs: 30,
        mode: "review",
      });
    }
    const before = await repo.getSnapshot();
    const gameBefore = await repo.database.gameState.get("local");
    const backup = JSON.parse(await repo.exportBackup()) as {
      gameEvents: Array<{ localDate?: string; eventId?: string }>;
    };
    for (const event of backup.gameEvents) {
      if (event.localDate === "2026-01-03") delete event.eventId;
    }

    await repo.resetProgress();
    await repo.importBackup(JSON.stringify(backup));

    await expect(repo.getSnapshot()).resolves.toEqual(before);
    await expect(repo.database.gameState.get("local")).resolves.toEqual(gameBefore);
  });

  it("clamps FSRS time after clock reversal and replays the same scheduler state", async () => {
    const repo = repository();
    const q = question("lesson.clock-reversal.q1");
    currentTime = new Date(2026, 0, 4, 12).getTime();
    await repo.saveAttempt({
      id: "fsrs-forward-time",
      question: q,
      correct: true,
      durationMs: 30,
      mode: "review",
    });
    const first = await repo.database.questionStates.get(q.id);
    if (!first?.lastReviewAt) throw new Error("Expected a reviewed question");

    currentTime = new Date(2026, 0, 3, 12).getTime();
    await expect(
      repo.saveAttempt({
        id: "fsrs-backward-time",
        question: q,
        correct: true,
        durationMs: 30,
        mode: "review",
      }),
    ).resolves.toBeUndefined();
    const stateBefore = await repo.database.questionStates.get(q.id);
    const events = await repo.database.studyEvents.orderBy("clientSeq").toArray();
    expect(events.map((event) => event.effectiveAt)).toEqual([
      first.lastReviewAt,
      first.lastReviewAt,
    ]);
    expect(
      (await repo.database.gameEvents.get("game:xp:fsrs-backward-time"))?.localDate,
    ).toBe("2026-01-03");

    const backup = await repo.exportBackup();
    await repo.resetProgress();
    await repo.importBackup(backup);

    await expect(repo.database.questionStates.get(q.id)).resolves.toEqual(stateBefore);
  });
});
