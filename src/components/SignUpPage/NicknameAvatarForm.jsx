import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { updateNicknameDesc } from "../../redux/slice/userSlice";
import { isValidNickname } from "../../utils/validator";
import Button from "../commons/Button";
import UserProfileImage from "../commons/UserProfileImage";
import { AvatarData, Input } from "./style";

const NicknameAvatarForm = ({ handleClick }) => {
  const [nickname, setNickname] = useInput("@");
  const [desc, setDesc] = useInput("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidNickname(nickname)) {
      alert("닉네임 형식이 올바르지 않습니다.");
      return;
    }
    handleClick();
    dispatch(updateNicknameDesc({ nickname, desc }));
  };

  return (
    <AvatarData onSubmit={handleSubmit}>
      <UserProfileImage />
      <Input
        type="text"
        value={nickname}
        onChange={setNickname}
        placeholder="사용할 아이디(@_OOO_)"
      />
      <Input
        type="text"
        value={desc}
        onChange={setDesc}
        placeholder="추가 정보를 넣어주세요~!"
      />
      <Button type="submit" text={"가입하기"} />
    </AvatarData>
  );
};

export default NicknameAvatarForm;
