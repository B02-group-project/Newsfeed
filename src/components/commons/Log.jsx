import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Log/Blackberry_Log.png';

const Log = ({ width, height, left }) => {
    const navigate = useNavigate();

    const logClick = () => {
        navigate('/');
        console.log('실행함');
    };
    return <BerryImg src={logo} ait="Logo" width={width} height={height} left={left} onClick={logClick} />;
};

export default Log;

export const BerryImg = styled.img`
    width: ${(pros) => pros.width || '300px'};
    height: ${(pros) => pros.height || '80px'};
    position: absolute;
    left: ${(pros) => pros.left || '50%'};
    transform: translateX(-50%);
`;
