import { Toolbar } from "./Toolbar.js";

export function Previewer(props) {
  const store = props.store;
  return (
    <div className="previewer container bg-secondary p-0">
      <Toolbar title="Preview" />
      
        {store.markdown.currentMarkdown ?
          <p>{store.markdown.currentMarkdown}</p> :
          <p>Nothing to preview</p>
        }
      
    </div>
  );
}