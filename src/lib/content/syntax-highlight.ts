const PYTHON_KEYWORDS = new Set([
  "False",
  "None",
  "True",
  "and",
  "as",
  "assert",
  "async",
  "await",
  "break",
  "case",
  "class",
  "continue",
  "def",
  "del",
  "elif",
  "else",
  "except",
  "finally",
  "for",
  "from",
  "global",
  "if",
  "import",
  "in",
  "is",
  "lambda",
  "match",
  "nonlocal",
  "not",
  "or",
  "pass",
  "raise",
  "return",
  "try",
  "while",
  "with",
  "yield",
]);

const PYTHON_BUILTINS = new Set([
  "abs",
  "all",
  "any",
  "bool",
  "dict",
  "enumerate",
  "filter",
  "float",
  "input",
  "int",
  "isinstance",
  "len",
  "list",
  "map",
  "max",
  "min",
  "object",
  "open",
  "print",
  "range",
  "reversed",
  "set",
  "sorted",
  "str",
  "sum",
  "super",
  "tuple",
  "type",
  "zip",
]);

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function token(className: string, value: string): string {
  return `<span class="syntax-${className}">${escapeHtml(value)}</span>`;
}

function pythonLanguage(language: string | undefined): boolean {
  const normalized = language?.trim().toLowerCase().split(/\s+/)[0];
  return normalized === "python" || normalized === "py" || normalized === "python3" || normalized === "py3";
}

function consumePythonString(code: string, index: number, opening: string): number {
  const quote = opening.endsWith('"""')
    ? '"""'
    : opening.endsWith("'''")
      ? "'''"
      : opening.endsWith('"')
        ? '"'
        : "'";
  let cursor = index + opening.length;

  while (cursor < code.length) {
    if (code.startsWith(quote, cursor)) return cursor + quote.length;
    if (quote.length === 1 && code[cursor] === "\n") return cursor;
    if (code[cursor] === "\\") {
      cursor += 2;
      continue;
    }
    cursor += 1;
  }

  return cursor;
}

function highlightPython(code: string): string {
  let result = "";
  let index = 0;
  let expectDefinition = false;

  while (index < code.length) {
    const rest = code.slice(index);
    const stringStart = rest.match(/^(?:[rRuUbBfF]{1,2})?(?:"""|'''|"|')/);
    if (stringStart) {
      const end = consumePythonString(code, index, stringStart[0]);
      result += token("string", code.slice(index, end));
      index = end;
      expectDefinition = false;
      continue;
    }

    if (code[index] === "#") {
      const end = code.indexOf("\n", index);
      const commentEnd = end === -1 ? code.length : end;
      result += token("comment", code.slice(index, commentEnd));
      index = commentEnd;
      expectDefinition = false;
      continue;
    }

    const decorator = rest.match(/^@[A-Za-z_][A-Za-z0-9_.]*/);
    if (decorator) {
      result += token("decorator", decorator[0]);
      index += decorator[0].length;
      expectDefinition = false;
      continue;
    }

    const number = rest.match(/^(?:0[xX][0-9A-Fa-f_]+|0[bB][01_]+|0[oO][0-7_]+|(?:\d[\d_]*\.?[\d_]*|\.\d[\d_]*)(?:[eE][+-]?\d[\d_]*)?j?)/);
    if (number) {
      result += token("number", number[0]);
      index += number[0].length;
      expectDefinition = false;
      continue;
    }

    const identifier = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (identifier) {
      const value = identifier[0];
      if (expectDefinition) {
        result += token("definition", value);
        expectDefinition = false;
      } else if (PYTHON_KEYWORDS.has(value)) {
        result += token("keyword", value);
        expectDefinition = value === "def" || value === "class";
      } else if (PYTHON_BUILTINS.has(value)) {
        result += token("builtin", value);
      } else {
        result += escapeHtml(value);
      }
      index += value.length;
      continue;
    }

    result += escapeHtml(code[index]);
    if (!/\s/.test(code[index])) expectDefinition = false;
    index += 1;
  }

  return result;
}

/** Returns escaped HTML. Python receives token spans; other languages stay plain and safe. */
export function highlightCode(code: string, language?: string): string {
  return pythonLanguage(language) ? highlightPython(code) : escapeHtml(code);
}
