import React from 'react';
import styled from 'styled-components';

const ProfilePhoto = ({ src }) => {
  return (
    <ProfilePhotoContainer>
      <ProfileImage src={src} alt="Profile" />
    </ProfilePhotoContainer>
  );
};

export default ProfilePhoto;

const ProfilePhotoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 20px 0; 
  padding-left: 13%; 
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  border: 2px solid #ddd; 
`;
