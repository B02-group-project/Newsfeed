import styled from 'styled-components';

export const HeaderWrapper = styled.div`
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SideBarBtn = styled.div`
    position: relative;
    & > input {
        display: none;
    }

    & > label {
        margin-left: 10px;
        display: block;
        width: 30px;
        height: 20px;
        position: fixed;
        cursor: pointer;
    }

    & > label span {
        display: block;
        position: absolute;
        width: 100%;
        height: 3px;
        border-radius: 5px;
        background: #000;
        transition: all 0.35s;
    }

    & > label span:nth-child(1) {
        top: 0;
    }

    & > label span:nth-child(2) {
        top: 50%;
        transform: translateY(-50%);
    }

    & > label span:nth-child(3) {
        bottom: 0;
    }

    & > input:checked ~ label {
        z-index: 2;
        left: 300px;
        transition: all 0.35s;
    }

    & > input:checked ~ label span:nth-child(1) {
        top: 50%;
        transform: translateY(-50%) rotate(45deg);
    }

    & > input:checked ~ label span:nth-child(2) {
        opacity: 0;
    }

    & > input:checked ~ label span:nth-child(3) {
        bottom: 50%;
        transform: translateY(50%) rotate(-45deg);
    }

    & > input:checked ~ #sidebar {
        left: 0;
    }
`;
