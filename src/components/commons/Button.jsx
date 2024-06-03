import styled from "styled-components";

const Button = ({ text, handleClick, width }) => {
  return (
    <Btn width={width} onClick={handleClick}>
      {text}
    </Btn>
  );
};

export default Button;

export const Btn = styled.button`
  background-color: #136dc1;
  width: ${(pros) => pros.width || "423px"};
  height: 53px;
  border-radius: 50px;
  color: white;

  font-size: 30px;

  margin: 20px;

  &:hover {
    background-color: white;
    color: #136dc1;
  }
`;