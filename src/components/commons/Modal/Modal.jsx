import styled from 'styled-components';
import { useModal } from '../../../contexts/modal.context';
import BackDrop from './BackDrop';
import x from '../../../assets/Icons/x_icon.png';

function Modal({ title, content }) {
    const modal = useModal();
    return (
        <BackDrop>
            <ModalStyled className="modal">
                <ModelHeader>
                    <ModalClose onClick={() => modal.close()}>
                        <CloseImg src={x} />
                    </ModalClose>
                    <h1>{title}</h1>
                </ModelHeader>
                <ContentWrapper>{content}</ContentWrapper>
            </ModalStyled>
        </BackDrop>
    );
}

export default Modal;

const ModalStyled = styled.article`
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    max-width: 600px;
    width: 100%;
    height: auto;
`;

const ModalClose = styled.button`
    background-color: transparent;
    border: none;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    padding: 5px;
    color: inherit;
    cursor: pointer;
    outline: none;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const CloseImg = styled.img`
    width: 50px;
    height: 50px;
`;

const ModelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: white;
    border-bottom: 1px solid #e0e0e0;
    box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.1);

    & > h1 {
        font-size: 30px;
        margin-right: 20px;
    }
`;

const ContentWrapper = styled.div`
    padding: 20px;
    overflow-y: auto;
    max-height: calc(100% - 80px);
`;
