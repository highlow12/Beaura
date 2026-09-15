import { describe, expect, it } from "vitest";
import { reviewCandidates } from "../../src/lib/application/review-candidates";
import type { QuestionMetadata } from "../../src/lib/content/types";
import type { QuestionState } from "../../src/lib/learning/domain/states";

function state(
  questionId: string,
  contentRevision: number,
  status: QuestionState["status"],
  nextReviewAt: number | null,
): QuestionState {
  return {
    questionId,
    lessonId: "lesson",
    contentRevision,
    status,
    lastReviewAt: 1,
    nextReviewAt,
    correctCount: 1,
    incorrectCount: 0,
    reps: 1,
    lapses: 0,
    schedulerProfileId: "default",
    schedulerState: {},
    stateVersion: 1,
    updatedAt: 1,
  };
}

describe("reviewCandidates", () => {
  it("selects due and revised learned questions without loading question bodies", () => {
    const questions: QuestionMetadata[] = [
      { id: "due", lessonId: "lesson", revision: 1 },
      { id: "revised", lessonId: "lesson", revision: 2 },
      { id: "new", lessonId: "lesson", revision: 1 },
      { id: "unknown", lessonId: "lesson", revision: 1 },
    ];
    const states: QuestionState[] = [
      state("due", 1, "review", 50),
      state("revised", 1, "review", 500),
      state("new", 1, "new", 50),
    ];

    expect(reviewCandidates(questions, states, 100).map((item) => item.id)).toEqual([
      "due",
      "revised",
    ]);
  });
});
