import React, { useState } from 'react';
import { HeaderWrapper, SideBarBtn } from './Header.styled';
import SideBar from '../Side/SideBar';
import Log from '../Log';
import Button from '../Button';

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleCloseSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <HeaderWrapper>
            <SideBarBtn>
                <input type="checkbox" id="menuicon" checked={isSidebarOpen} onChange={handleToggleSidebar} />
                <label htmlFor="menuicon">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <SideBar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
            </SideBarBtn>
            <Log width={'300px'} height={'80px'} left={'50%'} />
            <Button text={'게시하다'} width={'130px'} height={'40px'} fontSize={'20px'} />
        </HeaderWrapper>
    );

};

export default Header;
