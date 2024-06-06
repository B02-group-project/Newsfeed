import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types'; // PropTypes 임포트 추가
import { useProfile } from '../../contexts/ProfileContext';

const Navigation = ({ initialPostCount, initialFollowerCount, initialFollowingCount }) => {
  const { profile } = useProfile();
  const [postCount, setPostCount] = useState(initialPostCount || 0);
  const [followerCount, setFollowerCount] = useState(initialFollowerCount || 0);
  const [followingCount, setFollowingCount] = useState(initialFollowingCount || 0);

  useEffect(() => {
    if (profile) {
      setPostCount(profile.posts ? profile.posts.length : 0);
      setFollowerCount(profile.followers ? profile.followers.length : 0);
      setFollowingCount(profile.following ? profile.following.length : 0);
    }
  }, [profile]);

  if (!profile) {
    return <div>로딩 중...</div>;
  }

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
          <h2>{profile.nickname}</h2>
          <p>{profile.bio}</p>
        </StyledTextContainer>
      </CombinedComponent>
    </Container>
  );
}

Navigation.propTypes = {
  initialPostCount: PropTypes.number,
  initialFollowerCount: PropTypes.number,
  initialFollowingCount: PropTypes.number,
};

export default Navigation;


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

const StyledNavList = styled.ul`
  display: flex;
  justify-content: left;
  list-style: none;
`;

const StyledNavItem = styled.li`
  margin: 0 25px;
  font-weight: bold;
`;
