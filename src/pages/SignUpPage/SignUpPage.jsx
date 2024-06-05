import { useState } from "react";
import { Link } from "react-router-dom";
import NicknameAvatarForm from "../../components/SignUpPage/NicknameAvatarForm";
import PersonalInfoForm from "../../components/SignUpPage/PersonalInfoForm";
import SignUpComplete from "../../components/SignUpPage/SignUpComplete";
import { Header } from "../../components/SignUpPage/style";
import EmailPasswordForm from "../../components/commons/EmailPasswordForm";
import { ImgWrapper, SignInWrapper, Wrapper } from "./SignUpPage.styled";

const SignUpPage = () => {
  const [activeForm, setActiveForm] = useState(1);

  const nextForm = () => {
    setActiveForm((prevState) => prevState + 1);
  };

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
        <Header>회원가입 </Header>
        {activeForm === 1 && <EmailPasswordForm handleClick={nextForm} />}
        {activeForm === 2 && <PersonalInfoForm handleClick={nextForm} />}
        {activeForm === 3 && <NicknameAvatarForm handleClick={nextForm} />}
        {activeForm === 4 && <SignUpComplete />}
        <div>
          계정이 있으신가요?{" "}
          <Link to="/">
            <span>로그인</span>
          </Link>
        </div>
      </SignInWrapper>
    </Wrapper>
  );
};

export default SignUpPage;
