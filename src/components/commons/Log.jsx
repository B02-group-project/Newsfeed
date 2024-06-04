import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/Log/Blackberry_Log.png';

export const BerryImg = styled.img`
    width: ${(pros) => pros.width || '300px'};
    height: ${(pros) => pros.height || '80px'};
`;
const Log = ({ width, height, logClick }) => {
    return <BerryImg src={logo} ait="Logo" width={width} height={height} onClick={logClick} />;
};

export default Log;
