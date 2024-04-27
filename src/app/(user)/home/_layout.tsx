import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

import { useForm } from 'react-hook-form';

import { Link, Stack, router } from 'expo-router';

import TextStyles from '@/constants/TextStyles';
import Colors from '@/constants/Colors';

import InputField from '@/components/InputField';
import IconButton from '@/components/IconButton';

const HomeStack = () => {
    const { control } = useForm();

    return (
        <Stack initialRouteName="index">
            <Stack.Screen
                name="index"
                options={{
                    headerTitle: 'offera',
                    headerTitleStyle: TextStyles.bold7,
                    headerTintColor: Colors.blue,
                    headerRight: () => (
                        <View style={styles.actionRow}>
                            <Link href="/(user)/home/search" asChild>
                                <TouchableOpacity
                                    style={styles.searchButtonContainer}>
                                    <InputField
                                        name="search"
                                        placeholder="Search"
                                        control={control}
                                        style={styles.searchButton}
                                        withIcon={true}
                                        icon="search-fill"
                                        editable={false}
                                    />
                                </TouchableOpacity>
                            </Link>
                            <IconButton
                                icon="profile-fill"
                                route="/(user)/home/profile"
                            />
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerTitleStyle: TextStyles.bold6,
                    headerShadowVisible: true,
                    headerLeft: () => {
                        return (
                            <View style={{ paddingRight: 16 }}>
                                <IconButton
                                    icon="chevron-left"
                                    onPress={() => router.back()}
                                />
                            </View>
                        );
                    },
                }}
            />
            <Stack.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerTitleStyle: TextStyles.bold6,
                    headerShadowVisible: true,
                    headerLeft: () => {
                        return (
                            <View style={{ paddingRight: 16 }}>
                                <IconButton
                                    icon="chevron-left"
                                    onPress={() => router.back()}
                                />
                            </View>
                        );
                    },
                }}
            />
        </Stack>
    );
};

export default HomeStack;

const styles = StyleSheet.create({
    actionRow: {
        flex: 0.6,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 16,
    },
    searchButtonContainer: {
        width: '100%',
    },
    searchButton: {
        height: 40,
        borderRadius: 50,
        elevation: 2,
        shadowRadius: 8,
        shadowOpacity: 0.1,
        backgroundColor: Colors.white,
    },
});
