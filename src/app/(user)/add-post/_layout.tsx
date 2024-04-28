import React from 'react';

import { Stack, useRouter } from 'expo-router';

import TextStyles from '@/constants/TextStyles';
import IconButton from '@/components/IconButton';
import { View } from 'react-native';
import BackButton from '@/components/BackButton';
import Colors from '@/constants/Colors';

const AddPostStack = () => {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                title: 'Add Post',
                headerTitleStyle: TextStyles.bold6,
                headerStyle: { backgroundColor: Colors.blue },
                headerTintColor: Colors.white,
                // headerStyle: { backgroundColor: Colors.white },
                // headerTintColor: Colors.blue,
                headerShadowVisible: true,
                headerLeft: () => {
                    return <View style={{ paddingRight: 16 }}></View>;
                },
                headerRight: () => {
                    return (
                        <IconButton
                            icon="profile-fill"
                            color={Colors.white}
                            route="/(user)/home/profile"
                            strokeWidth={0}
                        />
                    );
                },
            }}>
            <Stack.Screen name="index" />
        </Stack>
    );
};

export default AddPostStack;
