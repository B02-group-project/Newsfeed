import styled from 'styled-components';

export const SideBarWrapper = styled.div`
    width: 300px;
    height: 100%;
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: -300px;
    z-index: 1;
    transition: all 0.35s;
    display: flex;
    flex-direction: column;
`;

export const Line = styled.p`
    position: absolute;
    width: 2px;
    height: 100%;
    top: 0;
    right: 20px;
    background-color: #372e6d;
`;

export const List = styled.div`
    flex: 1;
    margin: 80px 20px;
    display: flex;
    flex-direction: column;
`;

export const TextList = styled.div`
    margin-top: 50px;
`;

export const TextItem = styled.button`
    display: flex;
    width: 90%;
    font-size: 20px;
    margin: 20px 10px;
    background-color: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    outline: none;
`;

export const TextPlus = styled.button`
    display: flex;
    width: 90%;
    font-size: 25px;
    margin-top: 50px;
    background-color: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    outline: none;
`;

export const IconImg = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 20px;
`;

export const PlusImg = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 10px;
`;

export const UserDate = styled.div`
    margin-top: auto;
`;

export const LogOut = styled.label``;
