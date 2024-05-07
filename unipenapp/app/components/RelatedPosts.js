import React, { useEffect, useState } from 'react'
import {View, StyleSheet} from 'react-native'
import PostListItem from './PostListItem';
import { getSimilarPosts, getSinglePost } from '../api/post';

const RelatedPosts = ({postId, onPostPress }) => {
    const [posts, setPosts] = useState([]);

    const fetchSimilarPosts = async() => {
        const {error, posts} = await getSimilarPosts(postId);
        if(error) console.log(error)

        setPosts([...posts]);
    }

    useEffect(() => {
        fetchSimilarPosts()
    }, [postId]);

  return posts.map((post) => {
        return ( 
            <View style={styles.container} key={post.id}> 
                <PostListItem onPress={() => onPostPress(post.slug)}post={post}/>
            </View>
        );
    });
};

const styles = StyleSheet.create({
    container: { marginTop: 10},
});

export default RelatedPosts;
