import { useState, useEffect, useRef } from 'react';
import {
    CommetItemWrapper,
    UserInfo,
    CommetDate,
    ToggleMenu,
    CommetContent,
    DropdownMenu,
} from './style/CommetItem.styled';
import UserProfile from '../commons/UserProfile';

const CommetItem = ({ commets, onDelete, userId }) => {
    const [showMenu, setShowMenu] = useState(false);

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



    const handleDelete = () => {
        onDelete(commets.id);
    };

    return (
        <CommetItemWrapper>
            <UserInfo>
                <UserProfile userId ={commets.user_id}
/>
                <CommetDate>{commets.created_at}</CommetDate>
                <ToggleMenu onClick={toggleMenu}>•••</ToggleMenu>
                {showMenu && (
                    <DropdownMenu ref={menuRef}>
                        {userId === commets.user_id && <li onClick={handleDelete}>삭제하기</li>}
                        <li>공유하기</li>
                    </DropdownMenu>
                )}
            </UserInfo>
            <CommetContent>{commets.content}</CommetContent>
        </CommetItemWrapper>
    );
};

export default CommetItem;
