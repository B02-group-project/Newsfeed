import React, { useState } from 'react';
import {
    Form,
    ImageUpload,
    UploadInstructions,
    FileInputLabel,
    ImagePreview,
    PostContent,
    SubmitButton
} from './CreatePage.styled';

const CreatePage = () => {
    const [image, setImage] = useState(null); // 사용자가 업로드한 이미지 파일 저장
    const [preview, setPreview] = useState(null); // 이미지 파일의 미리보기를 저장
    const [content, setContent] = useState(''); // 게시물의 내용을 저장

    const handleSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }; // 선택한 파일을 상태에 저장하고 미리보기를 생성
    console.log(handleSelect);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }; // 드롭된 파일을 상태에 저장하고 미리보기를 생성
    console.log(handleDrop);

    const handleDragOver = (e) => {
        e.preventDefault();
    }; // 드래그 앤 드롭 이벤트가 발생할 때 기본 동작 방지
    console.log(handleDragOver);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 게시물 생성 로직 추가
        console.log('Content:', content);
        console.log('Image:', image);
    }; // 사용자가 폼을 제출할 때 호출됨. 여기서 게시물 생성 로직을 추가할 수 있음.
    console.log(handleSubmit);

    return (
        <Form onSubmit={handleSubmit}>
            <ImageUpload
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {preview ? (
                    <ImagePreview src={preview} alt="Preview" />
                ) : (
                    <UploadInstructions>
                        <p>사진과 동영상을 여기에 끌어다 놓으세요</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleSelect}
                            id="fileInput"
                            style={{ display: 'none' }}
                        />
                        <FileInputLabel htmlFor="fileInput">
                            컴퓨터에서 선택
                        </FileInputLabel>
                    </UploadInstructions>
                )}
            </ImageUpload>
            <PostContent
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 작성하세요..."
            />
            <SubmitButton type="submit">공유하기</SubmitButton>
        </Form>
    );
};

export default CreatePage;