import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import NicknameAvatarForm from "../../components/SignUpPage/NicknameAvatarForm";
import PersonalInfoForm from "../../components/SignUpPage/PersonalInfoForm";
import SignUpComplete from "../../components/SignUpPage/SignUpComplete";
import EmailPasswordForm from "../../components/commons/EmailPasswordForm";
import { Header } from "../LoginPage/LoginPage.styled";
import { ImgWrapper, SignInWrapper, Wrapper } from "./SignUpPage.styled";

const formVariants = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};
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
        <Header> 회원가입</Header>
        <motion.div
          key={activeForm}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={formVariants}
          transition={{ duration: 0.5 }}
        >
          {activeForm === 1 && <EmailPasswordForm handleClick={nextForm} />}
          {activeForm === 2 && <PersonalInfoForm handleClick={nextForm} />}
          {activeForm === 3 && <NicknameAvatarForm handleClick={nextForm} />}
          {activeForm === 4 && <SignUpComplete />}
        </motion.div>
        {activeForm === 1 && (
          <div>
            계정이 있으신가요?{" "}
            <Link to="/">
              <span>로그인</span>
            </Link>
          </div>
        )}
      </SignInWrapper>
    </Wrapper>
  );
};

export default SignUpPage;
