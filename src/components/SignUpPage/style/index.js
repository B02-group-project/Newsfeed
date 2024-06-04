import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  margin-left: auto;
  margin-right: auto;

  padding: 10px;

  border-radius: 50px;

  height: 788px;
  width: 1214px;

  background-color: #b8c3e0;
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
  margin-left: 20px;
  margin-bottom: 5px;
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

export const LoginData = styled.form`
  display: flex;
  flex-direction: column;
`;

export const UserData = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 51px;
`;

export const AvatarData = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.span`
  margin-bottom: 30px;
  margin-left: 20px;
  font-size: 40px;
  font-weight: 900;
`;
