import { Editor } from './Editor.js';
import { Previewer } from './Previewer.js';

export function App(props) {
  const store = props;

  return (
    <main className="d-flex justify-content-center align-items-center">
      <div className='container'>
        <h1>Markdown Previewer</h1>
        <Editor store={store}/>
        <Previewer store={store}/>
      </div>
    </main>
  );
}

export default App;