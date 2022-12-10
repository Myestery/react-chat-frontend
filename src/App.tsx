import "./assets/scss/theme.scss";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Routes from "./routes";
import { changelayoutMode } from "./redux/actions";

// import config from "./config";
// import { initFirebaseBackend } from "./helpers/firebase_helper";

// import fakeBackend from "./helpers/fakeBackend";

// scss


// actions



//Route


// Import Firebase Configuration file


//api config




// TODO
// fakeBackend();

// const firebaseConfig = {
//   apiKey: config.FIRE_BASE.API_KEY,
//   authDomain: config.FIRE_BASE.AUTH_DOMAIN,
//   databaseURL: config.FIRE_BASE.DATABASEURL,
//   projectId: config.FIRE_BASE.PROJECTID,
//   storageBucket: config.FIRE_BASE.STORAGEBUCKET,
//   messagingSenderId: config.FIRE_BASE.MESSAGINGSENDERID,
//   appId: config.FIRE_BASE.APPID,
//   measurementId: config.FIRE_BASE.MEASUREMENTID,
// };

// // init firebase backend
// initFirebaseBackend(firebaseConfig);

const App = () => {
  const dispatch = useDispatch();

  const { layoutMode } = useSelector((state: any) => ({
    layoutMode: state.Layout.layoutMode,
  }));

  // Dark/Light Mode 
  useEffect(() => {
    var getLayoutMode = localStorage.getItem("layoutMode");
    if (getLayoutMode) {
      dispatch(changelayoutMode(getLayoutMode));
    } else {
      dispatch(changelayoutMode(layoutMode));
    }
  }, [layoutMode, dispatch]);

  return <Routes />;
};

export default App;
