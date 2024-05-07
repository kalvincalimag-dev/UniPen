import React from 'react';
import { View, StyleSheet, Text, Pressable} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// 082202 - 3

const NoInternet = ({onRefreshPress}) => {
  return (
    <View style={styles.container}>
        <MaterialCommunityIcons name="wifi-alert" size={35} color="#383838" />
        <Text style={{fontSize: 18, color:'#383838', paddingVertical: 5}}> 
            No Internet Connection
        </Text>
        <Pressable onPress={onRefreshPress} style={{flexDirection:'row', alignItems: 'center'}}>
            <Ionicons name="refresh-outline" size={18} color="black" />     
            <Text style={{fontSize: 18, paddingVertical: 5, marginLeft:5}}> Try Again </Text>   
        </Pressable>
    </View>
  )
};

// 101902 - 3 

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems:'center'
    },
});

export default NoInternet;
