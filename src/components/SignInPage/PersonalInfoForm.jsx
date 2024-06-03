import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { updatePersonalInfo } from "../../redux/slice/userSlice";
import Button from "../commons/Button";
import { Header, Input, UserData } from "./style";

const PersonalInfoForm = ({ handleClick }) => {
  const [name, setName] = useInput();
  const [birthday, setBirthday] = useInput();
  const [phone, setPhone] = useInput();

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
    dispatch(updatePersonalInfo({ name, birthday, phone }));
  };
  return (
    <UserData onSubmit={handleSubmit}>
      <Header>사용자 정보</Header>
      <Input type="text" value={name} onChange={setName} placeholder="이름" />
      <Input
        type="text"
        value={birthday}
        onChange={setBirthday}
        placeholder="생년월일 8자리"
      />
      <Input
        type="text"
        value={phone}
        onChange={setPhone}
        placeholder="휴대전화 번호"
      />
      <Button text={"다음"} />
    </UserData>
  );
};

export default PersonalInfoForm;
