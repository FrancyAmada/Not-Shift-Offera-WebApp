import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

const myApplications = () => {
    return (
        <View style={{ backgroundColor: Colors.white, flex: 1 }}>
            <Stack.Screen
                options={{ headerShown: true, headerShadowVisible: true }}
            />
        </View>
    );
};

export default myApplications;
