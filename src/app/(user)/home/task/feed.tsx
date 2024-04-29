import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { Stack, useRouter } from 'expo-router';

import { posts } from '@assets/data/posts';

import Colors from '@/constants/Colors';

import PostItem from '@/components/PostItem';
import Separator from '@/components/Separator';
import HeaderStyle from '@/constants/HeaderStyle';
import BackButton from '@/components/BackButton';

const TaskFeed = () => {
    const router = useRouter();
    console.log('TASK FEED');

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Tasks',
                    ...{ ...HeaderStyle },
                    headerLeft: () => {
                        return (
                            <BackButton router={router} color={Colors.blue} />
                        );
                    },
                }}
            />
            <FlatList
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                data={posts.filter(post => post.type === 'task')}
                renderItem={({ item }) => <PostItem post={item} />}
                contentContainerStyle={{ gap: 16 }}
                ItemSeparatorComponent={() => (
                    <Separator style={{ marginTop: 16 }} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        padding: 16,
        paddingVertical: 8,
    },
});

export default TaskFeed;
