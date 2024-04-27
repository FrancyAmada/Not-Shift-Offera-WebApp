import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Tabs } from 'expo-router';

import Colors from '@/constants/Colors';
import TextStyles from '@/constants/TextStyles';

import Icon from '@/components/Icon';

type IconName = React.ComponentProps<typeof Icon>['name'];

const HomeLayout = () => {
    return (
        <Tabs
            initialRouteName="home"
            backBehavior="history"
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.blue,
                tabBarStyle: styles.navBar,
                tabBarLabelStyle: TextStyles.bold1,
                tabBarIcon: ({ focused }) => {
                    let iconName: IconName = 'add-circle-outline';
                    switch (route.name) {
                        case 'home':
                            iconName = 'home-outline';
                            iconName = focused ? 'home-fill' : 'home-outline';
                            break;
                        case 'my-applications':
                            iconName = 'file-outline';
                            iconName = focused ? 'file-fill' : 'file-outline';
                            break;

                        case 'my-posts':
                            iconName = 'clipboard-outline';
                            iconName = focused
                                ? 'clipboard-fill'
                                : 'clipboard-outline';
                            break;
                        case 'chat':
                            iconName = 'chat-outline';
                            iconName = focused ? 'chat-fill' : 'chat-outline';
                            break;
                    }
                    return (
                        <Icon
                            name={iconName}
                            size={32}
                            color={focused ? Colors.blue : Colors.blue}
                            stroke={focused ? Colors.blue : Colors.blue}
                            strokeWidth={0.5}
                        />
                    );
                },
            })}>
            <Tabs.Screen name="home" options={{ tabBarLabel: 'Home' }} />
            <Tabs.Screen
                name="my-applications"
                options={{ tabBarLabel: 'My Applications' }}
            />
            <Tabs.Screen
                name="add-post"
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={styles.actionButton}>
                                <Icon
                                    name="add-circle-fill"
                                    size={70}
                                    color={focused ? Colors.blue : Colors.blue}
                                />
                            </View>
                        );
                    },
                }}
                // listeners={() => {
                //     return {
                //         tabPress: e => {
                //             e.preventDefault();
                //             router.push('/(user)/add-post');
                //         },
                //     };
                // }}
            />
            <Tabs.Screen
                name="my-posts"
                options={{ tabBarLabel: 'My Posts' }}
            />
            <Tabs.Screen name="chat" options={{ tabBarLabel: 'Chat' }} />
        </Tabs>
    );
};

const styles = StyleSheet.create({
    navBar: {
        height: 72,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderColor: Colors.lightGrey,
        paddingHorizontal: 8,
        paddingBottom: 4,
    },
    actionButton: {
        width: '100%',
        flexBasis: '100%',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: Colors.white,
        marginBottom: '80%',
        elevation: 3,
    },
    headerRightContainer: {
        flex: 1,
        paddingHorizontal: 16,
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        alignSelf: 'stretch',
    },
});

export default HomeLayout;
