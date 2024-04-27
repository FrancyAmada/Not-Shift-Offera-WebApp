import React from 'react';
import { StyleSheet, View, Text, Image, ViewStyle } from 'react-native';

import { useRouter } from 'expo-router';

import Colors from '@constants/Colors';
import TextStyles from '@constants/TextStyles';

import Button from '@/components/Button';

const index = () => {
    console.log('WELCOME');

    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/logo/logo.png')}
                    style={{
                        width: 120,
                        height: 120,
                        resizeMode: 'contain',
                    }}
                />
                <Text style={styles.title}>offera</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    text="Log In"
                    onPress={() => router.navigate('/log-in')}
                />

                <Button
                    text="Sign Up"
                    onPress={() => router.navigate('/sign-up')}
                    textStyle={styles.signUp as ViewStyle}
                    hasBackground={false}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 16,
    },
    logoContainer: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    buttonsContainer: {
        flex: 1,
        width: '100%',
        padding: 14,
        justifyContent: 'center',
        gap: 20,
    },
    title: { ...TextStyles.bold8, color: Colors.blue },
    signUp: { color: Colors.blue },
});

export default index;
