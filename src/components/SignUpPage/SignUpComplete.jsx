import { useSelector } from "react-redux";
import supabase from "../../api/supabase.client";
import Button from "../commons/Button";
import { UserData } from "./style";

const SignUpComplete = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  // 회원가입 로직
  const signUpNewUser = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      // options: {
      //   data: {
      //     user,
      //   },
      //   emailRedirectTo: "http://localhost:5173/",
      // },
    });
    console.log("signup: ", { data, error }); // data에 뭐 들어있는지 확인하기
  };

  if (!user) {
    return (
      <UserData>
        <h1>환영합니다!!!</h1>
        <Button text={"마이페이지로 이동"} onClick={signUpNewUser} />
      </UserData>
    );
  } else {
    return (
      <UserData>
        <div>
          Logged in!
          <button>로그아웃</button>
        </div>
      </UserData>
    );
  }
};

export default SignUpComplete;
