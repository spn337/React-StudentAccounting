import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store'
import { Provider } from 'react-redux';
import App from './app';
import "antd/dist/antd.css";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));