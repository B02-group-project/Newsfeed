import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Log from '../Log';
import HomeIcon from '../../../assets/Icons/home_icon.png';
import SearchIcon from '../../../assets/Icons/search_icon.png';
import BellIcon from '../../../assets/Icons/bell_icon.png';
import PlusIcon from '../../../assets/Icons/plus_icon.png';
import PeopleIcon from '../../../assets/Icons/people_icon.png';
import supabase from '../../../api/supabase.client';
import {
    SideBarWrapper,
    Line,
    List,
    IconImg,
    PlusImg,
    TextList,
    TextItem,
    TextPlus,
    UserDate,
    LogOut,
} from './SideBar.styled';

const SideBar = () => {
    const [userId, setUserId] = useState(null);
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

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    return (
        <SideBarWrapper id="sidebar">
            <Line />
            <List>
                <Log width={'200px'} height={'50px'} left={'45%'} />
                <TextList>
                    <TextItem>
                        <IconImg src={HomeIcon} />
                        main
                    </TextItem>
                    <TextItem>
                        <IconImg src={SearchIcon} />
                        search
                    </TextItem>
                    <TextItem>
                        <IconImg src={BellIcon} />
                        알람
                    </TextItem>
                    <TextItem>
                        <IconImg src={PeopleIcon} />내 프로필
                    </TextItem>
                    <TextPlus>
                        <PlusImg src={PlusIcon} />
                        게시하기
                    </TextPlus>
                </TextList>
                <UserDate>
                    <div>{userId}</div>
                    <LogOut onClick={handleLogout}>로그아웃</LogOut>
                </UserDate>
            </List>
        </SideBarWrapper>
    );
};

export default SideBar;
