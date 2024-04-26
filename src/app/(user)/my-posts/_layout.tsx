import React from 'react';

import { Stack } from 'expo-router';

const HomeStack = () => {
    return (
        <Stack screenOptions={{ title: 'My Posts' }}>
            <Stack.Screen name="index" />
        </Stack>
    );
};

export default HomeStack;
