import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
const { io } = require("socket.io-client"); // actions
const socket = io("http://localhost:4000/chat");

window.socket = socket;
declare global {
  interface Window {
    socket: any;
  }
}
ReactDOM.render(
  <Provider store={configureStore({})}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
