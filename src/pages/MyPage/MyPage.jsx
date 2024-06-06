import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Profile from "../../components/MyPage/Profile";
import PhotoPosts from "../../components/MyPage/PhotoPosts";
import TextPosts from "../../components/MyPage/TextPosts";
import { useProfile } from "../../contexts/ProfileContext";
import supabase from '../../api/supabase.client';
import { useParams } from "react-router-dom";

const MyPage = () => {
  const { userId } = useParams();
  const { profile, updateProfile } = useProfile();
  const [activeTab, setActiveTab] = useState("photo");
  const [userData, setUserData] = useState(null);
  const [postsData, setPostsDat] = useState([]);
  

  useEffect(() => {

    const fetchPostData = async () => {
      try {
        const { data, error } = await supabase
         .from('posts')
         .select("*")
         .eq('user_id', userId);
        if (error) {
          console.log('Error fetching post data:', error.message);
        } else {
          setPostsDat(data);
        }
      } catch (e) {
        console.log('Error fetching post data:', e.message);
      } finally {
        console.log('Finished fetching post data');
      }
    }

    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('userInfo')
          .select("*")
          .eq('id', userId);
        if (error) {
          console.log('Error fetching user data:', error.message);
        } else {
          setUserData(data[0]);

        }
      } catch (e) {
        console.log('Error fetching user data:', e.message);
      } finally {
        console.log('Finished fetching user data');
      }
    };

    
    fetchData();
    fetchPostData();
  }, [userId]); // Add userId as a dependency to re-fetch data when it changes
  console.log("User data:", userData );
  

  // userData가 변경될 때마다 프로필 업데이트
  useEffect(() => {
    if (userData && (profile.nickname !== userData.nickname || profile.bio !== userData.desc || profile.photo !== userData.avatar_url)) {
      // userData가 존재하고, 프로필이 변경된 경우에만 updateProfile 함수를 호출하여 프로필을 업데이트
      updateProfile({
        nickname: userData.nickname,
        bio: userData.desc,
        photo: userData.avatar_url
      });
    }
  }, [userData, profile, updateProfile]); // userData와 profile, updateProfile을 의존성 배열에 추가하여 변경될 때마다 실행


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  

  const textPosts = [
    { title: '글 제목 1', excerpt: '글 요약 1' },
    { title: '글 제목 2', excerpt: '글 요약 2' },
    { title: '글 제목 3', excerpt: '글 요약 3' },
  ];


  return (
    <div>
      <Profile />
      <TabButtons>
        <TabButton onClick={() => handleTabClick('photo')} $active={activeTab === 'photo'}>
          Photo
        </TabButton>
        <TabButton onClick={() => handleTabClick('text')} $active={activeTab === 'text'}>
          Text
        </TabButton>
      </TabButtons>
      <TabContent>
        {activeTab === 'photo' && <PhotoPosts posts={postsData} />}
        {activeTab === 'text' && <TextPosts posts={textPosts} />}
      </TabContent>
    </div>
  );
};

export default MyPage;

const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 50px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 70%;
    border-top: 1px solid black;
  }
`;

const TabButton = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  margin-top: 2%;
  cursor: pointer;
  border: none;
  background-color: ${props => props.$active ? '#555' : '#f0f0f0'};
  color: ${props => props.$active ? 'white' : 'black'};
`;

const TabContent = styled.div`
  margin-top: 20px;
`;
