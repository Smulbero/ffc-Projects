import {createStore} from 'redux';

const QUOTES = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    quote: "Life is what happens when you're busy making other plans.",
    author: "John Lennon"
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    quote: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln"
  },
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky"
  },
  {
    quote: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
  {
    quote: "Do one thing every day that scares you.",
    author: "Eleanor Roosevelt"
  },
  {
    quote: "Whether you think you can, or you think you can't – you're right.",
    author: "Henry Ford"
  }
]

const ADD_QUOTE = 'ADD_QUOTE';
const GET_RANDOM_QUOTE = 'GET_RANDOM_QUOTE';

const reducer = (state = QUOTES, action) => {
  switch (action.type) {
    case GET_RANDOM_QUOTE:
      return state[action.index];
    default:
      return state;
  }
}

const store = createStore(reducer);


const getRandomQuote = () => {
  return {
    type: GET_RANDOM_QUOTE,
    index: Math.random() * QUOTES.length
  }
}

const mapStateToProps = (state) => {
  return {
    quotes: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRandomQuote: () => dispatch(getRandomQuote())
  }
}

export {
  store,
  mapStateToProps,
  mapDispatchToProps,
}