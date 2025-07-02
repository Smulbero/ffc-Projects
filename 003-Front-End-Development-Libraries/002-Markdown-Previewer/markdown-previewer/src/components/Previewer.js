import { Toolbar } from "./Toolbar.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js"
import DOMPurify from 'dompurify';

export function Previewer(props) {
  const store = props.store;  

  // Sanitize the markdown content to prevent XSS attacks
  const sanitizedHTML = DOMPurify.sanitize(marked.parse(store.markdown.currentMarkdown).replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/,""));
  marked.setOptions({
    breaks: true,
  });

  return (
    <div className="previewer container bg-secondary p-0" id="preview-container">
      <Toolbar title="Preview" />
      <div
        id="preview"
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
      >
      </div>      
    </div>
  );
}