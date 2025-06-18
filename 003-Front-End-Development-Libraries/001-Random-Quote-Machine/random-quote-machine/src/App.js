import './styles/App.scss';
import { useDispatch } from 'react-redux'

function App() {  

  const newQuote = () => {
    console.log("New quote button clicked");
    console.log(this.props.getRandomQuote())
  }

  return (
    <main>
      <h1>Random Quote Machine</h1>

      <div className="container">   
        
        <button className="new-quote-button" onClick={newQuote}>New Quote</button>
      </div>
    </main>
  );
}

export default App;