import styled from 'styled-components';
import ProfilePhoto from './ProfilePhoto';
import Navigation from './Navigation';
import { useProfile } from '../../contexts/ProfileContext';

const Profile = ({ userId }) => {
    const { profile } = useProfile();

    if (!profile) {
        return <div>로딩 중...</div>;
    }

    const postCount = profile.posts ? profile.posts.length : 0;
    const followerCount = profile.followers ? profile.followers.length : 0;
    const followingCount = profile.following ? profile.following.length : 0;

    return (
        <ProfileContainer>
            <NavigationAndPhotoContainer>
                <ProfilePhoto src={profile.photo || 'default_image_url'} />
                <Navigation
                    userInfo={userId}
                    initialPostCount={postCount}
                    initialFollowerCount={followerCount}
                    initialFollowingCount={followingCount}
                />
            </NavigationAndPhotoContainer>
        </ProfileContainer>
    );
};

export default Profile;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const NavigationAndPhotoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20%;
`;
