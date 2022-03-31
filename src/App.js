import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import ProjectPetApp from "./reducers";
import Routes from "./routers";
import MessageModal from './components/Modals/MessageModal';
import LoadingModal from './components/Modals/LoadingModal';
import ReactGA from 'react-ga';
require('dotenv').config();



const trackingId = "G-G4BEGJNH57"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);



// create store
const store = createStore(
  ProjectPetApp,
  composeWithDevTools()
  // applyMiddleware(...middleware),
  // other store enhancers if any
);

function App() {
  return (
    <>
      <LoadingModal />
      <Provider store={store}>
        <MessageModal />

        <Routes />
      </Provider>
    </>
  );
}

export default App;
