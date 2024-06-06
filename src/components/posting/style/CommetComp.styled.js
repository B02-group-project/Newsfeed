import styled from 'styled-components';

export const CommetCompWrapper = styled.div`
    width: 430px;
    max-height: 400px;
    margin: 20px auto;
    background-color: #ffffff;
    position: relative;
    padding-bottom: 20px;
`;

export const Commetlist = styled.div`
    padding: 10px;
    max-height: 300px;
    overflow-y: auto;
`;

export const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    width: 100%;
    background-color: white;
`;

export const CommentInput = styled.input`
    position: absolute; /* 변경 */
    bottom: 10px; /* 변경 */
    left: 20px; /* 변경 */
    flex: 1;
    padding: 8px;
    width: 300px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
`;

export const SubmitButton = styled.button`
    position: absolute; /* 변경 */
    bottom: 10px; /* 변경 */
    left: 350px;
    padding: 8px 15px;
    background-color: #136dc1;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    outline: none;
    margin-left: 10px;

    &:hover {
        background-color: white;
        color: #136dc1;
        border: solid 1px #989898;
    }
`;
