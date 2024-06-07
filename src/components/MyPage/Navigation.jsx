import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../contexts/ProfileContext';
import supabase from '../../api/supabase.client';

// HeaderContainer는 Navigation 안에 있지만 Header를 따로 빼내었습니다.
const HeaderContainer = styled.header`
    display: flex;
    justify-content: center; /* 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    padding: 20px;
`;

// Navigation 컴포넌트
const Navigation = ({ initialPostCount, initialFollowerCount, initialFollowingCount, userInfo }) => {
    const { profile } = useProfile();
    const [postCount, setPostCount] = useState(initialPostCount || 0);
    const [followerCount, setFollowerCount] = useState(initialFollowerCount || 0);
    const [followingCount, setFollowingCount] = useState(initialFollowingCount || 0);
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();
            if (error) {
                console.log('error => ', error);
            } else {
                const userId = user?.id;
                if (userId) {
                    setLoggedInUserId(userId);
                }
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (profile) {
            setPostCount(profile.posts ? profile.posts.length : 0);
            setFollowerCount(profile.followers ? profile.followers.length : 0);
            setFollowingCount(profile.following ? profile.following.length : 0);
        }
    }, [profile]);

    // Header 컴포넌트 내부에서 사용할 handleEditProfile 함수
    const handleEditProfile = () => {
        navigate('/mypage/edit');
    };
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
                {loggedInUserId === userInfo && (
                    <HeaderContainer>
                        <button onClick={handleEditProfile}>프로필 편집</button>
                    </HeaderContainer>
                )}
                <StyledTextContainer>
                    <h2>{profile.nickname}</h2>
                    <p>{profile.bio}</p>
                </StyledTextContainer>
            </CombinedComponent>
        </Container>
    );
};

Navigation.propTypes = {
    initialPostCount: PropTypes.number,
    initialFollowerCount: PropTypes.number,
    initialFollowingCount: PropTypes.number,
};

export default Navigation;

// 스타일 컴포넌트들
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
    text-align: center;
    font-weight: bold;
    font-size: 18px;
`;

const StyledNavList = styled.ul`
    display: flex;
    justify-content: center;
    list-style: none;
`;

const StyledNavItem = styled.li`
    margin: 0 25px;
    font-weight: bold;
    min-width: 120px; /* 각 항목의 최소 너비 설정 */
`;
