import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import dateFormat from 'dateformat';

const IMAGE_WIDTH = 100;

const PostListItem = ({ post, onPress }) => {
  const { thumbnail, title, createdAt, author } = post;

  const getThumbnail = (uri) => {
    if (uri) return { uri };

    return require('../../assets/blank.jpg');
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={getThumbnail(thumbnail)}
        style={styles.thumbnail}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>
          {dateFormat(createdAt, 'mediumDate')} - {author}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 10,
  },
  thumbnail: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH / 1.7,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});

export default PostListItem;
