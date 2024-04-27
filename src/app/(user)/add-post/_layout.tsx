import React from 'react';

import { Stack, useRouter } from 'expo-router';

import TextStyles from '@/constants/TextStyles';
import IconButton from '@/components/IconButton';
import { View } from 'react-native';
import BackButton from '@/components/BackButton';

const AddPostStack = () => {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                title: 'Add Post',
                headerTitleStyle: TextStyles.bold6,
                headerShadowVisible: true,
                headerLeft: () => {
                    return <View style={{ paddingRight: 16 }}></View>;
                },
                headerRight: () => {
                    return (
                        <IconButton
                            icon="profile-outline"
                            route="/(user)/home/profile"
                            strokeWidth={0.5}
                        />
                    );
                },
            }}>
            <Stack.Screen name="index" />
        </Stack>
    );
};

export default AddPostStack;
