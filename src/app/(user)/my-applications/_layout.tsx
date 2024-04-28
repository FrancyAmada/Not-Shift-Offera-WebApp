import React from 'react';

import { Stack } from 'expo-router';

import TextStyles from '@/constants/TextStyles';
import { View } from 'react-native';
import IconButton from '@/components/IconButton';
import Colors from '@/constants/Colors';

const ApplicationsStack = () => {
    return (
        <Stack
            screenOptions={{
                title: 'My Applications',
                headerTitleStyle: TextStyles.bold6,
                // headerStyle: { backgroundColor: Colors.blue },
                // headerTintColor: Colors.white,
                headerStyle: { backgroundColor: Colors.white },
                headerTintColor: Colors.blue,
                headerShadowVisible: true,
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

export default ApplicationsStack;
