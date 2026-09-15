import { lessonStatus } from "$lib/curriculum/progress";
import type { Curriculum, LessonMetadata } from "$lib/content/types";
import type { LessonState } from "$lib/learning/domain/states";

export function nextLessonForDashboard(
  curriculum: Curriculum,
  lessons: readonly LessonMetadata[],
  states: readonly LessonState[],
): LessonMetadata | undefined {
  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));
  const recentState = [...states]
    .filter(
      (state) => state.lastStudiedAt !== null && lessonById.has(state.lessonId),
    )
    .sort(
      (left, right) =>
        (right.lastStudiedAt ?? 0) - (left.lastStudiedAt ?? 0),
    )[0];
  const recentLesson = recentState
    ? lessonById.get(recentState.lessonId)
    : undefined;
  const candidateLessons = recentLesson
    ? lessons.filter((lesson) => lesson.track === recentLesson.track)
    : lessons;

  return (
    candidateLessons.find(
      (lesson) => lessonStatus(lesson, curriculum, states) === "in-progress",
    ) ??
    candidateLessons.find(
      (lesson) => lessonStatus(lesson, curriculum, states) === "available",
    ) ??
    (recentLesson ? candidateLessons.at(-1) : undefined)
  );
}
