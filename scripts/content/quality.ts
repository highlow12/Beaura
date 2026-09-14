import { loadSourceContent, type SourceContentBundle } from "./model";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const MIN_CONTENT_BLOCKS = 3;
const MIN_QUESTIONS = 5;
const TARGET_MAX_QUESTIONS = 7;

export type ContentQualitySeverity = "action" | "info";
export type ContentQualityCode =
  | "content-below-target"
  | "questions-below-target"
  | "questions-above-target";

export interface ContentQualityIssue {
  code: ContentQualityCode;
  severity: ContentQualitySeverity;
  lessonId: string;
  path: string;
  message: string;
}

function lessonIdOf(entry: SourceContentBundle["lessons"][number]): string {
  const value = entry.lessonFile.value;
  return typeof value?.id === "string" ? value.id : entry.directory;
}

export function getContentQualityIssues(
  bundle: SourceContentBundle,
): ContentQualityIssue[] {
  const issues: ContentQualityIssue[] = [];

  for (const entry of bundle.lessons) {
    const lessonId = lessonIdOf(entry);
    const lessonPath = `content/${entry.lessonFile.relativePath}`;
    const contentBlockCount = Array.isArray(entry.lessonFile.value?.flow)
      ? entry.lessonFile.value.flow.filter((item) => item.type === "content")
          .length
      : 0;

    if (contentBlockCount < MIN_CONTENT_BLOCKS) {
      issues.push({
        code: "content-below-target",
        severity: "action",
        lessonId,
        path: lessonPath,
        message: `flow의 설명 블록은 최소 ${MIN_CONTENT_BLOCKS}개를 목표로 하지만 ${contentBlockCount}개입니다.`,
      });
    }

    if (entry.questions.length < MIN_QUESTIONS) {
      issues.push({
        code: "questions-below-target",
        severity: "action",
        lessonId,
        path: lessonPath,
        message: `문제는 최소 ${MIN_QUESTIONS}개를 목표로 하지만 ${entry.questions.length}개입니다.`,
      });
    } else if (entry.questions.length > TARGET_MAX_QUESTIONS) {
      issues.push({
        code: "questions-above-target",
        severity: "info",
        lessonId,
        path: lessonPath,
        message: `문제가 목표 범위 5 ~ ${TARGET_MAX_QUESTIONS}개보다 많은 ${entry.questions.length}개입니다. 기존 question ID는 유지하고 필요할 때 레슨 분리를 검토합니다.`,
      });
    }
  }

  return issues;
}

async function main(): Promise<void> {
  const bundle = await loadSourceContent();
  const issues = getContentQualityIssues(bundle);
  const actionable = issues.filter((issue) => issue.severity === "action");
  const informational = issues.filter((issue) => issue.severity === "info");
  const strict = process.argv.includes("--strict");

  console.log(
    `콘텐츠 품질 감사: tracks=${bundle.tracksFile.value.tracks.length}, lessons=${bundle.lessons.length}, questions=${bundle.lessons.reduce((total, lesson) => total + lesson.questions.length, 0)}, action=${actionable.length}, info=${informational.length}`,
  );

  for (const issue of issues) {
    console.log(
      `- [${issue.severity}/${issue.code}] [${issue.lessonId}] ${issue.path}: ${issue.message}`,
    );
  }

  if (strict && actionable.length > 0) process.exitCode = 1;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  await main();
}
