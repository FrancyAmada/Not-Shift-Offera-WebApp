import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useAuth } from '@/providers/AuthProvider';

import Colors from '@/constants/Colors';

import Button from '@/components/Button';

const profile = () => {
    const { logOut } = useAuth();
    const authLogOut = async () => {
        await logOut();
    };

    return (
        <View style={styles.container}>
            <Button text="Sign Out" onPress={authLogOut} />
        </View>
    );
};

export default profile;

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
