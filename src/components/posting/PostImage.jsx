import React, { useState } from 'react';
// import React from 'react';
import styled from 'styled-components';
import LeftArrowIcon from '../../assets/Icons/left_arrow_icon.png';
import RightArrowIcon from '../../assets/Icons/right_arrow_icon.png';

const Carousel = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!images || images.length === 0) {
        return <div></div>;
    }

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <Container>
            <ButtonLeft onClick={handlePrevClick}>
                <ArrowImage src={LeftArrowIcon} alt="Previous" />
            </ButtonLeft>
            <PostImage imageUrl={images} />
            <ButtonRight onClick={handleNextClick}>
                <ArrowImage src={RightArrowIcon} alt="Next" />
            </ButtonRight>
        </Container>
    );
};

export default Carousel;

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const PostImage = ({ imageUrl }) => (
    <Postimage>
        <img src={imageUrl} alt="Post" />
    </Postimage>
);
const Postimage = styled.div`
    position: relative;
    width: 200px;
    height: 200px;
    border-radius: 15.8156px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 1.2em;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 50%;
    background-color: rgba(51, 51, 51, 0.082);
    padding: 5px;
    transition: background-color 0.3s ease;
    &:hover {
        background-color: rgba(255, 255, 255, 0.411);
    }
`;

const ButtonLeft = styled(Button)`
    left: 10px;
`;

const ButtonRight = styled(Button)`
    right: 10px;
`;

const ArrowImage = styled.img`
    width: 30px;
    height: 30px;
`;
