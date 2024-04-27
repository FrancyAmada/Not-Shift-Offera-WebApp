import React from 'react';
import { View } from 'react-native';

import { Stack } from 'expo-router';

import TextStyles from '@/constants/TextStyles';

import IconButton from '@/components/IconButton';

const PostsStack = () => {
    return (
        <Stack
            screenOptions={{
                title: 'My Posts',
                headerTitleStyle: TextStyles.bold6,
                headerShadowVisible: true,
                headerLeft: () => {
                    return <View style={{ paddingRight: 16 }}></View>;
                },
                headerRight: () => {
                    return (
                        <View>
                            <IconButton
                                icon="profile-outline"
                                route="/(user)/home/profile"
                                strokeWidth={0.5}
                            />
                        </View>
                    );
                },
            }}>
            <Stack.Screen name="index" />
        </Stack>
    );
};

export default PostsStack;
