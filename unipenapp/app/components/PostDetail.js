import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import dateFormat from 'dateformat';
import Markdown from 'react-native-markdown-display';
import * as Linking from 'expo-linking';
import { getSinglePost } from '../api/post';
import RelatedPosts from './RelatedPosts';
import Separator from './Separator';

const { width } = Dimensions.get('window');

const MY_WEBSITE_LINK = 'unipen.com/unipen';

const PostDetail = ({ route, navigation }) => {
  const post = route.params?.post;

  const getImage = (uri) => {
    if (uri) return { uri };
    return require('../../assets/blank.jpg');
  };

  const handleSinglePostFetch = async (slug) => {
    const { error, post } = await getSinglePost(slug);

    if (error) return console.log(error);
    navigation.push('PostDetail', { post });
  };

  // 050902 - 1 
  
  const handleOnLinkPress = async (url) => {
    if (url.includes(MY_WEBSITE_LINK)) {
      const slug = url.split(MY_WEBSITE_LINK + '/')[1];

      if (!slug) return false;
      handleSinglePostFetch(slug);
      return false;
    }
    const res = await Linking.canOpenURL(url);
    if (res) Linking.openURL(url);
    else Alert.alert('Invalid URL', 'Can not Open Broken Link!');
  };  

  if (!post) return null;

  const { title, thumbnail, tags, createdAt, author, content } = post;

  return (
    <ScrollView style={styles.container}>
      <Image source={getImage(thumbnail)} style={styles.thumbnail} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.metaInfo}>
          <Text style={styles.authorText}>By {author}</Text>
          <Text style={styles.dateText}>{dateFormat(createdAt, 'mediumDate')}</Text>
        </View>

        <View style={styles.tagsContainer}>
          <Text style={styles.tagsText}>Tags</Text>
          <View style={styles.tags}>
            {tags.map((tag, index) => (
              <Text style={styles.tag} key={tag + index}>
                "{tag}"
              </Text>
            ))}
          </View>
        </View>

        {/* 101902 - 1 */}
        <Markdown style={styles.markdown} onLinkPress={handleOnLinkPress}>
          {content}
        </Markdown>
      </View>

      <View style={styles.relatedPostsContainer}>
        <Text style={styles.relatedPostsTitle}>Related Posts</Text>
        <Separator width="100%" />
        <RelatedPosts onPostPress={handleSinglePostFetch} postId={post.id} />
      </View>
    </ScrollView>
  );
};

// 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
  },
  thumbnail: {
    width,
    height: width / 1.7,
  },
  contentContainer: {
    marginTop: -8,
    padding: 20,

  },
  title: {
    fontWeight: 'bold', 
    color: '#333', 
    fontSize: 28, 
    marginVertical: 4,
    paddingBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2, 
  },
  authorText: {
    color: '#555',
    fontSize: 15, 
  },
  dateText: {
    color: '#555',
    fontSize: 15,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2, 
    paddingBottom: 8,
  },
  tagsText: {
    color: '#555',
    marginRight: 2, 
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tag: {
    marginLeft: 5, 
    color: '#666', 
    fontWeight: 'bold' 
  },
  markdown: {
    lineHeight: 32, 
    color: '#444', 
    fontSize: 20, 
  },
  relatedPostsContainer: {
    padding: 20,
  },
  relatedPostsTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16, 
    fontSize: 26, 
  },
});


export default PostDetail;
