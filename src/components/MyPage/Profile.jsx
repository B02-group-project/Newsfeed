import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import ProfilePhoto from './ProfilePhoto';
import Navigation from './Navigation';
import { useProfile } from '../../contexts/ProfileContext';

const Profile = () => {
  const { profile } = useProfile();

  // console.log("Profile in Profile component:", profile);

  if (!profile) {
    return <div>로딩 중...</div>;
  }

  const postCount = profile.posts ? profile.posts.length : 0;
  const followerCount = profile.followers ? profile.followers.length : 0;
  const followingCount = profile.following ? profile.following.length : 0;

  return (
    <ProfileContainer>
      <Header />
      <NavigationAndPhotoContainer>
        <ProfilePhoto src={profile.photo || 'default_image_url'} />
        <Navigation postCount={postCount} followerCount={followerCount} followingCount={followingCount} />
      </NavigationAndPhotoContainer>
    </ProfileContainer>
  );
};

export default Profile;


// 스타일링된 컨테이너 생성
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavigationAndPhotoContainer = styled.div`
  display: flex; 
  align-items: center;
  justify-content: center;
  margin-right: 20%;
`;