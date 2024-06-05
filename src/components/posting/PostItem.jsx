import React, { useState, useEffect, useRef } from 'react';
import HeatIcon from '../../assets/Icons/heart_icon.png';
import likeIcon from '../../assets/Icons/like_icon.png';
import {
    PostItemWrapper,
    UserInfo,
    PostDate,
    ToggleMenu,
    PostImage,
    PostContent,
    LikeCheckbox,
    DropdownMenu,
    IconImg,
    Label,
} from './style/PostItem.styled';

const PostItem = ({ post, likedPosts, onLikeChange }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [liked, setLiked] = useState(likedPosts.includes(post.id));
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLikeChange = () => {
        const newLiked = !liked;
        setLiked(newLiked);
        onLikeChange(post.id, newLiked);
    };

    return (
        <PostItemWrapper>
            <UserInfo>
                <div>
                    <div>유저 정보 id</div>
                    <ToggleMenu onClick={toggleMenu}>•••</ToggleMenu>
                </div>
                <div>
                    {post.updated_at}
                    <PostDate>{post.created_at}</PostDate>
                </div>
                {showMenu && (
                    <DropdownMenu ref={menuRef}>
                        <li>수정하기</li>
                        <li>삭제하기</li>
                        <li>공유하기</li>
                    </DropdownMenu>
                )}
            </UserInfo>
            <PostImage>게시글 사진</PostImage>
            <PostContent>{post.content}</PostContent>
            <LikeCheckbox type="checkbox" id={`likeCheckbox-${post.id}`} checked={liked} onChange={handleLikeChange} />
            <Label htmlFor={`likeCheckbox-${post.id}`}>
                <IconImg src={liked ? likeIcon : HeatIcon} alt="Like Icon" />
                좋아요
            </Label>
        </PostItemWrapper>
    );
};

export default PostItem;
