import React from 'react'
import styled from 'styled-components';

const PhotoPosts = ({ posts }) => {
  console.log(posts);
  return (
    <PostsGrid>
      {posts.map((post, index) => (
        <PostContainer key={index}>
          <Image src={post.image_url} />
          <Description>{post.content}</Description>
        </PostContainer>
      ))}
    </PostsGrid>
  );
};

export default PhotoPosts


// 전체 포스트를 포함하는 컨테이너 스타일
const PostsGrid = styled.div`
 display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 20px; /* 사진 간격을 조정 */
  padding: 0 20%; /* 좌우 패딩 추가 */
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
  max-width: 70%;
  height: auto;
  margin-bottom: 10px;
`;

// 설명(Description) 스타일
const Description = styled.p`
  color: #333;
`;