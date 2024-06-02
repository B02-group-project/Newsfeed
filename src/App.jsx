import { RouterProvider } from "react-router-dom";
import { ModalProvier } from "./contexts/modal.context";
import router from "./router/routes";

function App() {
  return (
    <ModalProvier>
      <RouterProvider router={router} />
    </ModalProvier>
  );
}

export default App;
