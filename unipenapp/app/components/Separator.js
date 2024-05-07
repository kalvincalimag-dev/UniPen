import React from 'react'
import { View, StyleSheet } from 'react-native'

// 101902 - 2

const Separator = ({
    width = '100%', 
    height = 1, 
    backgroundColor = '#d3d3d3',
    style
}) => {
  return (
    <View style={[{width, height, backgroundColor, alignSelf: 'center'}, style]}
    />
  );
};

const styles = StyleSheet.create({
    container: {},
});

export default Separator;