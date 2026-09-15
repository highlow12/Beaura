export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "markdown"; markdown: string; html?: string }
  | { type: "code"; language: string; code: string }
  | { type: "image"; src: string; alt: string }
  | { type: "diagram"; diagramType: string; data: unknown; alt: string };

export interface Track {
  id: string;
  revision: number;
  title: string;
  description?: string;
  order: number;
}

export interface CurriculumNode {
  lesson: string;
  requires: string[];
}

export interface Curriculum {
  schemaVersion: 1;
  tracks: Track[];
  nodes: CurriculumNode[];
}

export type LessonFlowItem =
  | { type: "content"; blocks: ContentBlock[] }
  | { type: "question"; ref: string };

export interface LessonMetadata {
  id: string;
  revision: number;
  track: string;
  title: string;
  description: string;
}

export interface Lesson extends LessonMetadata {
  schemaVersion: 1;
  flow: LessonFlowItem[];
}

export interface QuestionMetadata {
  id: string;
  revision: number;
  lessonId: string;
}

export interface ContentCatalog {
  schemaVersion: 1;
  lessons: LessonMetadata[];
  questions: QuestionMetadata[];
}

export interface ContentManifest {
  schemaVersion: 1;
  buildId: string;
  generatedAt: string;
  tracks: string[];
  lessons: string[];
  questions: string[];
}
