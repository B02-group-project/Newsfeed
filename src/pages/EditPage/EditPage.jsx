import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
} from './EditPage.styled';

const EditPage = () => {
    const { postId } = useParams();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [content, setContent] = useState('');
    const [user, setUser] = useState(null); // 사용자 정보 저장

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

        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('content')
                .eq('id', postId)
                .single();

            if (error) {
                console.error(error);
                return;
            }

            setContent(data.content);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('사용자 정보를 가져오지 못했습니다.');
            return;
        }

        let imageUrl = null;

        if (image) {
            const { data, error: imageError } = await supabase
                .storage
                .from('images')
                .upload(`public/${image.name}`, image);

            if (imageError) {
                console.log(imageError);
                alert('이미지 업로드 중 오류가 발생했습니다.');
                return;
            }

            imageUrl = data.path;
        }

        console.log('Updating post with content:', content);
        console.log('Image URL:', imageUrl);

        const updates = {
            content,
            updated_at: new Date(),
            user_id: user.id,
            ...(imageUrl && { image_url: imageUrl }) // imageUrl이 있을 경우에만 포함
        };

        const { error: postError } = await supabase
            .from('posts')
            .update(updates)
            .eq('id', postId);

        if (postError) {
            console.error(postError);
            alert('게시물 수정 중 오류가 발생했습니다.');
            return;
        }

        alert('게시물이 수정되었습니다.');
    };

    return (
        <Form onSubmit={handleSubmit}>
            <ImageUpload
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {preview ? (
                    <ImagePreview>
                        <img src={preview} alt="미리보기" />
                        <RemoveButton onClick={handleRemoveImage}>×</RemoveButton>
                    </ImagePreview>
                ) : (
                    <UploadInstructions>
                        <p>사진을 여기에 끌어다 놓으세요</p>
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
            <ButtonContainer>
                <SubmitButton type="submit">수정하기</SubmitButton>
            </ButtonContainer>
        </Form>
    );
};

export default EditPage;
