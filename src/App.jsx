import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { ProfileProvider } from "./contexts/ProfileContext";
import { ModalProvider } from "./contexts/modal.context";
import store from "./redux/config/storeconfig";
import router from "./router/routes";

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
