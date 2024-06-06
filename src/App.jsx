import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreatePage from './pages/CreatePage/CreatePage';
import EditPage from './pages/EditPage/EditPage';
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ModalProvider } from "./contexts/modal.context";
import store from "./redux/config/storeconfig";
import router from "./router/routes";
import { ProfileProvider } from "./contexts/ProfileContext";

function App() {
  return (
    <Provider store={store}>
      <ModalProvider>
       <ProfileProvider> 
          <RouterProvider router={router} />
        </ProfileProvider>          
      </ModalProvider>
    </Provider>
  );
}

export default App;
