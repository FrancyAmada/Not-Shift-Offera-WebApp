import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const apply = () => {
    return (
        <View style={{ backgroundColor: 'transparent' }}>
            <Stack.Screen options={{}} />
            <Text>Apply</Text>
        </View>
    );
};

export default apply;

const styles = StyleSheet.create({});
