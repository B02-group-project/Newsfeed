import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useProfile } from "../../contexts/ProfileContext";

const ProfileEdit = () => {
  const { profile, updateProfile } = useProfile();
  const [newProfile, setNewProfile] = useState({ nickname: '', bio: '', photo: '' });
  const [newPhoto, setNewPhoto] = useState(null);
  const { userId } = useParams(); // useParams를 통해 userId를 가져옴
  const navigate = useNavigate();

  useEffect(() => {
    console.log("userId from useParams:", userId); // userId를 로그로 출력
    if (profile) {
      setNewProfile({
        nickname: profile.nickname || '',
        bio: profile.bio || '',
        photo: profile.photo || ''
      });
    }
  }, [profile, userId]); // userId를 의존성 배열에 추가

  useEffect(() => {
    return () => {
      if (newPhoto) {
        URL.revokeObjectURL(newPhoto);
      }
    };
  }, [newPhoto]);

  // URL 변경 감지하여 해당 유저의 프로필 데이터를 가져와 화면 업데이트
  useEffect(() => {
    // 해당 userId에 맞는 프로필 데이터를 가져오는 로직 작성
    // 예: fetchProfile(userId).then((data) => setNewProfile(data));
  }, [userId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting new profile:", newProfile);
    if (newPhoto) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result;
        await updateProfile({ ...newProfile, photo: base64data });
        alert('Profile updated!');
        console.log("Navigating to /mypage/" + userId);
        navigate(`/MyPage/${userId}`); // 템플릿 문자열 사용하여 userId 삽입
      };
      reader.readAsDataURL(newPhoto);
    } else {
      await updateProfile(newProfile);
      alert('Profile updated!');
      console.log("Navigating to /mypage/" + userId);
      navigate(`/MyPage/${userId}`); // 템플릿 문자열 사용하여 userId 삽입
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
