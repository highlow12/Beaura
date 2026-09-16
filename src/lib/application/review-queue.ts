import type { QuestionMetadata } from "$lib/content/types";
import type { Question } from "$lib/questions/types";
import { assertQuestion } from "$lib/storage/repositories/learning-repository";

/** Only selected bodies cross the metadata-to-content boundary. */
export async function loadSelectedReviewQuestions(
  ranked: readonly QuestionMetadata[],
  limit: number,
  loadQuestion: (id: string) => Promise<Question>,
): Promise<Question[]> {
  return Promise.all(
    ranked.slice(0, limit).map(async (item) => {
      const question = await loadQuestion(item.id);
      assertQuestion(question);
      if (
        question.id !== item.id ||
        question.lessonId !== item.lessonId ||
        question.revision !== item.revision
      )
        throw new Error(
          `콘텐츠 버전이 일치하지 않습니다: ${item.id}. 새로고침 후 다시 시도해 주세요.`,
        );
      return question;
    }),
  );
}
