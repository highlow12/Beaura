import { describe, expect, it, vi } from "vitest";
import { loadSelectedReviewQuestions } from "../../src/lib/application/review-queue";
import type { Question } from "../../src/lib/questions/types";

describe("review body loading boundary", () => {
  const ranked = Array.from({ length: 100 }, (_, index) => ({
    id: `q-${index}`,
    lessonId: "lesson",
    revision: 1,
  }));
  const body = (id: string) =>
    ({
      id,
      lessonId: "lesson",
      revision: 1,
      type: "single-choice",
    }) as Question;

  it("loads only the ranked session limit, regardless of candidate count", async () => {
    const load = vi.fn(async (id: string) => body(id));
    expect(
      (await loadSelectedReviewQuestions(ranked, 3, load)).map((q) => q.id),
    ).toEqual(["q-0", "q-1", "q-2"]);
    expect(load).toHaveBeenCalledTimes(3);
  });

  it("rejects mismatched content instead of displaying a different revision", async () => {
    await expect(
      loadSelectedReviewQuestions(ranked, 1, async () => ({
        ...body("q-0"),
        revision: 2,
      })),
    ).rejects.toThrow("콘텐츠 버전이 일치하지 않습니다");
  });
});
