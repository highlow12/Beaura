<script lang="ts">
  import { highlightCode } from "$lib/content/syntax-highlight";

  let {
    code,
    language = "text",
    ariaLabel = undefined,
    flush = false,
    wrap = true,
  } = $props<{
    code: string;
    language?: string;
    ariaLabel?: string;
    flush?: boolean;
    wrap?: boolean;
  }>();
</script>

<pre class:flush class:wrap aria-label={ariaLabel}><code class={`language-${language}`}>{@html highlightCode(code, language)}</code></pre>

<style>
  pre {
    margin: var(--space-4) 0;
    max-width: 100%;
    overflow-x: auto;
    border: 1px solid color-mix(in srgb, var(--primary) 35%, var(--border));
    border-radius: var(--radius-md);
    background: var(--code-bg);
    color: var(--code-text);
    padding: var(--space-4);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    line-height: 1.7;
    white-space: pre;
  }

  pre.flush {
    margin: 0;
  }

  pre.wrap {
    white-space: pre-wrap;
  }

  code {
    display: block;
    background: transparent;
    color: inherit;
    padding: 0;
    font: inherit;
    white-space: inherit;
  }

  pre :global(.syntax-keyword) { color: #c586c0; }
  pre :global(.syntax-builtin) { color: #4ec9b0; }
  pre :global(.syntax-string) { color: #ce9178; }
  pre :global(.syntax-number) { color: #b5cea8; }
  pre :global(.syntax-comment) { color: #6a9955; }
  pre :global(.syntax-decorator),
  pre :global(.syntax-definition) { color: #dcdcaa; }
</style>
