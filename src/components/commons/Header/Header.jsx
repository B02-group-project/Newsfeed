import React from 'react';
import { HeaderWrapper, SideBarBtn } from './Header.styled';
import SideBar from '../Side/SideBar';
import Log from '../Log';
import Button from '../Button';

const Header = () => {
    return (
        <HeaderWrapper>
            <SideBarBtn>
                <input type="checkbox" id="menuicon" />
                <label for="menuicon">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <SideBar />
            </SideBarBtn>
            <Log width={'300px'} height={'80px'} />
            <Button text={'게시하다'} width={'130px'} height={'40px'} fontsize={'20px'} />
        </HeaderWrapper>
    );
};

export default Header;
