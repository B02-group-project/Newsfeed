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

const PostItem = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [liked, setLiked] = useState(false);
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

    const handleLickChange = () => {
        setLiked(!liked);
    };

    return (
        <PostItemWrapper>
            <UserInfo>
                <div>유저 정보 . ID .</div>
                <PostDate>게시일</PostDate>
                <ToggleMenu onClick={toggleMenu}>•••</ToggleMenu>
                {showMenu && (
                    <DropdownMenu ref={menuRef}>
                        <li>수정하기</li>
                        <li>삭제하기</li>
                        <li>공유하기</li>
                    </DropdownMenu>
                )}
            </UserInfo>
            <PostImage>게시글 사진</PostImage>
            <PostContent>게시글 내용</PostContent>
            <LikeCheckbox type="checkbox" id="likeCheckbox" checked={liked} onChange={handleLickChange} />
            <Label htmlFor="likeCheckbox">
                <IconImg src={liked ? likeIcon : HeatIcon} alt="Like Icon" />
                좋아요
            </Label>
        </PostItemWrapper>
    );
};

export default PostItem;
