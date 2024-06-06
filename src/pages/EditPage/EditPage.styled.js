import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ImageUpload = styled.div`
  width: 300px;
  height: 400px;
  padding: 20px;
  text-align: center;
  margin: 40px auto 20px auto;
  position: relative;
  background-color: lightgray;
  display: flex; 
  justify-content: center; 
  align-items: center; 
`;

export const MainButton = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 8px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: #0056b3;
    }
`;

export const UploadInstructions = styled.div`
  color: black;
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
`;

export const FileInputLabel = styled.label`
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  background-color: #0095f6;
  display: inline-block;
  margin-top: 10px;
`;

export const ImagePreview = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 400px;
  margin: 0 auto;

  img {
    max-width: 100%;
    max-height: 400px;
    display: block;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: red;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

export const PostContent = styled.textarea`
  width: 700px;
  height: 500px;
  padding: 10px;
  margin: 10px auto 20px auto;
  font-size: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 10px auto 30px auto;
`;

export const SubmitButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #0095f6;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #007bbf;
  }
`;

export const DeleteButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #dc3545;
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #c82333;
  }
`;
