import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import './styles/App.scss';
import App from './components/App.js';
import { store } from './components/store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);