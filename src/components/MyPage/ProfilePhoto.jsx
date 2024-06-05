import React from 'react';
import styled from 'styled-components';

// 프로필 사진 스타일
const ProfilePhotoContainer = styled.div`
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center;
  margin: 20px 0; /* 위아래 마진 */
  padding-left: 13%; /* 왼쪽 패딩 추가 */
`;

const ProfileImage = styled.img`
  width: 150px; /* 프로필 사진 크기 */
  height: 150px;
  border-radius: 50%; /* 원형으로 만들기 */
  object-fit: cover; /* 이미지가 컨테이너를 채우도록 */
  object-position: center; /* 이미지 중앙에 맞게 배치 */
  border: 2px solid #ddd; /* 테두리 추가 */
`;

const ProfilePhoto = ({ src }) => {
  return (
    <ProfilePhotoContainer>
      <ProfileImage src={src} alt="Profile" />
    </ProfilePhotoContainer>
  );
};

export default ProfilePhoto;
