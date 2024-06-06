import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import supabase from "../../api/supabase.client";
import { getAvatarPublicUrl } from "../../api/supabase.storage";
import { updateAvartarURL } from "../../redux/slice/userSlice";

const UserProfileImage = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.user);
  // 프로필 이미지 업로드 함수
  const uploadProfileImage = async (e) => {
    try {
      setIsUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("이미지를 선택해주세요.");
      }
      const file = e.target.files[0];
      //이미지 업로드
      const { data: imageData, error } = await supabase.storage
        .from("avatars")
        .upload(`${email}/${file.name}`, file);

      if (error) {
        console.error("이미지 업로드과정에 에러", error);
      }
      const publicUrl = getAvatarPublicUrl(imageData.path);
      setProfileImage(publicUrl);
      dispatch(updateAvartarURL({ avatar_url: publicUrl }));
    } catch (error) {
      setUploadError(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <ProfileWrapper>
      {!profileImage && (
        <ProfileLabel htmlFor="profile-image">프로필 이미지</ProfileLabel>
      )}
      <ProfileInput
        id="profile-image"
        type="file"
        accept="image/*"
        onChange={uploadProfileImage}
        disabled={isUploading}
      />

      <div>
        {isUploading && <UploadingMessage>업로드 중...</UploadingMessage>}
        {uploadError && <ErrorMessage>오류: {uploadError}</ErrorMessage>}
        {profileImage && (
          <ProfileImage src={profileImage} alt="프로필 이미지" />
        )}
      </div>
    </ProfileWrapper>
  );
};

export default UserProfileImage;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 2px solid;
  border-radius: 50%;
  height: 200px;
  width: 200px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    border-color: #b8c3e0;
  }
`;

const ProfileLabel = styled.label`
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
`;

const ProfileInput = styled.input`
  margin-bottom: 12px;
  display: none;
`;

const UploadingMessage = styled.div`
  color: #999;
  margin-bottom: 12px;
`;

const ErrorMessage = styled.div`
  color: #999;
  margin-bottom: 12px;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-color: 1px solid;
  border-radius: 75px; // 원형 이미지로 만들기
  object-fit: cover;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
