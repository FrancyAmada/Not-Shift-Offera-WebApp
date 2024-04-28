import React from 'react';

import { Stack, useRouter } from 'expo-router';

import TextStyles from '@/constants/TextStyles';
import IconButton from '@/components/IconButton';
import { View } from 'react-native';

import Colors from '@/constants/Colors';
import HeaderStyle from '@/constants/HeaderStyle';

const AddPostStack = () => {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                title: 'Add Post',
                ...{ ...HeaderStyle },
                headerLeft: () => {
                    return <View style={{ paddingRight: 16 }}></View>;
                },
                headerRight: () => {
                    return (
                        <IconButton
                            icon="profile-fill"
                            color={Colors.blue}
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