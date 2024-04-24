import {
    View,
    Text,
    ActivityIndicator,
    ViewStyle,
    Pressable,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';

import {
    FieldValue,
    FieldValues,
    Form,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import { Link, Stack } from 'expo-router';

import { FIREBASE_AUTH } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import Colors from '@constants/Colors';
import Button from '@/components/Button';
import Separator from '@/components/Separator';
import FormStyles from '@/constants/FormStyles';
import TextStyles from '@/constants/TextStyles';
import InputField from '@/components/InputField';

const googleLogo = require('../../../assets/icons/google-logo.png');
const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const auth = FIREBASE_AUTH;

const SignupScreen = () => {
    console.log('SIGN UP');

    const [loading, setLoading] = useState(false);
    const { control, handleSubmit } = useForm();

    async function signUp(data: {
        name: string;
        email: string;
        password: string;
    }) {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password,
            );
            console.log(response);
        } catch (error: any) {
            alert('Sign Up Failed!' + error.message);
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
                        title: 'Sign Up',
                        headerTitleAlign: 'center',
                        headerTitleStyle: TextStyles.bold5,
                        headerShadowVisible: false,
                    }}
                />
                <View style={FormStyles.form}>
                    <View style={FormStyles.inputContainer}>
                        {/* <Text style={FormStyles.label}>Name</Text> */}
                        <InputField
                            rules={{
                                required: 'Name is required',
                                minLength: {
                                    value: 3,
                                    message:
                                        'Name must be at least 3 characters',
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        'Name must be at most 50 characters',
                                },
                            }}
                            control={control}
                            name="name"
                            placeholder="Name"
                            autoCapitalize="words"></InputField>
                    </View>
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
                    </View>
                    {loading ? (
                        <ActivityIndicator size="large" color={Colors.blue} />
                    ) : (
                        <>
                            <Button
                                text="Create account"
                                onPress={handleSubmit(
                                    signUp as SubmitHandler<FieldValues>,
                                )}
                            />
                        </>
                    )}
                    <View style={FormStyles.rowFix}>
                        <Text style={FormStyles.captionCenter}>
                            By continuing, you agree to our
                        </Text>
                        <Text style={FormStyles.highlight}>
                            Terms of Service
                        </Text>
                        <Text style={FormStyles.captionCenter}> and </Text>
                        <Text style={FormStyles.highlight}>Privacy Policy</Text>
                    </View>
                </View>
                <Separator type="withLabel" text="or" />
                <View style={FormStyles.footer}>
                    <Button
                        type="withIcon"
                        backgroundColor={Colors.lightGrey}
                        text="Sign up with Google"
                        textStyle={FormStyles.googleLogin as ViewStyle}
                        icon={googleLogo}
                        iconPosition="left"
                    />
                    <View style={FormStyles.rowFix}>
                        <Text style={FormStyles.footerText}>
                            Already have an account?{' '}
                        </Text>
                        <Link href={'/log-in'}>
                            <Text style={FormStyles.highlight}> Log In </Text>
                        </Link>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignupScreen;
