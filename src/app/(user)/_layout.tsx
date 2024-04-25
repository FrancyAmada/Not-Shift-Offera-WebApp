import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

import { Stack, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from '@expo/vector-icons/Ionicons';

import Colors from '@/constants/Colors';
import TextStyles from '@/constants/TextStyles';

type IconName = React.ComponentProps<typeof Icon>['name'];

const HomeLayout = () => {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName: IconName = 'caret-down-circle-outline';
                    switch (route.name) {
                        case 'home':
                            iconName = 'home-outline';
                            // iconName = focused ? 'home-sharp' : 'home-outline';
                            break;
                        case 'my-applications':
                            iconName = 'reader-outline';
                            // iconName = 'document-text-outline';
                            // iconName = 'receipt-outline';
                            // iconName = focused
                            //     ? 'document-text'
                            //     : 'document-text-outline';
                            break;

                        // case 'add-post':
                        //     iconName = 'add-circle-outline';
                        //     // iconName = focused ? 'add-circle' : 'add-circle-outline';
                        // break;

                        case 'my-posts':
                            iconName = 'newspaper-outline';
                            // iconName = focused ? 'newspaper' : 'newspaper-outline';
                            break;
                        case 'chat':
                            iconName = 'chatbubble-ellipses-outline';
                            // iconName = focused
                            //     ? 'chatbubble-ellipses'
                            //     : 'chatbubble-ellipses-outline';
                            break;
                    }
                    return (
                        <Ionicons
                            name={iconName}
                            size={32}
                            color={focused ? Colors.blue : Colors.black}
                        />
                    );
                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.blue,
                tabBarStyle: styles.navBar,
                tabBarLabelStyle: TextStyles.bold1,
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
                                <Ionicons
                                    name="add-circle"
                                    size={75}
                                    color={focused ? Colors.blue : Colors.blue}
                                />
                            </View>
                        );
                    },
                }}
                listeners={({ navigation }) => {
                    return {
                        tabPress: e => {
                            e.preventDefault();
                            navigation.navigate('add-post');
                        },
                    };
                }}
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
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    actionButton: {
        width: '120%',
        flexBasis: '130%',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: Colors.white,
        marginBottom: '80%',
        elevation: 4,
    },
});

export default HomeLayout;
