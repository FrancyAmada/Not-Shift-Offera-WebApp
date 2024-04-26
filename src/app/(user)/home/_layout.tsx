import React from 'react';

import { Stack } from 'expo-router';

import HomeHeader from '@/components/HomeHeader';

const HomeStack = () => {
    return (
        <Stack screenOptions={{ header: () => <HomeHeader /> }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="profile" />
        </Stack>
    );
};

export default HomeStack;
