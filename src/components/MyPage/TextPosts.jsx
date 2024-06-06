import React from 'react';
import styled from 'styled-components';

const TextPostList = styled.ul`
text-align: center;
justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TextPostItem = styled.li`
  border-bottom: 1px solid #ddd;
  padding: 20px;
  &:last-child {
    border-bottom: none;
  }
`;

const PostTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
`;

const PostExcerpt = styled.p`
  margin: 10px 0 0;
  color: #666;
`;

const TextPosts = ({ posts }) => {
  return (
    <TextPostList>
      {posts.map((post, index) => (
        <TextPostItem key={index}>
          <PostTitle>{post.title}</PostTitle>
          <PostExcerpt>{post.excerpt}</PostExcerpt>
        </TextPostItem>
      ))}
    </TextPostList>
  );
};

export default TextPosts;
