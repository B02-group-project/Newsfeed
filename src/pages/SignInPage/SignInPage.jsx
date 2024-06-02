import supabase from "../../api/supabase.api";
import Button from "../../components/commons/Button";
import useInput from "../../hooks/useInput";
import {
  Header,
  Input,
  LoginData,
  SignInWrapper,
  Wrapper,
} from "./SignInPage.styled";

const SignInPage = () => {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  // const [name, setName] = useInput("");
  // const [birthday, setBirthDay] = useInput("");
  // const [phone, setPhone] = useInput("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) console.error(error);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <div>{/*이미지 들어가는 칸 */}</div>
      <SignInWrapper>
        <LoginData>
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
        </LoginData>
        {/* <UserData>
          <Input
            type="text"
            value={name}
            onChange={setName}
            placeholder="이름"
          />
          <Input
            type="text"
            value={birthday}
            onChange={setBirthDay}
            placeholder="생년월일 8자리"
          />
          <Input
            type="text"
            value={phone}
            onChange={setPhone}
            placeholder="휴대전화 번호"
          />
        </UserData> */}
        <Button text={"회원가입"} handleClick={handleSignUp} />
        <div>
          계정이 있으신가요? <a>로그인</a>
        </div>
      </SignInWrapper>
    </Wrapper>
  );
};

export default SignInPage;
