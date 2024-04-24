import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from 'firebaseConfig';
import Button from '@/components/Button';

const HomeScreen = () => {
    console.log('HOME');

    return (
        <View style={styles.container}>
            <Button text="Sign Out" onPress={() => FIREBASE_AUTH.signOut()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreen;
