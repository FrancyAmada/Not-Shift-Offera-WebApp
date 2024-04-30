import React, { useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ViewStyle,
    Pressable,
    ScrollView,
    Alert,
} from 'react-native';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { Link, Stack, useRouter } from 'expo-router';

import Colors from '@constants/Colors';
import TextStyles from '@/constants/TextStyles';
import FormStyles from '@/constants/FormStyles';

import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Separator from '@/components/Separator';
import BackButton from '@/components/BackButton';

import { useAuth } from '@/providers/AuthProvider';

const googleLogo = require('../../../assets/icons/google-logo.png');
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const LoginScreen = () => {
    console.log('LOG IN');

    const router = useRouter();
    const { logIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit } = useForm();

    const authLogIn = async (data: { email: string; password: string }) => {
        setLoading(true);

        let response = await logIn(data);
        setLoading(false);

        if (response && !response.success) {
            Alert.alert('Log in Failed', response.msg, [{ text: 'OK' }]);
        }
    };

    return (
        <ScrollView
            style={FormStyles.avoid}
            showsVerticalScrollIndicator={false}>
            <View style={FormStyles.container}>
                <Stack.Screen
                    options={{
                        title: 'Log In',
                        headerTitleAlign: 'center',
                        headerTitleStyle: TextStyles.bold5,
                        headerShadowVisible: false,
                        headerLeft: () => {
                            return (
                                <BackButton
                                    router={router}
                                    color={Colors.blue}
                                />
                            );
                        },
                    }}
                />
                <View style={FormStyles.form}>
                    <View style={FormStyles.inputContainer}>
                        {/* <Text style={FormStyles.label}>Email</Text> */}
                        <InputField
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: EMAIL_REGEX,
                                    message: 'Invalid email address',
                                },
                            }}
                            control={control}
                            name="email"
                            placeholder="Email"></InputField>
                    </View>
                    <View style={FormStyles.inputContainer}>
                        {/* <Text style={FormStyles.label}>Password</Text> */}
                        <InputField
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message:
                                        'Password must be at least 6 characters',
                                },
                            }}
                            control={control}
                            name="password"
                            secureTextEntry={true}
                            placeholder="Password"></InputField>
                        <Pressable>
                            <Text style={FormStyles.captionRight}>
                                {' '}
                                Forgot Password?{' '}
                            </Text>
                        </Pressable>
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color={Colors.blue} />
                    ) : (
                        <>
                            <Button
                                text="Log In"
                                onPress={handleSubmit(
                                    authLogIn as SubmitHandler<FieldValues>,
                                )}
                            />
                        </>
                    )}
                </View>
                <Separator type="withLabel" text="or" />
                <View style={FormStyles.footer}>
                    <Button
                        type="withIcon"
                        backgroundColor={Colors.lightGrey}
                        text="Log in with Google"
                        textStyle={FormStyles.googleLogin as ViewStyle}
                        icon={googleLogo}
                        iconPosition="left"
                    />
                    <View style={FormStyles.rowFix}>
                        <Text style={FormStyles.footerText}>
                            Don't have an account?{' '}
                        </Text>
                        <Link href={'/sign-up'}>
                            <Text style={FormStyles.highlight}> Sign Up </Text>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;
