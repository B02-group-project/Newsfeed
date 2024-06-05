import React, { useState } from 'react';
import supabase from '../../api/supabase.client';
import {
    Form,
    ImageUpload,
    UploadInstructions,
    FileInputLabel,
    ImagePreview,
    RemoveButton,
    PostContent,
    SubmitButton,
    ButtonContainer
} from './CreatePage.styled';

const CreatePage = () => {
    const [image, setImage] = useState(null); // 사용자가 업로드한 이미지 파일 저장
    const [preview, setPreview] = useState(null); // 이미지 파일의 미리보기를 저장
    const [content, setContent] = useState(''); // 게시물의 내용을 저장
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }; // 선택한 파일을 상태에 저장하고 미리보기를 생성

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    }; // 드롭된 파일을 상태에 저장하고 미리보기를 생성

    const handleDragOver = (e) => {
        e.preventDefault();
    }; // 드래그 앤 드롭 이벤트가 발생할 때 기본 동작 방지

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        // 여기에 게시물 생성 로직 추가
        let imageUrl = null;    
        if (image) {
            const { data, error } = await supabase
                .storage
                .from('images')
                .upload(`public/${image.name}`, image);

            if (error) {
                console.error(error);
                setError('이미지 업로드 중 오류가 발생했습니다.');
                setLoading(false);
                return;
            }

            imageUrl = data.path;
        }

        const { error } = await supabase
            .from('posts')
            .insert({ content, created_at: new Date() });

        if (error) {
            console.log(error);
            setError('게시물 작성 중 오류가 발생했습니다.');
            setLoading(false);
            return;
        }

        alert('게시물이 작성되었습니다.');
        setImage(null);
        setPreview(null);
        setContent('');
        setLoading(false);
    }; // 사용자가 폼을 제출할 때 호출됨. 여기서 게시물 생성 로직을 추가할 수 있음.

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
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ButtonContainer>
                <SubmitButton type="submit" disabled={loading}>
                    {loading ? '업로드 중...' : '공유하기'}
                </SubmitButton>
            </ButtonContainer>
        </Form>
    );
};

export default CreatePage;