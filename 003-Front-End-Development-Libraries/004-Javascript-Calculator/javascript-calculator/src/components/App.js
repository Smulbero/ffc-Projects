import Display from './Display';
import ButtonPanel from './ButtonPanel';

function App() {
  return (
    <main className="App container d-flex flex-column align-items-center p-0 m-0 text-light">
        <h1>JavaScript Calculator</h1>
      <div className="calculator container justify-content-center align-items-center p-0">
        <Display />
        <ButtonPanel />
      </div>
    </main>
  );
}

export default App;
