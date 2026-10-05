import { describe, expect, it } from "vitest";
import { contentLabel } from "$lib/questions/presentation";
import type { ContentBlock } from "$lib/content/types";

describe("question content labels", () => {
  it("uses the learner-facing label for every content block type", () => {
    const blocks: ContentBlock[] = [
      { type: "text", text: "plain text" },
      { type: "markdown", markdown: "**markdown**", html: "ignored html" },
      { type: "code", language: "js", code: "const answer = 42" },
      { type: "image", src: "image.png", alt: "image description" },
      {
        type: "diagram",
        diagramType: "flowchart",
        data: {},
        alt: "diagram description",
      },
    ];

    expect(contentLabel(blocks)).toBe(
      "plain text **markdown** const answer = 42 image description diagram description",
    );
  });

  it("trims parts, returns a fallback for empty content, and preserves blocks", () => {
    const blocks: ContentBlock[] = [
      { type: "text", text: "  first  " },
      { type: "markdown", markdown: " \t" },
      { type: "code", language: "js", code: " second\n" },
    ];
    const original = blocks.map((block) => ({ ...block }));

    expect(contentLabel(blocks)).toBe("first second");
    expect(blocks).toEqual(original);
    expect(contentLabel([{ type: "text", text: " \n" }])).toBe("내용 없음");
    expect(contentLabel([])).toBe("내용 없음");
  });
});
