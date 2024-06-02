import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  margin-left: auto;
  margin-right: auto;
  background-color: #b8c3e0;
  padding: 10px;

  border-radius: 50px;
  height: 788px;
  width: 1214px;
`;
export const SignInWrapper = styled.div`
  background-color: white;
  border-radius: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 714px;
  width: 526px;
`;

export const Input = styled.input`
  width: 413px;
  height: 52px;
  margin: 5px;
  border-radius: 60px;

  font-size: 20px;
  text-indent: 15px;

  border: solid 2px #989898;

  background-color: #f9f9f9;

  &:focus {
    border: solid 2px #656565;
    outline: none;
  }
`;

export const LoginData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserData = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 51px;
`;

export const Header = styled.div`
  margin-bottom: 30px;
  font-size: 40px;
  font-weight: 900;
`;
