import React, { useState, useEffect } from 'react';
import {
    Form,
    ImageUpload,
    UploadInstructions,
    FileInputLabel,
    ImagePreview,
    RemoveButton,
    PostContent,
    SubmitButton
} from './EditPage.styled';

const EditPage = ({ postId }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        // 여기에 기존 게시물 데이터를 가져오는 로직을 추가합니다.
        // 예를 들어, API 호출을 통해 데이터를 가져오고 상태를 설정할 수 있습니다.
        const fetchPost = async () => {
            // 예시 데이터
            const post = {
                content: '기존 게시물 내용',
                imageUrl: '기존 이미지 URL'
            };
            setContent(post.content);
            setPreview(post.imageUrl);
        };

        fetchPost();
    }, [postId]);

    const handleSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 여기에 게시물 수정 로직을 추가합니다.
        console.log('Content:', content);
        console.log('Image:', image);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <ImageUpload
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {preview ? (
                    <ImagePreview>
                        <img src={preview} alt="Preview" />
                        <RemoveButton onClick={handleRemoveImage}>×</RemoveButton>
                    </ImagePreview>
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
            <SubmitButton type="submit">수정하기</SubmitButton>
        </Form>
    );
};

export default EditPage;
