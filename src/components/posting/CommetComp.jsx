import React from 'react';

import { CommetCompWrapper } from './style/CommetComp.styled';
import CommetItem from './CommetItem';

const CommetComp = () => {
    return (
        <CommetCompWrapper>
            <div>
                <CommetItem />
            </div>
            <div>
                <input type="text" placeholder="댓글을 작성해주세요" />
                <button>댓글달기</button>
            </div>
        </CommetCompWrapper>
    );
};

export default CommetComp;
