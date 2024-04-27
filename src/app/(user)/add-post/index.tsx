import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';

const addPost = () => {
    console.log('ADD POST');

    return (
        <View style={styles.container}>
            <Text>add post</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
    headerRightContainer: {
        flex: 1,
        paddingHorizontal: 16,
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        alignSelf: 'stretch',
    },
});

export default addPost;
