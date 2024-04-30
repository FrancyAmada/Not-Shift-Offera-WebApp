import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/providers/AuthProvider';

import Colors from '@/constants/Colors';

import Button from '@/components/Button';

const ProfileScreen = () => {
    const { logOut } = useAuth();
    const authLogOut = async () => {
        try {
            await logOut();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Button text="Sign Out" onPress={authLogOut} />
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
    },
});
