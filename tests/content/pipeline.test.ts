import { describe, expect, it } from "vitest";
import { compileContent } from "../../scripts/content/compiler";
import { getContentQualityIssues } from "../../scripts/content/quality";
import {
  computeBuildId,
  getValidationErrors,
  loadSourceContent,
} from "../../scripts/content/model";

const CONTENT_TEST_TIMEOUT = 15_000;

describe("content pipeline", () => {
  it("validates the repository content", async () => {
    const bundle = await loadSourceContent(process.cwd());

    expect(getValidationErrors(bundle)).toEqual([]);
  }, CONTENT_TEST_TIMEOUT);

  it("rejects unknown fields and missing references", async () => {
    const bundle = await loadSourceContent(process.cwd());
    const lesson = bundle.lessons[0].lessonFile
      .value as (typeof bundle.lessons)[0]["lessonFile"]["value"] & {
      unexpected?: boolean;
    };
    lesson.unexpected = true;
    lesson.flow[0].ref = "content/missing.md";

    const errors = getValidationErrors(bundle).join("\n");
    expect(errors).toContain("unexpected: 정의되지 않은 필드입니다");
    expect(errors).toContain("같은 lesson의 content/*.md 파일이어야 합니다");
  }, CONTENT_TEST_TIMEOUT);

  it("counts only flow content while allowing unreferenced Markdown", async () => {
    const bundle = await loadSourceContent(process.cwd());
    const lesson = bundle.lessons.find(
      (entry) => entry.content.length === 3,
    );
    expect(lesson).toBeDefined();

    const removed = lesson!.lessonFile.value.flow.find(
      (item) => item.type === "content",
    );
    expect(removed).toBeDefined();
    lesson!.lessonFile.value.flow = lesson!.lessonFile.value.flow.filter(
      (item) => item !== removed,
    );

    expect(getContentQualityIssues(bundle)).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "content-below-target",
          lessonId: lesson!.lessonFile.value.id,
        }),
      ]),
    );
    expect(getValidationErrors(bundle).join("\n")).not.toContain(removed!.ref);
  }, CONTENT_TEST_TIMEOUT);

  it("creates a stable build ID from source bytes", async () => {
    const bundle = await loadSourceContent(process.cwd());
    const first = computeBuildId(bundle);

    expect(computeBuildId(bundle)).toBe(first);
    bundle.files.set("synthetic.txt", Buffer.from("changed"));
    expect(computeBuildId(bundle)).not.toBe(first);
  }, CONTENT_TEST_TIMEOUT);

  it("compiles inline lesson content and materializes question defaults", async () => {
    const bundle = await loadSourceContent(process.cwd());
    const compiled = compileContent(bundle);
    const lesson = compiled.lessons.get("py.variables") as {
      flow: Array<Record<string, unknown>>;
    };
    const question = compiled.questions.get(
      "py.variables.what-is-01",
    ) as Record<string, unknown>;

    expect(lesson.flow[0]).toMatchObject({
      type: "content",
      blocks: [{ type: "markdown" }],
    });
    expect(lesson.flow[0]).not.toHaveProperty("ref");
    expect(question).toMatchObject({
      lessonId: "py.variables",
      shuffleOptions: true,
    });
    expect(compiled.manifest.questions).toEqual(
      [...compiled.questions.keys()].sort(),
    );
    expect(compiled.manifest.questions).toEqual(
      expect.arrayContaining([
        "py.variables.assign-01",
        "py.variables.what-is-01",
      ]),
    );
    expect(
      compiled.catalog.lessons.find((item) => item.id === "py.variables"),
    ).toMatchObject({
      id: "py.variables",
      track: "python",
      title: expect.any(String),
      description: expect.any(String),
      revision: expect.any(Number),
    });
    expect(
      compiled.catalog.lessons.find((item) => item.id === "py.variables"),
    ).not.toHaveProperty("flow");
    expect(
      compiled.catalog.questions.find(
        (item) => item.id === "py.variables.what-is-01",
      ),
    ).toEqual({
      id: "py.variables.what-is-01",
      lessonId: "py.variables",
      revision: expect.any(Number),
    });
    expect(
      compiled.catalog.questions.find(
        (item) => item.id === "py.variables.what-is-01",
      ),
    ).not.toHaveProperty("prompt");
  }, CONTENT_TEST_TIMEOUT);

  it("shuffles every authored single-choice and multi-select card set", async () => {
    const bundle = await loadSourceContent(process.cwd());
    const compiled = compileContent(bundle);
    const questions = [...compiled.questions.values()] as Array<Record<string, unknown>>;
    const selectionQuestions = questions.filter(
      (question) => question.type === "single-choice" || question.type === "multi-select",
    );

    expect(selectionQuestions.length).toBeGreaterThan(0);
    expect(selectionQuestions.every((question) => question.shuffleOptions)).toBe(true);
  }, CONTENT_TEST_TIMEOUT);

  it("requires normalized answer choices and keeps accepted values inside them", async () => {
    const bundle = await loadSourceContent(process.cwd());
    const variables = bundle.lessons.find(
      (entry) => entry.directory === "py.variables",
    );
    const conditionals = bundle.lessons.find(
      (entry) => entry.directory === "py.conditionals",
    );
    const fill = variables?.questions.find(
      (file) => file.value.type === "fill-blank",
    )?.value as Record<string, unknown>;
    const output = conditionals?.questions.find(
      (file) => file.value.type === "code-output",
    )?.value as Record<string, unknown>;
    const completion = conditionals?.questions.find(
      (file) => file.value.type === "code-completion",
    )?.value as Record<string, unknown>;

    expect(fill.choices).toEqual(expect.any(Array));
    expect(output.choices).toEqual(expect.any(Array));
    expect(
      (completion.blanks as Array<Record<string, unknown>>)[0].choices,
    ).toEqual(expect.any(Array));

    fill.choices = [" answer ", "answer"];
    fill.acceptedAnswers = ["answer"];
    output.acceptedOutputs = ["not-an-option"];
    (completion.blanks as Array<Record<string, unknown>>)[0].choices = [">="];

    const errors = getValidationErrors(bundle).join("\n");
    expect(errors).toContain("정규화 후 중복 선택지");
    expect(errors).toContain(
      "acceptedOutputs: 모든 값이 choices에 포함되어야 합니다",
    );
    expect(errors).toContain("정규화 가능한 선택지가 최소 2개 필요합니다");
  }, CONTENT_TEST_TIMEOUT);
});
