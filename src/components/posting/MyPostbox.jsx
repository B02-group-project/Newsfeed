import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';
import CommetComp from './CommetComp';
import styled from 'styled-components';
import supabase from '../../api/supabase.client';

const MyPostbox = ({ postId }) => {
    const [post, setPost] = useState(null);
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();

            if (error) {
                console.log('error => ', error);
            } else {
                setPost(data);
            }
        };

        if (postId) {
            fetchData();
        }
    }, [postId]);

    const handleLikeChange = (liked) => {
        if (liked) {
            setLikedPosts([...likedPosts, postId]);
        } else {
            setLikedPosts(likedPosts.filter((id) => id !== postId));
        }
    };

    const handleDeletePost = async () => {
        const { error } = await supabase.from('posts').delete().eq('id', postId);

        if (error) {
            console.error('Error deleting post:', error);
        } else {
            fetchData();
        }
    };

    if (!post) return null;

    return (
        <PostboxWrapper>
            <h2>MyPostbox</h2>
            <React.Fragment>
                <PostItem
                    post={post}
                    likedPosts={likedPosts}
                    onLikeChange={handleLikeChange}
                    onDelete={handleDeletePost}
                />
                <CommetComp postId={post.id} postUserId={post.user_id} />
            </React.Fragment>
        </PostboxWrapper>
    );
};

export default MyPostbox;

const PostboxWrapper = styled.div`
    width: 800px;
    min-height: 400px;
    max-height: 500px;
    background-color: #b8c3e0;
    margin-top: 20px;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
