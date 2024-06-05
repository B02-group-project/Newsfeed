import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Navigation from './Navigation';
import ProfilePhoto from './ProfilePhoto';

// 스타일링된 컨테이너 생성
const ProfileContainer = styled.div`
  display: flex; // flexbox 레이아웃 사용
  flex-direction: column; // 세로 방향으로 아이템 배치
`;

const NavigationAndPhotoContainer = styled.div`
 display: flex; // 가로 방향으로 아이템 배치
  align-items: center; // 아이템들을 세로 중앙에 위치시킴
  justify-content: center;
  margin-right: 33vh; // 상단에 여백 추가 (페이지 높이의 20%)
`;

const Profile = () => {
    const profileImageUrl = 'https://example.com/path/to/profile-image.jpg'; // 실제 프로필 이미지 URL로 변경

    return (
        <ProfileContainer>
            <Header />
            <NavigationAndPhotoContainer>
                <ProfilePhoto src={profileImageUrl} />
                <Navigation />
            </NavigationAndPhotoContainer>
        </ProfileContainer>
    );
}

export default Profile;
