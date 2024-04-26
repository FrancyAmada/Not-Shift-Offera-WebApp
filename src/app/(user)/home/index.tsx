import { StyleSheet, View, Text } from 'react-native';
import React from 'react';

import Colors from '@/constants/Colors';
import Button from '@/components/Button';

const HomeScreen = () => {
    console.log('HOME');

    return <View style={styles.container}></View>;
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

export default HomeScreen;
