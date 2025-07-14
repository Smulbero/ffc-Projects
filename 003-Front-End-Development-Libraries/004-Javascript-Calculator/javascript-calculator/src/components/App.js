import Display from './Display';
import ButtonPanel from './ButtonPanel';

function App() {
  return (
    <main className="App dark bg-light">
        <h1>JavaScript Calculator</h1>
      <div className="calculator container d-flex flex-column justify-content-center align-items-center">
        <Display />
        <ButtonPanel />
      </div>
    </main>
  );
}

export default App;
