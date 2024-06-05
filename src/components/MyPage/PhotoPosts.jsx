import React from 'react'
import styled from 'styled-components';

// 전체 포스트를 포함하는 컨테이너 스타일
const PostsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3칸으로 나누기 */
  gap: 10px; /* 각 포스트 사이의 간격 */
  padding: 50px; /* 전체 컨테이너의 패딩 */
`;

// 개별 포스트 컨테이너 스타일
const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// 이미지 스타일
const Image = styled.img`
  max-width: 100%; /* 이미지가 컨테이너 너비를 넘지 않도록 */
  height: auto; /* 이미지 비율 유지 */
  margin-bottom: 10px; /* 이미지와 설명 사이의 간격 */
`;

// 설명(Description) 스타일
const Description = styled.p`
  color: #333; /* 색상 */
`;


const PhotoPosts = ({ posts }) => {
  return (
    <PostsGrid>
      {posts.map((post, index) => (
        <PostContainer key={index}>
          <Image src={post.imageUrl} />
          <Description>{post.description}</Description>
        </PostContainer>
      ))}
    </PostsGrid>
  );
};



export default PhotoPosts
