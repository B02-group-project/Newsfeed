import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import supabase from "../../api/supabase.client";

const UserProfile = ({ userId }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    // Supabase에서 유저 정보 가져오기
    const fetchUserInfo = async () => {
      const { data: userInfoData, error } = await supabase
        .from("userInfo")
        .select("*")
        .eq("id", userId)
        .single(); // 단일 유저 정보만 필요!!!
      if (error) {
        console.error("Error fetching user info:", error.message);
      } else {
        setUserInfo(userInfoData);
      }
    };
    fetchUserInfo();
  }, [userId]);

  // console.log("유저프로필", userId);
  const handleClick = () => {
    if (userInfo) {
      navigate(`/mypage/${userInfo.id}`);
    }
  };

  return (
    <>
      {userInfo && (
        <UserProfileContainer onClick={handleClick}>
          <UserAvatar
            src={userInfo.avatar_url}
            alt={`${userInfo.nickname}'s avatar`}
          />
          <UserInfo>
            <UserNickname>@{userInfo.nickname}</UserNickname>
          </UserInfo>
        </UserProfileContainer>
      )}
    </>
  );
};

const UserProfileContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserNickname = styled.div`
  font-size: 14px;
  color: #6c757d;
`;

export default UserProfile;
