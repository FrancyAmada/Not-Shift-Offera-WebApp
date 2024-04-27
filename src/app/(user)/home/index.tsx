import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '@/constants/Colors';

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
