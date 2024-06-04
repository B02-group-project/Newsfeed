import React from 'react';
import { CommetCompWrapper } from './style/CommetComp.styled';

const CommetComp = () => {
    return (
        <CommetCompWrapper>
            <div>
                <div>유저. 정보. ID. 게시일</div>
                <div>댓글내용</div>
            </div>
            <div>
                <input type="text" placeholder="댓글을 작성해주세요" />
                <button>댓글달기</button>
            </div>
        </CommetCompWrapper>
    );
};

export default CommetComp;
