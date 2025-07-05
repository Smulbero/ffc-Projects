import '../styles/App.scss';
import { Board } from './Board.js';

function App() {

  return (
    <main className="App">
      <div className="container" id="drum-machine">
        <h1>Drum Machine</h1>
        <Board />
      </div>
    </main>
  );
}

export default App;
