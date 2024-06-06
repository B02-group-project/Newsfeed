import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useProfile } from "../../contexts/ProfileContext";

const ProfileEdit = () => {
  const { profile, updateProfile } = useProfile();
  const [newProfile, setNewProfile] = useState({ nickname: '', bio: '', photo: '' });
  const [newPhoto, setNewPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile) {
      setNewProfile({
        nickname: profile.nickname || '',
        bio: profile.bio || '',
        photo: profile.photo || ''
      });
    }
  }, [profile]);

  useEffect(() => {
    return () => {
      if (newPhoto) {
        URL.revokeObjectURL(newPhoto);
      }
    };
  }, [newPhoto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newPhotoURL = URL.createObjectURL(file);
      setNewPhoto(file);
      setNewProfile((prevProfile) => ({
        ...prevProfile,
        photo: newPhotoURL,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting new profile:", newProfile);
    if (newPhoto) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        updateProfile({ ...newProfile, photo: base64data });
        alert('Profile updated!');
        navigate('/mypage');
      };
      reader.readAsDataURL(newPhoto);
    } else {
      updateProfile(newProfile);
      alert('Profile updated!');
      navigate('/mypage');
    }
  };

  return (
    <Container>
      <h1>Edit Profile</h1>
       <ProfileImage src={newProfile.photo || profile.photo} alt="Profile" />
      <Form onSubmit={handleSubmit}>
        <input type="file" onChange={handlePhotoChange} accept="image/*" />
        <Input
          type="text"
          name="nickname"
          value={newProfile.nickname}
          onChange={handleChange}
          placeholder="닉네임"
        />
        <TextArea
          name="bio"
          value={newProfile.bio}
          onChange={handleChange}
          placeholder="자기소개를 작성해주세요"
          rows="4"
        />
        <button type="submit">저장</button>
      </Form>
    </Container>
  );
};

export default ProfileEdit;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  resize: none;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;
