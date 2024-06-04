import EmailPasswordForm from "../../components/SignUpPage/EmailPasswordForm";
import { ImgWrapper, SignInWrapper, Wrapper } from "./SignUpPage.styled";

const SignUpPage = () => {
  // const [activeForm, setActiveForm] = useState(1);

  // const nextForm = () => {
  //   setActiveForm((prevState) => prevState + 1);
  // };

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
        {/* {activeForm === 1 && <EmailPasswordForm handleClick={nextForm} />}
        {activeForm === 2 && <PersonalInfoForm handleClick={nextForm} />}
        {activeForm === 3 && <NicknameAvatarForm handleClick={nextForm} />}
        {activeForm === 4 && <SignUpComplete />} */}
        <EmailPasswordForm />
        <div>
          계정이 있으신가요? <a>로그인</a>
        </div>
      </SignInWrapper>
    </Wrapper>
  );
};

export default SignUpPage;
