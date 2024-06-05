import { Link } from "react-router-dom";
import EmailPasswordForm from "../../components/commons/EmailPasswordForm";
import { Header, ImgWrapper, SignInWrapper, Wrapper } from "./LoginPage.styled";

const LoginPage = () => {
  return (
    <Wrapper>
      <ImgWrapper>
        <img
          src={
            "https://gpsgbozbtdkzjixxhdar.supabase.co/storage/v1/object/sign/images/BlackBerry_icon.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvQmxhY2tCZXJyeV9pY29uLnBuZyIsImlhdCI6MTcxNzM5NDM5NywiZXhwIjoxNzE5OTg2Mzk3fQ.PuH4X2Xbwgx--6CcW25def6GbBdBerjNtQdyIUI_wiI&t=2024-06-03T05%3A59%3A58.283Z"
          }
        />
      </ImgWrapper>
      <SignInWrapper>
        <Header>로그인 </Header>
        <EmailPasswordForm isSignInPage={true} />
        <div>
          계정이 없으신가요?
          <Link to="/signup">
            <span>회원가입</span>
          </Link>
        </div>
      </SignInWrapper>
    </Wrapper>
  );
};

export default LoginPage;
