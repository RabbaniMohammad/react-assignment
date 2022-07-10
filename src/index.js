import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBHVV3_WarGlP2xRAMkTTcVvp3ed3tsWnA",
  authDomain: "crwn-clothing-db-ab6ca.firebaseapp.com",
  projectId: "crwn-clothing-db-ab6ca",
  storageBucket: "crwn-clothing-db-ab6ca.appspot.com",
  messagingSenderId: "304767459175",
  appId: "1:304767459175:web:7954c383bc96f43c6799c2",
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();

const reduxStore = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebase)
  )
); //binding for redux to get firestore

ReactDOM.render(
  <Provider store={reduxStore}>
    <BrowserRouter>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={firebaseConfig}
        dispatch={reduxStore.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <App />
      </ReactReduxFirebaseProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
