import styled from "styled-components";

function BackDrop({ children }) {
  return <Back>{children}</Back>;
}

export default BackDrop;

const Back = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
