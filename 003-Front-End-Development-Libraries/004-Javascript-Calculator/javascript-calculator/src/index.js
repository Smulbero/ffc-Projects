import ReactDOM from 'react-dom/client';
import App from './components/App.js';
import './styles/App.scss'
import { Provider } from 'react-redux';
import { store } from './components/redux.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

