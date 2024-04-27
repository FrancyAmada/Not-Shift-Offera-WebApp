import React from 'react';

import { Stack, useRouter } from 'expo-router';

import TextStyles from '@/constants/TextStyles';
import IconButton from '@/components/IconButton';
import { View } from 'react-native';

const AddPostStack = () => {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                title: 'Add Post',
                headerTitleStyle: TextStyles.bold6,
                headerShadowVisible: true,
                headerLeft: () => {
                    return (
                        <View style={{ paddingRight: 16 }}>
                            {/* <IconButton
                                icon="chevron-left"
                                onPress={() => router.back()}
                            /> */}
                        </View>
                    );
                },
                headerRight: () => {
                    return (
                        <View>
                            <IconButton
                                icon="profile-fill"
                                route="/(user)/home/profile"
                            />
                        </View>
                    );
                },
            }}>
            <Stack.Screen name="index" />
        </Stack>
    );
};

export default AddPostStack;
