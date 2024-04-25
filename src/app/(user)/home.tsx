import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from 'firebaseConfig';
import Button from '@/components/Button';
import { Stack, Tabs } from 'expo-router';
import TextStyles from '@/constants/TextStyles';
import Colors from '@/constants/Colors';
import InputField from '@/components/InputField';
import { useForm } from 'react-hook-form';

const HomeScreen = () => {
    console.log('HOME');
    const { control, handleSubmit } = useForm();

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: 'offera',
                    headerTitleAlign: 'left',
                    headerTitleStyle: TextStyles.bold7,
                    headerTintColor: Colors.blue,
                    headerShadowVisible: true,
                }}
            />

            <Button text="Sign Out" onPress={() => FIREBASE_AUTH.signOut()} />
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
});

export default HomeScreen;
