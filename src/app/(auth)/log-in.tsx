import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    ViewStyle,
    Pressable,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Link, Stack } from 'expo-router';

import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

import Colors from '@constants/Colors';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import Separator from '@/components/Separator';
import FormStyles from '@/constants/FormStyles';
import TextStyles from '@/constants/TextStyles';

const googleLogo = require('../../../assets/icons/google-logo.png');
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const auth = FIREBASE_AUTH;

const LoginScreen = () => {
    console.log('LOG IN');

    const [loading, setLoading] = useState(false);
    const { control, handleSubmit } = useForm();

    async function logIn(data: { email: string; password: string }) {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
            console.log(response);
        } catch (error: any) {
            alert('Log In Failed!' + error.message);
        } finally {
            setLoading(false);
        }
    }

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
                                    logIn as SubmitHandler<FieldValues>,
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
