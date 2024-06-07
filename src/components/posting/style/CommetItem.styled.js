import styled from 'styled-components';

export const CommetItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    padding: 0 10px;
    margin: 5px 0;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`;

export const CommetDate = styled.div`
    font-size: 12px;
    color: #777;
`;

export const ToggleMenu = styled.div`
    cursor: pointer;
    font-size: 20px;
    color: #333;
`;

export const DropdownMenu = styled.ul`
    position: absolute;
    top: 10px;
    right: 0;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    list-style: none;
    padding: 5px;
    z-index: 10;

    li {
        padding: 4px 8px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
            background-color: #f2f2f2;
        }
    }
`;

export const CommetContent = styled.div`
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
`;

export const LikeCheckbox = styled.input`
    display: none;

    &:checked + label > img {
        filter: grayscale(0);
    }

    &:not(:checked) + label > img {
        filter: grayscale(100%);
    }
`;

export const IconImg = styled.img`
    width: 24px;
    height: 24px;
    margin-right: 5px;
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #333;
    font-size: 14px;
    user-select: none;

    img {
        width: 24px;
        height: 24px;
        margin-right: 5px;
    }
`;
