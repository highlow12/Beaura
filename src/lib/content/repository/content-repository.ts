import type {
  ContentCatalog,
  ContentManifest,
  Curriculum,
  Lesson,
} from "$lib/content/types";
import type { Question } from "$lib/questions/types";

export interface ContentRepository {
  getManifest(): Promise<ContentManifest>;
  getCatalog(): Promise<ContentCatalog>;
  getCurriculum(): Promise<Curriculum>;
  getLesson(id: string): Promise<Lesson>;
  getQuestion(id: string): Promise<Question>;
  getPrerequisites(lessonId: string): Promise<string[]>;
}
