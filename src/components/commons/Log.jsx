import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/Log/Blackberry_Log.png';

export const BerryImg = styled.img`
    width: 300px;
    height: 80px;
`;
const Log = () => {
    return <BerryImg src={logo} ait="Logo" />;
};

export default Log;
