import React from 'react';
import styled from 'styled-components';

// 헤더 스타일
const HeaderContainer = styled.header`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center; /* 세로 중앙 정렬 */
  padding: 20px;
`;

const Title = styled.h1`
  margin-right: 15px; /* 제목과 버튼 사이 간격 */
  font-size: 30px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Title>UserAccount</Title>
      <button>프로필 편집</button>
    </HeaderContainer>
  );
}

export default Header;
