import styled from 'styled-components';

export const PostItemWrapper = styled.div`
    width: 350px;
    margin: 20px auto;
    border-radius: 3px;
    background-color: #ffffff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

export const UserInfo = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #e6e6e6;
`;

export const PostDate = styled.div`
    font-size: 0.875em;
    color: #999;
`;

export const ToggleMenu = styled.div`
    cursor: pointer;
    padding: 5px;
    font-size: 1.5em;
`;

export const DropdownMenu = styled.ul`
    position: absolute;
    background: white;
    border: 1px solid #e6e6e6;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    right: 10px;
    top: 0px;
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100px;
    border-radius: 3px;
    z-index: 1000;

    li {
        padding: 10px;
        cursor: pointer;

        &:hover {
            background-color: #f2f2f2;
        }
    }
`;

export const PostImage = styled.div`
    width: 100%;
    height: 200px;
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 1.2em;
`;

export const PostContent = styled.div`
    padding: 10px;
    font-size: 1em;
    color: #333;
`;

export const LikeCheckbox = styled.input`
    display: none;
`;

export const Label = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const IconImg = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 20px;
`;
