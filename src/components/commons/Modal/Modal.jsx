import styled from "styled-components";
import { useModal } from "../../../contexts/modal.context";
import BackDrop from "./BackDrop";

function Modal({ title, content }) {
  const modal = useModal();
  return (
    <BackDrop>
      <ModalStyled className="modal">Modal</ModalStyled>
      <h1>{title}</h1>
      <span>{content}</span>
      <button onClick={() => modal.close()}>닫기</button>
    </BackDrop>
  );
}

export default Modal;

const ModalStyled = styled.article`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  max-width: 320px;
  width: 100%;
`;
