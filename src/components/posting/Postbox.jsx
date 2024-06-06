import React, { useState, useEffect } from 'react';
import PostItem from './PostItem';
import CommetComp from './CommetComp';
import { PostboxWrapper } from './style/Postbox.styled';
import supabase from '../../api/supabase.client';

const Postbox = () => {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);

    // const { data, error } = await supabase
    // .from('userInfo') // userInfo에서
    // .select() // 전부다가져와라
    // .eq('id', `${props.id}`) // id === props.id

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase.from('posts').select('*');

            if (error) {
                console.log('error => ', error);
            } else {
                console.log('data => ', data);
                const sortedPosts = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setPosts(sortedPosts);
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
    const handleDeletePost = async (postId) => {
        const { error } = await supabase.from('posts').delete().eq('id', postId);

        if (error) {
            throw error;
        }
        window.location.reload();
    };
    return (
        <div>
            {posts.map((post) => (
                <PostboxWrapper key={post.id}>
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
            ))}
        </div>
    );
};

export default Postbox;
