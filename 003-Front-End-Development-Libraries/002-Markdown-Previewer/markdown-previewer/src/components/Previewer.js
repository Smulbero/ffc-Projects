import { Toolbar } from "./Toolbar.js";

export function Previewer(props) {
const store = props.store;
  return (
    <div className="previewer container">
      <p>This is in Previewer component</p>
        <Toolbar title="Preview"/>
        <div>
          {store.markdown.currentMarkdown ?
          <p>{store.markdown.currentMarkdown}</p> :
          <p>Nothing to preview</p>
          }
        </div>
    </div>
  );
}