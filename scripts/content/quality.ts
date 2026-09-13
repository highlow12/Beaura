import { loadSourceContent, type SourceContentBundle } from "./model";

const MIN_CONTENT_BLOCKS = 3;
const MAX_CONTENT_BLOCKS = 4;
const MIN_QUESTIONS = 5;
const MAX_QUESTIONS = 7;
const MIN_CHOICE_OPTIONS = 4;
const MAX_CHOICE_OPTIONS = 6;

export interface ContentQualityIssue {
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

    if (
      entry.content.length < MIN_CONTENT_BLOCKS ||
      entry.content.length > MAX_CONTENT_BLOCKS
    ) {
      issues.push({
        lessonId,
        path: lessonPath,
        message: `설명 블록은 ${MIN_CONTENT_BLOCKS} ~ ${MAX_CONTENT_BLOCKS}개가 권장 기준이지만 ${entry.content.length}개입니다.`,
      });
    }

    if (
      entry.questions.length < MIN_QUESTIONS ||
      entry.questions.length > MAX_QUESTIONS
    ) {
      issues.push({
        lessonId,
        path: lessonPath,
        message: `문제는 ${MIN_QUESTIONS} ~ ${MAX_QUESTIONS}개가 권장 기준이지만 ${entry.questions.length}개입니다.`,
      });
    }

    for (const questionFile of entry.questions) {
      const question = questionFile.value;
      if (
        question?.type !== "single-choice" &&
        question?.type !== "multi-select"
      ) {
        continue;
      }

      const optionCount = Array.isArray(question.options)
        ? question.options.length
        : 0;
      if (
        optionCount < MIN_CHOICE_OPTIONS ||
        optionCount > MAX_CHOICE_OPTIONS
      ) {
        issues.push({
          lessonId,
          path: `content/${questionFile.relativePath}`,
          message: `선택형 문제는 ${MIN_CHOICE_OPTIONS} ~ ${MAX_CHOICE_OPTIONS}개 선택지를 권장하지만 ${optionCount}개입니다.`,
        });
      }
    }
  }

  return issues;
}

const bundle = await loadSourceContent();
const issues = getContentQualityIssues(bundle);
const strict = process.argv.includes("--strict");

if (issues.length === 0) {
  console.log(`콘텐츠 품질 검사 통과: lessons=${bundle.lessons.length}`);
} else {
  console.log(`콘텐츠 품질 이슈: ${issues.length}건`);
  for (const issue of issues) {
    console.log(`- [${issue.lessonId}] ${issue.path}: ${issue.message}`);
  }

  if (strict) process.exitCode = 1;
}
