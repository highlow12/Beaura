import "fake-indexeddb/auto";

import { afterEach, describe, expect, it } from "vitest";
import type { SingleChoiceQuestion } from "$lib/questions/types";
import { LearningDatabase } from "$lib/storage/db";
import { LearningRepository } from "$lib/storage/repositories/learning-repository";

const databases: LearningDatabase[] = [];
let databaseCounter = 0;
const now = Date.UTC(2026, 8, 20, 12);
const prompt = [{ type: "text" as const, text: "장기 사용 픽스처" }];

function repository(name = `long-term-${databaseCounter++}`) {
  const database = new LearningDatabase(name);
  databases.push(database);
  return new LearningRepository({
    database,
    clock: () => now,
    userId: "long-term-user",
    deviceId: "long-term-device",
  });
}

function question(index: number): SingleChoiceQuestion {
  const lessonId = `fixture.lesson-${Math.floor(index / 10)}`;
  return {
    schemaVersion: 1,
    id: `${lessonId}.question-${index}`,
    lessonId,
    revision: 1,
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

afterEach(async () => {
  await Promise.all(
    databases.splice(0).map(async (database) => {
      database.close();
      await database.delete();
    }),
  );
});

describe("long-term learning data", () => {
  it("keeps a large learned-question snapshot and repeated backup restore stable", async () => {
    const repo = repository();
    const questionCount = 500;

    for (let index = 0; index < questionCount; index += 1) {
      await repo.saveAttempt({
        id: `fixture-attempt-${index}`,
        question: question(index),
        correct: index % 4 !== 0,
        durationMs: 250 + index,
        mode: "review",
      });
    }

    const before = await repo.getSnapshot();
    const backup = await repo.exportBackup();
    await repo.importBackup(backup);
    await repo.importBackup(backup);
    const after = await repo.getSnapshot();

    expect(after).toEqual(before);
    await expect(repo.database.studyEvents.count()).resolves.toBe(questionCount);
    await expect(repo.database.questionStates.count()).resolves.toBe(questionCount);
    await expect(repo.database.outbox.count()).resolves.toBe(questionCount);
  }, 30_000);

  it("serializes concurrent writes from two tabs without duplicate sequence numbers", async () => {
    const name = `multi-tab-${databaseCounter++}`;
    const first = repository(name);
    const second = repository(name);

    await Promise.all(
      Array.from({ length: 40 }, (_, index) =>
        (index % 2 === 0 ? first : second).saveAttempt({
          id: `tab-attempt-${index}`,
          question: question(index),
          correct: true,
          durationMs: 100,
          mode: "review",
        }),
      ),
    );

    const events = await first.database.studyEvents.orderBy("clientSeq").toArray();
    expect(events).toHaveLength(40);
    expect(new Set(events.map((event) => event.clientSeq)).size).toBe(40);
    expect(events.map((event) => event.clientSeq)).toEqual(
      Array.from({ length: 40 }, (_, index) => index + 1),
    );
  });
});
