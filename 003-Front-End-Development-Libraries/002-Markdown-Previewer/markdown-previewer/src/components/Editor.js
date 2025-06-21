import { Toolbar } from "./Toolbar.js";

export function Editor(props) {
  const store = props.store;
  const handleChange = (event) => {
    store.setMarkdown(event.target.value);
  };

  return (
    <div className="editor container bg-secondary p-0 mb-4">      
      <Toolbar title="Editor" />
      <textarea
        id="editor"
        placeholder="Type your markdown here..."
        rows="4"
        onChange={e => handleChange(e)}>
      </textarea>
    </div>
  );
}