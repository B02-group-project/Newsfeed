import React from 'react';
import { HeaderWrapper, SideBarBtn, Botton } from './Header.styled';
import SideBar from '../Side/SideBar';
import Log from '../Log';

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
            <Log />
            <Botton>게시하기</Botton>
        </HeaderWrapper>
    );
};

export default Header;
