import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  margin: 0 100px;
`;

const CombinedComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 20px;
  margin-left: 5px;
`;

const StyledTextContainer = styled.div`
  text-align: left;
  font-weight: bold;
  font-size: 15px;
  width: 100%;
`;

// StyledNavList 컴포넌트 정의
const StyledNavList = styled.ul`
  display: flex;
  justify-content: left;
  list-style: none;
`;

// StyledNavItem 컴포넌트 정의
const StyledNavItem = styled.li`
  margin: 0 25px;
  font-weight: bold; // 폰트 굵기 조정
  // 추가적인 스타일링은 여기에 작성할 수 있습니다.
`;

const Navigation = ({ postCount, followerCount, followingCount }) => {
  return (
    <Container>
      <CombinedComponent>
        <nav>
          <StyledNavList>
            <StyledNavItem>게시물 {postCount}</StyledNavItem>
            <StyledNavItem>팔로워 {followerCount}</StyledNavItem>
            <StyledNavItem>팔로우 {followingCount}</StyledNavItem>
          </StyledNavList>
        </nav>
        <StyledTextContainer>
          <h2>Nickname</h2>
          <p>Self-introduction</p>
        </StyledTextContainer>
      </CombinedComponent>
    </Container>
  );
}

export default Navigation;
