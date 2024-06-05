import Profile from "../../components/MyPage/Profile";
import PhotoPosts from "../../components/MyPage/PhotoPosts";
import TextPosts from "../../components/MyPage/TextPosts";
import { useState } from "react";
import styled from "styled-components";

const TabButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 30%; // 버튼 사이의 간격
  margin: 50px; // 내용과의 간격
  position: relative; // 가상 요소의 기준점 설정

  &::before {
    content: ''; // 가상 요소는 내용이 있어야 생성됨
    position: absolute;
    left: 50%; // 중앙 정렬
    top: 0; // 상단에 위치
    transform: translateX(-50%); // 정확한 중앙
    width: 70%; // border-top의 좌우 길이 조절
    border-top: 1px solid black; // 상단 테두리 스타일
  }
`;
const TabButton = styled.button`
  padding: 10px 20px;
  margin: 0 5px;
  margin-top: 2%;
  cursor: pointer;
  border: none;
  background-color: ${props => props.active ? '#555' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : 'black'};
`;

const TabContent = styled.div`
  margin-top: 20px;
`;

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("photo");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const photoPosts = [
    { imageUrl: "path_to_image1", description: "description1" },
    { imageUrl: "path_to_image2", description: "description2" },
    { imageUrl: "path_to_image3", description: "description3" },
  ];
  const textPosts = [
    { title: '글 제목 1', excerpt: '글 요약 1' },
    { title: '글 제목 2', excerpt: '글 요약 2' },
    { title: '글 제목 3', excerpt: '글 요약 3' },
  ];

  return (
    <div>
    <Profile />
    <TabButtons>
      <TabButton onClick={() => handleTabClick('photo')} active={activeTab === 'photo'}>
        Photo
      </TabButton>
      <TabButton onClick={() => handleTabClick('text')} active={activeTab === 'text'}>
        Text
      </TabButton>
    </TabButtons>
    <TabContent>
      {activeTab === 'photo' && <PhotoPosts posts={photoPosts} />}
      {activeTab === 'text' && <TextPosts posts={textPosts} />}
    </TabContent>
  </div>
  );
};

export default MyPage;
