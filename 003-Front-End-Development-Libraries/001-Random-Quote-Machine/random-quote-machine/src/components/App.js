
function App(props) {  

  const newQuote = () => {
    // Get a new random quote and update the state
    props.getRandomQuote()
  }

  return (
    <main className="d-flex justify-content-center align-items-center">
      <div className="container text-center">
        <h1>Random Quote Machine</h1>

        <div className="d-flex flex-column justify-content-center align-items-center position-relative" id="quote-box">
          <div className="position-relative">
            <p className="" id="text">{props.quotes.currentQuote.quote}</p>
            <p className="" id="author">- {props.quotes.currentQuote.author}</p> 
                       
          </div>
          <a href="twitter.com/intent/tweet" id="tweet-quote" target="_blank" className="position-absolute bottom-0 start-0">
              <i className="bi bi-twitter-x fs-3"></i>  
            </a> 
          <button className="btn btn-primary" id="new-quote" onClick={newQuote}>New Quote</button>
        </div>
        
      </div>
    </main>
  );
}

export default App;