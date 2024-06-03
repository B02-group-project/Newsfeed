import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { updateEmailPassword } from "../../redux/slice/userSlice";
import Button from "../commons/Button";
import { Header, Input, LoginData } from "./style";

const EmailPasswordForm = ({ handleClick }) => {
  const [email, setEmail] = useInput();
  const [password, setPassword] = useInput();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
    dispatch(updateEmailPassword({ email, password }));
  };

  return (
    <LoginData onSubmit={handleSubmit}>
      <Header>Sign In</Header>
      <Input
        type="text"
        value={email}
        onChange={setEmail}
        placeholder="이메일"
      />
      <Input
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="패스워드"
      />
      <Button text={"다음"} />
    </LoginData>
  );
};

export default EmailPasswordForm;
