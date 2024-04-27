import React from 'react';

import { Stack } from 'expo-router';

import TextStyles from '@/constants/TextStyles';

const HomeStack = () => {
    return (
        <Stack
            screenOptions={{
                title: 'My Applications',
                headerTitleAlign: 'center',
                headerTitleStyle: TextStyles.bold5,
                headerShadowVisible: true,
                presentation: 'modal',
            }}>
            <Stack.Screen name="index" />
        </Stack>
    );
};

export default HomeStack;
