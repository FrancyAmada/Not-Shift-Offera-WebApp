import React from 'react';

import { Stack } from 'expo-router';

import TextStyles from '@/constants/TextStyles';
import { View } from 'react-native';
import IconButton from '@/components/IconButton';
import Colors from '@/constants/Colors';
import HeaderStyle from '@/constants/HeaderStyle';

const ApplicationsStack = () => {
    return (
        <Stack
            screenOptions={{
                title: 'My Applications',
                ...{ ...HeaderStyle },
                headerLeft: () => {
                    return <View style={{ paddingRight: 16 }}></View>;
                },
                headerRight: () => {
                    return (
                        <View>
                            <IconButton
                                icon="profile-fill"
                                color={Colors.blue}
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

export default ApplicationsStack;
