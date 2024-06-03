import { createContext, useContext, useState } from "react";
import Modal from "../components/commons/Modal/Modal";

const initialState = {
  open: () => {},
  close: () => {},
};
const ModalContext = createContext(initialState);
//커스텀 훅
export const useModal = () => useContext(ModalContext);

export function ModalProvier({ children }) {
  const [modalElement, setModalElement] = useState(null);

  const value = {
    open: ({ title, content }) => {
      const element = <Modal title={title} content={content} />;
      setModalElement(element);
    },
    close: () => {
      setModalElement(null);
    },
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modalElement}
    </ModalContext.Provider>
  );
}
