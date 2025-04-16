<script>
import MarkdownIt from 'markdown-it';
import footnote from 'markdown-it-footnote';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
export default {
  props: {
    markdownContent: String
  },
  computed: {
    renderedMarkdown() {
      const md = new MarkdownIt({
        html: true,
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return `<pre class="hljs"><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
            } catch (error) {
              console.error("Syntax highlighting failed:", error);
              return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
            }
          }
          return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
        }
      }).use(footnote);
      return md.render(this.markdownContent);
    }
  }
};
</script>
<template>
  <div class="markdown-content" v-html="renderedMarkdown"></div>
</template>
<style>
/* Need to use non-scoped styles for v-html content */
.markdown-content {
  line-height: 1.6;
  color: var(--text-color, #333);
  max-width: 100%;
  text-align: left;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-content h1 {
  font-size: 2em;
  border-bottom: 1px solid var(--border-color, #eaecef);
  padding-bottom: 0.3em;
}

.markdown-content h2 {
  font-size: 1.5em;
  border-bottom: 1px solid var(--border-color, #eaecef);
  padding-bottom: 0.3em;
}

.markdown-content p,
.markdown-content ul,
.markdown-content ol {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-content strong {
  font-weight: 600;
}

.markdown-content a {
  color: var(--link-color, #0366d6);
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content img {
  max-width: 100%;
  box-sizing: border-box;
}

.markdown-content blockquote {
  padding: 0 1em;
  color: var(--blockquote-color, #6a737d);
  border-left: 0.25em solid var(--blockquote-border, #dfe2e5);
  margin: 0 0 16px 0;
}

.markdown-content table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 16px;
  display: block;
  overflow-x: auto;
}

.markdown-content table th,
.markdown-content table td {
  padding: 6px 13px;
  border: 1px solid var(--table-border, #dfe2e5);
}

.markdown-content table tr {
  background-color: var(--bg-color, #fff);
  border-top: 1px solid var(--table-border, #c6cbd1);
}

.markdown-content table tr:nth-child(2n) {
  background-color: var(--table-alt-row, #f6f8fa);
}

/* Code block styling */
.markdown-content pre.hljs {
  margin: 0 0 16px;
  padding: 16px;
  font-size: 85%;
  line-height: 1.45;
  background-color: var(--code-bg, #f6f8fa);
  border-radius: 6px;
  border: 1px solid var(--code-border, #e1e4e8);
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  white-space: pre-wrap;       /* Since 2.1 */
  word-wrap: break-word;       /* Internet Explorer 5.5+ */
}

.markdown-content code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: var(--inline-code-bg, rgba(27, 31, 35, 0.05));
  border-radius: 3px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

.markdown-content pre code {
  background-color: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
}

/* Footnotes styling */
.markdown-content .footnotes {
  margin-top: 32px;
  font-size: 0.85em;
  color: var(--footnote-color, #6a737d);
  border-top: 1px solid var(--border-color, #eaecef);
  padding-top: 16px;
}

.markdown-content .footnote-ref {
  vertical-align: super;
  font-size: smaller;
}

.markdown-content .footnote-backref {
  text-decoration: none;
}

/* Dark theme compatibility */
:root[data-theme="dark"] .markdown-content {
  --text-color: #EAE1E8;
  --border-color: #3e3e3e;
  --link-color: #58a6ff;
  --blockquote-color: #9ca3af;
  --blockquote-border: #4b5563;
  --table-border: #4b5563;
  --table-alt-row: #2d2d2d;
  --code-bg: #1e1e1e;
  --code-border: #3e3e3e;
  --inline-code-bg: rgba(200, 200, 200, 0.1);
  --footnote-color: #9ca3af;
}

/* Improve code text readability in dark mode */
:root[data-theme="dark"] .markdown-content pre.hljs code {
  color: #d4d4d4; /* Lighter color for better contrast against dark background */
}

/* Override highlight.js colors for dark mode */
:root[data-theme="dark"] .markdown-content .hljs-comment,
:root[data-theme="dark"] .markdown-content .hljs-quote {
  color: #6a9955;
}

:root[data-theme="dark"] .markdown-content .hljs-keyword,
:root[data-theme="dark"] .markdown-content .hljs-selector-tag,
:root[data-theme="dark"] .markdown-content .hljs-literal,
:root[data-theme="dark"] .markdown-content .hljs-name,
:root[data-theme="dark"] .markdown-content .hljs-strong {
  color: #569cd6;
}

:root[data-theme="dark"] .markdown-content .hljs-attribute {
  color: #9cdcfe;
}

:root[data-theme="dark"] .markdown-content .hljs-string,
:root[data-theme="dark"] .markdown-content .hljs-doctag,
:root[data-theme="dark"] .markdown-content .hljs-value,
:root[data-theme="dark"] .markdown-content .hljs-regexp {
  color: #ce9178;
}

:root[data-theme="dark"] .markdown-content .hljs-number,
:root[data-theme="dark"] .markdown-content .hljs-variable,
:root[data-theme="dark"] .markdown-content .hljs-template-variable,
:root[data-theme="dark"] .markdown-content .hljs-literal {
  color: #b5cea8;
}

:root[data-theme="dark"] .markdown-content .hljs-bullet,
:root[data-theme="dark"] .markdown-content .hljs-link {
  color: #d2a8ff;
}

:root[data-theme="dark"] .markdown-content .hljs-emphasis {
  color: #c586c0;
  font-style: italic;
}

:root[data-theme="dark"] .markdown-content .hljs-function,
:root[data-theme="dark"] .markdown-content .hljs-section,
:root[data-theme="dark"] .markdown-content .hljs-title {
  color: #dcdcaa;
}
</style>