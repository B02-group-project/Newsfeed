import React, { useState, useEffect, useRef } from 'react';
import HeatIcon from '../../assets/Icons/heart_icon.png';
import likeIcon from '../../assets/Icons/like_icon.png';
import PostImage from './PostImage';
import supabase from '../../api/supabase.client';
import { useNavigate } from 'react-router-dom';
import {
    PostItemWrapper,
    UserInfo,
    PostDate,
    ToggleMenu,
    PostContent,
    LikeCheckbox,
    DropdownMenu,
    IconImg,
    Label,
} from './style/PostItem.styled';
import UserProfile from '../commons/UserProfile';

const PostItem = ({ post, likedPosts, onLikeChange, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [liked, setLiked] = useState(likedPosts.includes(post.user_id));
    const [userId, setUserId] = useState(null);
    const menuRef = useRef(null);
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
                    setUserId(userId);
                }
            }
        };

        fetchData();
    }, []);

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

    const handleEdit = () => {
        if (userId === post.user_id) {
            navigate(`/edit/${post.id}`);
        }
    };

    const handleDelete = () => {
        onDelete(post.id);
    };

    return (
        <PostItemWrapper>
            <UserInfo>
                <UserProfile userId={post.user_id}/>
                <PostDate>{post.created_at}</PostDate>
                <ToggleMenu onClick={toggleMenu}>•••</ToggleMenu>
                {showMenu && (
                    <DropdownMenu ref={menuRef}>
                        {userId === post.user_id && <li onClick={handleEdit}>수정하기</li>}
                        {userId === post.user_id && <li onClick={handleDelete}>삭제하기</li>}
                        <li>공유하기</li>
                    </DropdownMenu>
                )}
            </UserInfo>

            <PostImage />
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
