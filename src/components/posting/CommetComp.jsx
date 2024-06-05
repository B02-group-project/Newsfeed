import React, { useState, useEffect } from 'react';
import { CommetCompWrapper } from './style/CommetComp.styled';
import CommetItem from './CommetItem';
import supabase from '../../api/supabase.client';

const CommetComp = ({ postId }) => {
    const [commets, setCommets] = useState([]);
    const [likedcommets, setlikedcommets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('commets').select('*').eq('post_id', postId);

            if (error) {
                console.log('error => ', error);
            } else {
                setCommets(data);
            }
        };

        fetchData();
    }, [postId]);

    const handLikeChange = (commetId, liked) => {
        if (liked) {
            setlikedcommets([...likedcommets, commetId]);
        } else {
            setlikedcommets(likedcommets.filter((id) => id !== commetId));
        }
    };

    const handDeleteCommet = async (commetId) => {
        const { error } = await supabase.from('commets').delete().eq('id', commetId);

        if (error) {
            console.error('Error deleting commet:', error);
            return;
        }

        setCommets(commets.filter((commet) => commet.id !== commetId));
    };

    return (
        <CommetCompWrapper>
            <div>
                {commets.map((commet) => (
                    <CommetItem
                        key={commet.id}
                        commets={commet}
                        likedcommets={likedcommets}
                        onLikeChange={handLikeChange}
                        onDelete={handDeleteCommet}
                    />
                ))}
            </div>
            <div>
                <input type="text" placeholder="댓글을 작성해주세요" />
                <button>댓글달기</button>
            </div>
        </CommetCompWrapper>
    );
};

export default CommetComp;
