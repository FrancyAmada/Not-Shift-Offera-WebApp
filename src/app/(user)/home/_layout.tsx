import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';

import { useForm } from 'react-hook-form';

import { Link, Stack } from 'expo-router';

import TextStyles from '@/constants/TextStyles';
import Colors from '@/constants/Colors';

import InputField from '@/components/InputField';
import Icon from '@/components/Icon';

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
                            <Link href="/(user)/home/profile" asChild>
                                <TouchableOpacity>
                                    <Icon
                                        name={'profile-outline'}
                                        color={Colors.blue}
                                    />
                                </TouchableOpacity>
                            </Link>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerTitleAlign: 'center',
                    headerTitleStyle: TextStyles.bold5,
                    headerShadowVisible: true,
                }}
            />
            <Stack.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerTitleAlign: 'center',
                    headerTitleStyle: TextStyles.bold5,
                    headerShadowVisible: true,
                }}
            />
        </Stack>
    );
};

export default HomeStack;

const styles = StyleSheet.create({
    actionRow: {
        flex: 0.608,
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
        backgroundColor: Colors.white,
    },
});
