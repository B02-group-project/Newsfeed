import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import supabase from "../../api/supabase.client";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      // 현재 로그인한 유저의 정보를 가져옵니다
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
        return;
      }

      // user의 id를 사용하여 userInfo 테이블에서 유저 정보를 가져옵니다
      const { data, error: fetchError } = await supabase
        .from("userInfo")
        .select("*")
        .eq("id", user.id); // 로그인한 유저의 id를 사용합니다

      if (fetchError) {
        console.error("Error fetching user profile:", fetchError);
        return;
      }

      setUserProfile(data[0]); // data는 배열이므로 첫 번째 요소를 설정합니다
    };

    fetchUserProfile(); //실행
  }, []);

  const handleClick = () => {
    if (userProfile) {
      navigate(`/mypage/${userProfile.id}`);
    }
  };

  return (
    <>
      {userProfile && (
        <UserProfileContainer onClick={handleClick}>
          <UserAvatar
            src={userProfile.avatar_url}
            alt={`${userProfile.nickname}'s avatar`}
          />
          <UserInfo>
            <UserNickname>@{userProfile.nickname}</UserNickname>
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
