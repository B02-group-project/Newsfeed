import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';
import CommetComp from './CommetComp';
import { PostboxWrapper } from './style/Postbox.styled';
import supabase from '../../api/supabase.client';

const Postbox = () => {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('posts').select('*');

            if (error) {
                console.log('error => ', error);
            } else {
                console.log('data => ', data);
                setPosts(data);
            }
        };

        fetchData();
    }, []);

    const handleLikeChange = (postId, liked) => {
        if (liked) {
            setLikedPosts([...likedPosts, postId]);
        } else {
            setLikedPosts(likedPosts.filter((id) => id !== postId));
        }
    };

    return (
        <div>
            {posts.map((post) => (
                <PostboxWrapper key={post.post_id}>
                    <React.Fragment>
                        <PostItem post={post} likedPosts={likedPosts} onLikeChange={handleLikeChange} />
                        <CommetComp />
                    </React.Fragment>
                </PostboxWrapper>
            ))}
        </div>
    );
};

export default Postbox;
