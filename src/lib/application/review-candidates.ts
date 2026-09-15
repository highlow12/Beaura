import type { QuestionMetadata } from "$lib/content/types";
import type { QuestionState } from "$lib/learning/domain/states";

export function reviewCandidates(
  questions: readonly QuestionMetadata[],
  states: readonly QuestionState[],
  now = Date.now(),
): QuestionMetadata[] {
  const byId = new Map(states.map((state) => [state.questionId, state]));

  return questions.filter((question) => {
    const state = byId.get(question.id);
    if (!state) return false;
    if (state.contentRevision !== question.revision) return true;
    return (
      state.status !== "new" &&
      state.status !== "suspended" &&
      state.nextReviewAt !== null &&
      state.nextReviewAt <= now
    );
  });
}
