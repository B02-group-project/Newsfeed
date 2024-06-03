import { useState } from "react";
import EmailPasswordForm from "../../components/SignInPage/EmailPasswordForm";
import NicknameAvatarForm from "../../components/SignInPage/NicknameAvatarForm";
import PersonalInfoForm from "../../components/SignInPage/PersonalInfoForm";
import { ImgWrapper, SignInWrapper, Wrapper } from "./SignInPage.styled";

const SignInPage = () => {
  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data, error } = await supabase.auth.signUp({
  //       email,
  //       password,

  //       options: {
  //         redirectTo: "http://localhost:5173/",
  //       },
  //     });
  //     if (error) console.error(error);
  //     console.log(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
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
        {activeForm === 1 && <EmailPasswordForm handleClick={nextForm} />}
        {activeForm === 2 && <PersonalInfoForm handleClick={nextForm} />}
        {activeForm === 3 && <NicknameAvatarForm />}

        <div>
          계정이 있으신가요? <a>로그인</a>
        </div>
      </SignInWrapper>
    </Wrapper>
  );
};

export default SignInPage;
