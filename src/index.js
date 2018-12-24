import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import { register } from './eslava_serviceWorker';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
// register my service worker
register();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
