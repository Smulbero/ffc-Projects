import { Toolbar } from "./Toolbar.js";


export function Editor(props) {
  const store = props.store;
  const handleChange = (event) => {
    store.setMarkdown(event.target.value);
  };

  return (
    <div className="editor container bg-secondary p-0 mb-4" id="editor-container">      
      <Toolbar title="Editor" />
      <textarea
        id="editor"        
        rows="4"
        onChange={e => handleChange(e)}>     
        {store.markdown.currentMarkdown}     
      </textarea>
    </div>
  );
}