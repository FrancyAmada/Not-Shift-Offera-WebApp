import React from 'react';
import { View } from 'react-native';

import { Stack } from 'expo-router';

import TextStyles from '@/constants/TextStyles';

import IconButton from '@/components/IconButton';
import Colors from '@/constants/Colors';
import HeaderStyle from '@/constants/HeaderStyle';

const PostsStack = () => {
    return (
        <Stack
            screenOptions={{
                title: 'My Posts',
                ...{
                    ...HeaderStyle,
                },
                headerLeft: () => {
                    return <View style={{ paddingRight: 16 }}></View>;
                },
                headerRight: () => {
                    return (
                        <View>
                            <IconButton
                                icon="profile-fill"
                                color={Colors.white}
                                route="/(user)/home/profile"
                                strokeWidth={0}
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
