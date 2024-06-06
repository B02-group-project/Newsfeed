import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../api/supabase.client';
import {
    Form,
    ImageUpload,
    UploadInstructions,
    FileInputLabel,
    ImagePreviewWrapper,
    RemoveButton,
    PostContent,
    SubmitButton,
    ButtonContainer,
    MainButton // MainButton 스타일 추가
} from './CreatePage.styled';

// 이미지의 공개 URL을 가져오는 함수
const getAvatarPublicUrl = (imagePath) => {
    const { data } = supabase.storage
        .from("posts")
        .getPublicUrl(String(imagePath));
    return data.publicUrl;
};

const CreatePage = () => {
    const [image, setImage] = useState(null); // 사용자가 업로드한 이미지 파일 저장
    const [preview, setPreview] = useState(null); // 이미지 파일의 미리보기를 저장
    const [content, setContent] = useState(''); // 게시물의 내용을 저장
    const [loading, setLoading] = useState(false); // 로딩 상태 저장
    const [error, setError] = useState(null); // 오류 상태 저장
    const [user, setUser] = useState(null); // 사용자 정보 저장
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

    // 컴포넌트가 마운트될 때 사용자 정보 가져오기
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

    // 사용자가 파일을 선택했을 때 호출되는 함수
    const handleSelect = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const uniqueFileName = `${user.email}/${Date.now()}-${file.name}`; // 고유한 파일 이름 생성
            setImage(file);
            setPreview(URL.createObjectURL(file));
            const { data: imageData, error } = await supabase.storage
                .from("posts")
                .upload(uniqueFileName, file);

            if (error) {
                console.error("이미지 업로드 과정에 에러", error);
                return;
            }

            const publicUrl = getAvatarPublicUrl(imageData.path);
            setPreview(publicUrl);
        }
    };

    // 사용자가 파일을 드롭했을 때 호출되는 함수
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
            const uniqueFileName = `${user.email}/${Date.now()}-${file.name}`; // 고유한 파일 이름 생성
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // 드래그 앤 드롭 이벤트가 발생할 때 기본 동작 방지
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // 이미지 미리보기 제거 함수
    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };

    // 폼 제출 시 호출되는 함수
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
            const uniqueFileName = `${user.email}/${Date.now()}-${image.name}`; // 고유한 파일 이름 생성
            const { data: imageData, error: imageError } = await supabase
                .storage
                .from('posts')
                .upload(uniqueFileName, image);

            if (imageError) {
                console.error("이미지 업로드 중 오류가 발생했습니다.", imageError);
                setError('이미지 업로드 중 오류가 발생했습니다.');
                setLoading(false);
                return;
            }

            imageUrl = getAvatarPublicUrl(imageData.path);
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
            <MainButton onClick={() => navigate('/main')}>Main</MainButton> 
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
