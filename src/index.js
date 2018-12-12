import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './statics/scss/index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';                     // Redux provider. Pass store to the context. So the connect from react-redux will work.
import store from './store/reducers';


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App showT10/>
        </Router>
    </Provider>
    ,
    document.getElementById('root') );

registerServiceWorker();
