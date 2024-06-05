import React, { useState, useEffect } from 'react';
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
    DeleteButton,
    ButtonContainer
} from './EditPage.styled';

const EditPage = ({ postId, onDelete }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        // 여기에 기존 게시물 데이터를 가져오는 로직추가 (supabase 공식 문서)
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('content, image_url')
                .eq('id', postId)
                .single();

            if (error) {
                console.error(error);
                return;
            }

            setContent(data.content);
            setPreview(data.image_url);
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
        // 여기에 게시물 수정 로직 추가
        let imageUrl = preview;
        if (image) {
            const { data, error } = await supabase
                .storage
                .from('images')
                .upload(`public/${image.name}`, image);

            if (error) {
                console.error(error);
                alert('이미지 업로드 중 오류가 발생했습니다.');
                return;
            }

            imageUrl = data.path;
        }

        const { error } = await supabase
            .from('posts')
            .update({ content, updated_at: new Date() })
            .eq('id', postId);

        if (error) {
            console.error(error);
            alert('게시물 수정 중 오류가 발생했습니다.');
            return;
        }

        alert('게시물이 수정되었습니다.');
    };

    const handleDelete = async () => {
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId);

        if (error) {
            console.error(error);
            alert('게시물 삭제 중 오류가 발생했습니다.');
            return;
        }

        onDelete(postId);
        alert('게시물이 삭제되었습니다.');
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
                <DeleteButton type="button" onClick={handleDelete}>삭제하기</DeleteButton>
            </ButtonContainer>
        </Form>
    );
};

export default EditPage;
