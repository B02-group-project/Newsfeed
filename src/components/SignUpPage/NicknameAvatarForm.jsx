import { useDispatch } from "react-redux";
import useInput from "../../hooks/useInput";
import { updateNicknameAvatar } from "../../redux/slice/userSlice";
import Button from "../commons/Button";
import { AvatarData, Header, Input } from "./style";

const NicknameAvatarForm = ({ handleClick }) => {
  const [avatarUrl, setAvatarUrl] = useInput("");
  const [nickname, setNickname] = useInput("");
  const [desc, setDesc] = useInput("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
    dispatch(updateNicknameAvatar({ avatarUrl, nickname, desc }));
  };
  return (
    <AvatarData onSubmit={handleSubmit}>
      <Header>추가 내용</Header>
      <Input
        type="text"
        value={avatarUrl}
        onChange={setAvatarUrl}
        placeholder="이미지"
      />
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
