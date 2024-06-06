import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
    ButtonContainer,
    MainButton // MainButton 스타일 추가
} from './EditPage.styled';

// 이미지의 공개 URL을 가져오는 함수
const getAvatarPublicUrl = (imagePath) => {
    const { data } = supabase.storage
        .from("posts")
        .getPublicUrl(String(imagePath));
    return data.publicUrl;
};

const EditPage = () => {
    const { postId } = useParams(); // URL 매개변수에서 postId 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
    const [image, setImage] = useState(null); // 사용자가 업로드한 이미지 파일 저장
    const [preview, setPreview] = useState(null); // 이미지 파일의 미리보기를 저장
    const [content, setContent] = useState(''); // 게시물의 내용을 저장
    const [user, setUser] = useState(null); // 사용자 정보 저장
    const [isImageRemoved, setIsImageRemoved] = useState(false); // 이미지가 제거되었는지 여부

    // 컴포넌트가 마운트될 때 사용자 정보와 게시물 정보 가져오기
    useEffect(() => {
        // 사용자 정보 가져오기
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error);
            } else {
                setUser(user);
            }
        };

        fetchUser();

        // 게시물 정보 가져오기
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('content, image_url') // content와 image_url을 선택
                .eq('id', postId)
                .single();

            if (error) {
                console.error(error);
                return;
            }

            setContent(data.content);
            setPreview(data.image_url ? data.image_url : null); // 이미지 URL 설정
        };
        fetchPost();
    }, [postId]);

    // 사용자가 파일을 선택했을 때 호출되는 함수
    const handleSelect = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const uniqueFileName = `${user.email}/${Date.now()}-${file.name}`; // 고유한 파일 이름 생성
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setIsImageRemoved(false); // 이미지가 새로 선택되었으므로 제거 상태를 false로 설정
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
            setIsImageRemoved(false); // 이미지가 새로 선택되었으므로 제거 상태를 false로 설정
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
        setIsImageRemoved(true); // 이미지가 제거되었음을 표시
    };

    // 폼 제출 시 호출되는 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('사용자 정보를 가져오지 못했습니다.');
            return;
        }

        let imageUrl = null;

        if (image) {
            const uniqueFileName = `${user.email}/${Date.now()}-${image.name}`; // 고유한 파일 이름 생성
            const { data, error: imageError } = await supabase
                .storage
                .from('posts')
                .upload(uniqueFileName, image);

            if (imageError) {
                console.error(imageError);
                alert('이미지 업로드 중 오류가 발생했습니다.');
                return;
            }

            imageUrl = getAvatarPublicUrl(data.path);
        }

        if (isImageRemoved) {
            imageUrl = null; // 이미지가 제거되었으면 imageUrl을 null로 설정
        }

        console.log('Updating post with content:', content);
        console.log('Image URL:', imageUrl);

        const updates = {
            content,
            updated_at: new Date(),
            user_id: user.id,
            image_url: imageUrl // imageUrl 설정 (null일 수 있음)
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
            <MainButton onClick={() => navigate('/main')}>Main</MainButton>
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
