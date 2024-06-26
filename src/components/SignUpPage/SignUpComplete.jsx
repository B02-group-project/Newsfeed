import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import signUp from "../../api/signUp";
import { UserData } from "./style";
async function addUser(user) {
  await signUp(user);
}
const SignUpComplete = () => {
  const user = useSelector((state) => state.user);

  const isMounted = useRef(false);
  useEffect(() => {
    if (isMounted.current) {
      addUser(user);
    } else {
      isMounted.current = true;
    }
  }, [user]); // user가 변경될 때마다 실행되도록 의존성 배열에 user 추가

  return (
    <UserData>
      <h1>환영합니다!!!</h1>
      <Link to="/">
        <span>로그인 페이지로 이동</span>
      </Link>
    </UserData>
  );
};

export default SignUpComplete;
