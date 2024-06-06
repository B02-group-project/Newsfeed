import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import signInWithEmail from "../../api/signWithEmail";
import useInput from "../../hooks/useInput";
import { updateEmailPassword } from "../../redux/slice/userSlice";
import {
  isValidEmail,
  isValidPassword,
  validatePasswordMatch,
} from "../../utils/validator";
import { Input, LoginData } from "../SignUpPage/style";
import Button from "./Button";

const EmailPasswordForm = ({ handleClick, isSignInPage }) => {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [checkPassword, setCheckPassword] = useInput("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isValid = () => {
    if (!isValidEmail(email)) {
      alert("유효한 이메일을 입력하세요.");
      return false;
    }
    if (!isValidPassword(password)) {
      alert(`유효하지 않은 비밀번호 형식입니다.
      형식 : 최소 8글자 , 알파벳 소문자 / 숫자 / 특수기호(! @ # $ ? ) 1개이상 포함`);
      return false;
    }

    if (!validatePasswordMatch(password, checkPassword) && !isSignInPage) {
      alert("비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };
  // 회원가입 진행시, 다음 컴포넌트로 넘기기,
  const handleNextStep = (e) => {
    e.preventDefault();
    if (isValid()) {
      handleClick();
      dispatch(updateEmailPassword({ email, password }));
    }
  };

  // 로그인시, 로그인 로직 넣기
  const handleLogin = (e) => {
    e.preventDefault();

    if (isValid()) {
      //유효성 검사 통과되면
      // 로그인 함수 실행
      signInWithEmail(email, password).then((result) => {
        const userdata = result.user;
        if (result.success) {
          console.log("사용자 데이터 : ", userdata);
          console.log("세션 데이터 : ", result.session);
          navigate("/main");
        } else {
          alert("회원정보가 일치하지 않습니다.");
          console.log("오류 메시지:", result.error);
        }
      });
    }
  };

  return (
    <>
      <LoginData onSubmit={isSignInPage ? handleLogin : handleNextStep}>
        <Input
          type="text"
          value={email}
          onChange={setEmail}
          placeholder={isSignInPage ? "email" : "ex) blackberry@berry.com"}
        />
        <Input
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="passoword"
          required
        />
        {!isSignInPage && (
          <Input
            type="password"
            value={checkPassword}
            onChange={setCheckPassword}
            placeholder="passoword check"
          />
        )}
        <Button text={isSignInPage ? "로그인" : "다음"} />
      </LoginData>
    </>
  );
};

export default EmailPasswordForm;
