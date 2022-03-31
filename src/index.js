import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//BrowserRouter 임포트 해오기
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/configStore"

import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // store를 컴포넌트에 연결하고 싶을 떄, Povider 로 감싸주기 
  <Provider store={store}>
    {/* router 사용하고 싶을 때, BrowserRouter 로 감싸주기 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
