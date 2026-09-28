import { base } from "$app/paths";
import { getLocale } from "$lib/application/locale";
import { t } from "$lib/application/locale";
import type {
  ContentCatalog,
  ContentManifest,
  Curriculum,
  Lesson,
} from "$lib/content/types";
import type { Question } from "$lib/questions/types";
import type { ContentRepository } from "./content-repository";

function contentPath(path: string): string {
  return `${base}/generated/${getLocale() === "en" ? "en/" : ""}${path}`;
}

async function getJson<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path);
  } catch (error) {
    const detail = error instanceof Error ? `: ${error.message}` : "";
    throw new Error(`${t("콘텐츠 네트워크 요청 실패", "Content network request failed", getLocale())}: ${path}${detail}`);
  }

  if (!response.ok) {
    throw new Error(`${t("콘텐츠를 불러오지 못했습니다", "Could not load content", getLocale())}: ${path} (${response.status})`);
  }
  return (await response.json()) as T;
}

export class StaticContentRepository implements ContentRepository {
  async getManifest(): Promise<ContentManifest> {
    return getJson<ContentManifest>(`${base}/generated/manifest.json`);
  }

  async getCatalog(): Promise<ContentCatalog> {
    return getJson<ContentCatalog>(contentPath("catalog.json"));
  }

  async getCurriculum(): Promise<Curriculum> {
    return getJson<Curriculum>(contentPath("curriculum.json"));
  }

  async getLesson(id: string): Promise<Lesson> {
    return getJson<Lesson>(
      contentPath(`lessons/${encodeURIComponent(id)}.json`),
    );
  }

  async getQuestion(id: string): Promise<Question> {
    return getJson<Question>(
      contentPath(`questions/${encodeURIComponent(id)}.json`),
    );
  }

  async getPrerequisites(lessonId: string): Promise<string[]> {
    const curriculum = await this.getCurriculum();
    return (
      curriculum.nodes.find((node) => node.lesson === lessonId)?.requires ?? []
    );
  }
}

export const contentRepository = new StaticContentRepository();
