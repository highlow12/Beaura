import { contentRepository } from '$lib/content/repository/static-content-repository';
import { learningRepository } from '$lib/storage/repositories/learning-repository';
import { nextLessonForDashboard } from '$lib/application/dashboard-selection';
import { reviewCandidates } from '$lib/application/review-candidates';
import { getLocale, t } from '$lib/application/locale';

export async function loadDashboard() {
  const [curriculum, catalog, snapshot] = await Promise.all([
    contentRepository.getCurriculum(),
    contentRepository.getCatalog(),
    learningRepository.getSnapshot()
  ]);
  const lessons = catalog.lessons;
  const queue = reviewCandidates(catalog.questions, snapshot.questionStates);
  const nextLesson = nextLessonForDashboard(curriculum, lessons, snapshot.lessonStates);
  return { curriculum, catalog, snapshot, lessons, queue, nextLesson };
}
export type Dashboard = Awaited<ReturnType<typeof loadDashboard>>;
export function errorMessage(error: unknown) {
  return error instanceof Error
    ? error.message
    : t('데이터를 불러오지 못했습니다. 다시 시도해 주세요.', 'Could not load data. Please try again.', getLocale());
}
