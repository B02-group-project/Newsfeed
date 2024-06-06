import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../api/supabase.client';
import {
    Form,
    ImageUpload,
    UploadInstructions,
    FileInputLabel,
    ImagePreviewWrapper, // ImagePreview 대신 ImagePreviewWrapper로 변경
    RemoveButton,
    PostContent,
    SubmitButton,
    ButtonContainer
} from './CreatePage.styled';

const CreatePage = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
            } else {
                setUser(user);
            }
        };

        fetchUser();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!user) {
            setError('사용자 정보를 가져오지 못했습니다.');
            setLoading(false);
            return;
        }

        let imageUrl = null;

        if (image) {
            const { error: imageError } = await supabase
                .storage
                .from('images')
                .upload(`public/${image.name}`, image);

            if (imageError) {
                console.error(imageError);
                setError('이미지 업로드 중 오류가 발생했습니다.');
                setLoading(false);
                return;
            }

            imageUrl = `public/${image.name}`;
        }

        const { data, error: postError } = await supabase
            .from('posts')
            .insert({ content, created_at: new Date(), user_id: user.id, image_url: imageUrl })
            .select()
            .single();

        if (postError) {
            console.error(postError);
            setError('게시물 작성 중 오류가 발생했습니다.');
            setLoading(false);
            return;
        }

        alert('게시물이 작성되었습니다.');
        setImage(null);
        setPreview(null);
        setContent('');
        setLoading(false);

        navigate(`/edit/${data.id}`);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <ImageUpload
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {preview ? (
                    <ImagePreviewWrapper>
                        <img src={preview} alt="미리보기" />
                        <RemoveButton onClick={handleRemoveImage}>&times;</RemoveButton>
                    </ImagePreviewWrapper>
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
