import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../api/supabase.client';
import HeatIcon from '../../assets/Icons/heart_icon.png';
import likeIcon from '../../assets/Icons/like_icon.png';
import {
    CommetItemWrapper,
    UserInfo,
    CommetDate,
    ToggleMenu,
    CommetContent,
    LikeCheckbox,
    DropdownMenu,
    IconImg,
    Label,
} from './style/CommetItem.styled';

const CommetItem = ({ commets, likedcommets, onLikeChange, onDelete }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [liked, setLiked] = useState(likedcommets.includes(commets.user_id));
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
        onLikeChange(commets.id, newLiked);
    };

    const handleEdit = () => {
        if (userId === commets.user_id) {
            navigate(`/edit/${commets.id}`);
        }
    };

    const handleDelete = () => {
        onDelete(commets.id);
    };

    return (
        <CommetItemWrapper>
            <UserInfo>
                <div>유저 정보 id</div>
                <CommetDate>{commets.created_at}</CommetDate>
                <ToggleMenu onClick={toggleMenu}>•••</ToggleMenu>
                {showMenu && (
                    <DropdownMenu ref={menuRef}>
                        {userId === commets.user_id && <li onClick={handleEdit}>수정하기</li>}
                        {userId === commets.user_id && <li onClick={handleDelete}>삭제하기</li>}
                        <li>공유하기</li>
                    </DropdownMenu>
                )}
            </UserInfo>
            <CommetContent>{commets.content}</CommetContent>
            <LikeCheckbox
                type="checkbox"
                id={`likeCheckbox-${commets.id}`}
                checked={liked}
                onChange={handleLikeChange}
            />
            <Label htmlFor={`likeCheckbox-${commets.id}`}>
                <IconImg src={liked ? likeIcon : HeatIcon} alt="Like Icon" />
                좋아요
            </Label>
        </CommetItemWrapper>
    );
};

export default CommetItem;
