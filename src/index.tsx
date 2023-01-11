import { MediaConnection, Peer } from "peerjs";

import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "./redux/store";
import reportWebVitals from "./reportWebVitals";

const { io } = require("socket.io-client"); // actions
const socket = io(process.env.REACT_APP_WS_URL);
const user = localStorage.getItem("authUser");
let peer: Peer;
if (user) {
  peer = new Peer(JSON.parse(localStorage.authUser).data.user.id, {
    host: (process.env.REACT_APP_PEER_HOST as string) || "/",
    port: +(process.env.REACT_APP_PEER_PORT as string) || 3001,
  });
  // console.log("peer", peer);
} else {
  peer = new Peer();
}
peer.on("call", function (call) {
  // Answer the call, providing our mediaStream
  window.call = call;
});
window.socket = socket;
window.peer = peer;
declare global {
  interface Window {
    socket: any;
    peer: Peer;
    call: MediaConnection;
   stream: MediaStream; 
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
