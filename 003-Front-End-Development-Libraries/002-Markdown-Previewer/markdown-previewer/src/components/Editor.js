import { Toolbar } from "./Toolbar.js";

export function Editor(props) {
  const store = props.store;
  const handleChange = (event) => {
    store.setMarkdown(event.target.value);
  };

  return (
    <div className="editor container">      
      <Toolbar title="Editor"/>
      <textarea
        id="editor"
        placeholder="Type your markdown here..."
        rows="10"
        onChange={e => handleChange(e)}>
      </textarea>
    </div>
  );
}