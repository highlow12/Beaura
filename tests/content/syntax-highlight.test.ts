import { describe, expect, it } from "vitest";
import { highlightCode } from "../../src/lib/content/syntax-highlight";

describe("syntax highlighting", () => {
  it("highlights common Python tokens", () => {
    const html = highlightCode(
      'def greet(name):\n    # hello\n    print("Hi", 3)\n',
      "python",
    );

    expect(html).toContain('<span class="syntax-keyword">def</span>');
    expect(html).toContain('<span class="syntax-definition">greet</span>');
    expect(html).toContain('<span class="syntax-comment"># hello</span>');
    expect(html).toContain('<span class="syntax-builtin">print</span>');
    expect(html).toContain('<span class="syntax-string">&quot;Hi&quot;</span>');
    expect(html).toContain('<span class="syntax-number">3</span>');
  });

  it("escapes code before returning HTML", () => {
    const html = highlightCode('print("<script>")', "python");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });

  it("keeps unsupported languages escaped without adding token spans", () => {
    const html = highlightCode("<tag>", "text");
    expect(html).toBe("&lt;tag&gt;");
  });
});
