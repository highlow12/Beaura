import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { highlightCode } from '../../src/lib/content/syntax-highlight';

const PYTHON_FENCE = /<pre><code class="language-(python|py|python3|py3)">([\s\S]*?)<\/code><\/pre>/gi;
const SYNTAX_CLASSES = [
  'syntax-keyword',
  'syntax-builtin',
  'syntax-string',
  'syntax-number',
  'syntax-comment',
  'syntax-decorator',
  'syntax-definition',
];

function decodeCodeEntities(value: string): string {
  return value.replace(
    /&(amp|lt|gt|quot|#39|#\d+|#x[0-9a-f]+);/gi,
    (entity) => {
      const lower = entity.toLowerCase();
      if (lower === '&amp;') return '&';
      if (lower === '&lt;') return '<';
      if (lower === '&gt;') return '>';
      if (lower === '&quot;') return '"';
      if (lower === '&#39;') return "'";
      if (lower.startsWith('&#x')) {
        return String.fromCodePoint(Number.parseInt(lower.slice(3, -1), 16));
      }
      if (lower.startsWith('&#')) {
        return String.fromCodePoint(Number.parseInt(lower.slice(2, -1), 10));
      }
      return entity;
    },
  );
}

function highlightPythonFences(html: string): string {
  return html.replace(PYTHON_FENCE, (_match, language: string, code: string) =>
    `<pre><code class="language-${language}">${highlightCode(decodeCodeEntities(code), language)}</code></pre>`,
  );
}

/** Only the content builder parses Markdown; no parser ships in the application. */
export function compileMarkdown(markdown: string): string {
  const rendered = marked.parse(markdown, { async: false }) as string;
  return sanitizeHtml(highlightPythonFences(rendered), {
    allowedTags: ['p','br','strong','em','del','h1','h2','h3','h4','h5','h6','ul','ol','li','blockquote','pre','code','span','hr','a','img','table','thead','tbody','tr','th','td'],
    allowedAttributes: { a:['href','title','rel','target','aria-label'], img:['src','alt','title'], code:['class'], span:['class'], ol:['start'] },
    allowedClasses: { span: SYNTAX_CLASSES },
    allowedSchemes: ['http','https','mailto'],
    allowProtocolRelative: false,
    transformTags: {
      a: (_tag, attrs) => ({tagName:'a',attribs: /^https?:/i.test(attrs.href ?? '') ? {...attrs, target:'_blank',rel:'noopener noreferrer', 'aria-label':`${attrs.title ?? '외부 링크'} (새 탭)`} : attrs})
    },
    exclusiveFilter: (frame) => frame.tag === 'img' && !frame.attribs.src?.startsWith('/generated/assets/'),
  });
}
