import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

const myApplications = () => {
    console.log('MY APPLICATIONS');

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{ headerShown: true, headerShadowVisible: true }}
            />
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

export default myApplications;
