import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/App.scss';
import App from './components/App.js';
import {Provider, connect} from 'react-redux'
import {mapStateToProps, mapDispatchToProps, store} from './redux.js';

const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(App)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>    
    <ConnectedComponent />
  </Provider>
);