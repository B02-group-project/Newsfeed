import { useState, useEffect } from 'react';
import { CommetCompWrapper, InputWrapper, CommentInput, SubmitButton } from './style/CommetComp.styled';
import CommetItem from './CommetItem';
import supabase from '../../api/supabase.client';

const CommetComp = ({ postId }) => {
    const [commets, setCommets] = useState([]);
    const [addCommet, setAddCommet] = useState('');
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();
            if (error) {
                console.log('error => ', error);
            } else {
                const userId = user?.id;
                if (userId) {
                    setUserId(userId);
                }
            }
        };
        fetchData();
    }, []);

    const fetchData = async () => {
        const { data, error } = await supabase.from('commets').select('*').eq('post_id', postId);

        if (error) {
            console.log('error => ', error);
        } else {
            setCommets(data);
        }
    };

    const handDeleteCommet = async (commetId) => {
        const { error } = await supabase.from('commets').delete().eq('id', commetId);

        if (error) {
            throw error;
        }
        fetchData();
    };

    const handleAdd = async () => {
        // 댓글이 비어있으면 경고 메시지 표시
        if (!addCommet) {
            alert('댓글을 입력해주세요.');
            return;
        }
        const { data, error } = await supabase.from('commets').insert({
            post_id: postId,
            content: addCommet,
            created_at: new Date(),
            user_id: userId,
        });
        if (error) {
            console.log('error => ', error);
        } else {
            console.log('data => ', data);
            setAddCommet(''); // 입력 필드 초기화
            fetchData();
        }
    };

    return (
        <CommetCompWrapper>
            <div>
                {commets.map((commet) => (
                    <CommetItem key={commet.id} commets={commet} onDelete={handDeleteCommet} userId={userId} />
                ))}
            </div>
            <InputWrapper>
                <CommentInput
                    type="text"
                    placeholder="댓글을 작성해주세요"
                    value={addCommet}
                    onChange={(e) => {
                        setAddCommet(e.target.value);
                    }}
                />
                <SubmitButton onClick={handleAdd}>등록</SubmitButton>
            </InputWrapper>
        </CommetCompWrapper>
    );
};

export default CommetComp;
