import React from 'react';

import { Stack } from 'expo-router';

import TextStyles from '@/constants/TextStyles';

const HomeStack = () => {
    return (
        <Stack
            screenOptions={{
                title: 'My Posts',
                headerTitleAlign: 'center',
                headerTitleStyle: TextStyles.bold5,
                headerShadowVisible: true,
            }}>
            <Stack.Screen name="index" />
        </Stack>
    );
};

export default HomeStack;
