import supabase from "../../api/supabase.client";
import useInput from "../../hooks/useInput";
import Button from "../commons/Button";
import { Header, Input, LoginData } from "./style";

const EmailPasswordForm = () => {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");

  const signUpNewUser = async (e) => {
    e.preventDefault();

    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error("에러 발생" + error);
    } else {
      console.log(user);
      alert("회원가입이 성공적으로 완료되었습니다. ");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   dispatch(updateEmailPassword({ email, password }));
  // };

  return (
    <LoginData>
      <Header>Sign In </Header>
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
      <Button text={"회원가입"} handleClick={signUpNewUser} />
    </LoginData>
  );
};

export default EmailPasswordForm;
