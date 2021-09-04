import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'antd/dist/antd.css';
ReactDOM.render(
  // <React.StrictMode>//此标签用于开始React的严格模式，由于antd的代码更新和React最新有出入，所以不禁用的话每次都会有报错提示，为了好看就先注释了
  <Provider store={store}>
    <App />
  </Provider>,
  /* </React.StrictMode> */
  document.getElementById('root')
);