import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
  const [userId, setUserId] = useState("5aff69c0-4c07-4c78-a4ea-0493c362c9eb");
  const [profile, setProfile] = useState({
    nickname: "기본 닉네임",
    bio: "기본 자기소개",
    photo: "기본 프로필 이미지 URL",
  });

  const updateProfile = (newProfile) => {
    console.log("Updating profile:", newProfile); 
    setProfile(newProfile);
  };

  return (
    <ProfileContext.Provider value={{ userId, setUserId, profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
