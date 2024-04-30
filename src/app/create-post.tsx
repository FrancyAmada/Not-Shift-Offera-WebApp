import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Stack } from 'expo-router';

import Colors from '@/constants/Colors';
import HeaderStyle from '@/constants/HeaderStyle';

const addPost = () => {
    console.log('ADD POST');

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{ headerShown: true, ...{ ...HeaderStyle } }}
            />
            <Text>Add pt</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blue,
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
