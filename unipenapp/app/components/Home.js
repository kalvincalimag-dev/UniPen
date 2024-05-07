
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, View} from 'react-native';
import { getFeaturedPosts, getLatestPosts, getSinglePost } from '../api/post';
import Slider from './Slider';
import Separator from './Separator';
import PostListItem from './PostListItem';
import Constants from 'expo-constants';

let pageNo = 0; 
const limit = 5;

export default function Home({navigation}) {

  const [featuredPosts, setFeaturedPosts] = useState([])
  const [latestPosts, setLatestPosts] = useState([])
  const [reachedToEnd, setReachedToEnd] = useState(false)
  const [busy, setBusy] = useState(false);

  const fetchFeaturedPosts = async () => {
    const {error, posts} = await getFeaturedPosts();
    if(error) return console.log(error);
    setFeaturedPosts(posts);
  };

  const fetchLatestPosts = async () => {
    const {error, posts} = await getLatestPosts(limit, pageNo);
    if(error) return console.log(error);
    setLatestPosts(posts);
  };

  // FMP 
  const fetchMorePosts = async () => {
    if(reachedToEnd || busy) return;

    pageNo += 1;
    setBusy(true);
    const {error, posts, postCount} = await getLatestPosts(limit, pageNo);
    setBusy(false);
    if(error) return console.log(error);
    
    if(postCount === latestPosts.length) return setReachedToEnd(true);

    setLatestPosts([...latestPosts, ...posts]);
  };

  useEffect(() => {
    fetchFeaturedPosts();
    fetchLatestPosts();
    
    return () => {
      pageNo = 0
      setReachedToEnd(false)
    };
  }, []);

  const ListHeaderComponent = useCallback(() => {
    return (
      <View style={{paddingTop: Constants.statusBarHeight}}>
        {featuredPosts.length ? (
          <Slider onSlidePress={fetchSinglePost} data={featuredPosts} title='Featured Articles'/> 
        ) : null }
        <View style={{marginTop: 10}}>
          <Separator/>
          <Text style={{fontWeight: '700', color: "#383838", fontSize: 22, marginTop: 15}}>Latest Articles</Text>
        </View>
      </View>
    ); 
  }, [featuredPosts]);

  const fetchSinglePost = async (postInfo) => {
    const slug = postInfo.slug || postInfo;
    const {error, post} = await getSinglePost(slug);

    if(error) console.log(error)
    navigation.navigate('PostDetail', { post });
  };
  
  const renderItem = ({ item }) => {
    return (
      <View style={{ marginTop: 15 }}>
        <PostListItem onPress={() => fetchSinglePost(item.slug)} post={ item } />
      </View>
    );
  };

  const ItemSeparatorComponent = () => (
    <Separator width='90%' style={{marginTop: 5}}/>
  );

  return (
    <FlatList 
        data={latestPosts} 
        keyExtractor={(item) => item.id} 
        contentContainerStyle = {{paddingHorizontal: 10, paddingBottom: 20}}
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0}
        ListFooterComponent={() => {
          return reachedToEnd ? ( 
            <Text 
              style={{
                fontWeight: 'bold',
                color: '#383838', 
                textAlign: 'center', 
                paddingVertical: 15,
              }}
              >
                You've reached the End!
              </Text> 
          ) : null;
        }}
    />
  );
}

