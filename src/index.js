import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './statics/css/index.css';
import './statics/css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-table/react-table.css";
import "./statics/css/react-table-dark.css";
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';                     // Redux provider. Pass store to the context. So the connect from react-redux will work.
import store from './store/reducers';


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    ,
    document.getElementById('root') );

registerServiceWorker();
