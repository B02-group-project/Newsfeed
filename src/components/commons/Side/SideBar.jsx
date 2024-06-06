import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Log from '../Log';
import HomeIcon from '../../../assets/Icons/home_icon.png';
import SearchIcon from '../../../assets/Icons/search_icon.png';
import BellIcon from '../../../assets/Icons/bell_icon.png';
import PlusIcon from '../../../assets/Icons/plus_icon.png';
import PeopleIcon from '../../../assets/Icons/people_icon.png';
import supabase from '../../../api/supabase.client';
import { useModal } from '../../../contexts/modal.context';
import Modal from '../Modal/Modal';
import UserProfile from '../UserProfile';
import BellFrame from './BellFrame';
import SearchFrame from './SearchFrame';

import {
    IconImg,
    Line,
    List,
    LogOut,
    PlusImg,
    SideBarWrapper,
    TextItem,
    TextList,
    TextPlus,
    UserDate,
} from './SideBar.styled';

const SideBar = ({ isOpen, onClose }) => {
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();
    const searchModal = useModal();
    const bellModal = useModal();
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

    const handlesearchButton = () => {
        searchModal.open({
            title: '검색',
            content: <SearchFrame />,
        });
        onClose();
    };

    const handleCreatePostPage = () => {
        navigate('/create');
    };
    const handleBellButton = () => {
        bellModal.open({
            title: '알람',
            content: <BellFrame />,
        });
        onClose();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return (
        <>
            <SideBarWrapper id="sidebar" className={isOpen ? 'open' : 'closed'}>
                <Line />
                <List>
                    <Log width={'200px'} height={'50px'} left={'45%'} />
                    <TextList>
                        <TextItem>
                            <IconImg src={HomeIcon} />
                            main
                        </TextItem>
                        {searchModal.isOpen && <Modal title={searchModal.title} content={searchModal.content} />}
                        <TextItem onClick={handlesearchButton}>
                            <IconImg src={SearchIcon} />
                            search
                        </TextItem>
                        {bellModal.isOpen && <Modal title={bellModal.title} content={bellModal.content} />}
                        <TextItem onClick={handleBellButton}>
                            <IconImg src={BellIcon} />
                            알람
                        </TextItem>
                        <TextItem>
                            <IconImg src={PeopleIcon} />내 프로필
                        </TextItem>
                        <TextPlus>
                            <PlusImg src={PlusIcon} />
                            <div onClick={handleCreatePostPage}>게시하기</div>
                        </TextPlus>
                    </TextList>
                    <UserDate>
                        <UserProfile userId={userId} />
                        <LogOut onClick={handleLogout}>로그아웃</LogOut>
                    </UserDate>
                </List>
            </SideBarWrapper>
        </>
    );
};

export default SideBar;
