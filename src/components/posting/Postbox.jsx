import React from 'react';
import PostItem from './PostItem';
import CommetComp from './CommetComp';
import { PostboxWrapper } from './style/Postbox.styled';
const Postbox = () => {
    return (
        <PostboxWrapper>
            <PostItem />
            <CommetComp />
        </PostboxWrapper>
    );
};

export default Postbox;
