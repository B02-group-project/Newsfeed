import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
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
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
