import React from 'react';
import { PostItemWrapper } from './style/PostItem.styled';

const PostItem = () => {
    return (
        <PostItemWrapper>
            <div>유저 정보 . ID . 게시일(시각)</div>
            <div>게시글 사진</div>
            <div>게시글 내용</div>
            <div>좋아요</div>
        </PostItemWrapper>
    );
};

export default PostItem;
