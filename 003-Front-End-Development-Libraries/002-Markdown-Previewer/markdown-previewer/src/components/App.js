import { Editor } from './Editor.js';
import { Previewer } from './Previewer.js';

export function App(props) {
  const store = props;
  return (
    <main className="app">
      <h1>Markdown Previewer</h1>
      <Editor store={store}/>
      <Previewer store={store}/>
    </main>
  );
}

export default App;