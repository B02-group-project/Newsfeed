
import styled from 'styled-components';

const Button = ({ text, handleClick, width, height, fontSize }) => {
    return (
        <Btn width={width} height={height} fontSize={fontSize} onClick={handleClick}>
            {text}
        </Btn>
    );

};

export default React.memo(Button);

export const Btn = styled.button`

    background-color: #136dc1;
    width: ${(pros) => pros.width || '423px'};
    height: ${(pros) => pros.height || '53px'};
    border-radius: 50px;
    color: white;
    border: solid 1px transparent;
    font-size: ${(pros) => pros.fontSize || '30px'};
    margin: 20px;


  &:hover {
    background-color: white;
    color: #136dc1;
    border: solid 1px #989898;
  }
`;
