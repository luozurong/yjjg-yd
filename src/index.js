import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import store from './redux/index'
import App from './App';

import './common/js/fontSize.js'
import './common/css/reset.css'

ReactDOM.render((
    <Provider store = {store}>
        <App/>
    </Provider>
), document.getElementById('root'));
