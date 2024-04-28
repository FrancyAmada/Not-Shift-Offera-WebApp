import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { posts } from '@assets/data/posts';

import Colors from '@/constants/Colors';

import PostItem from '@/components/PostItem';
import Separator from '@/components/Separator';
import ListHeader from '@/components/ListHeader';

const HomeScreen = () => {
    console.log('HOME');

    return (
        <View style={styles.container}>
            <View style={styles.servicesSection}></View>
            <FlatList
                alwaysBounceVertical={true}
                showsVerticalScrollIndicator={false}
                data={posts.filter(post => post.type === 'task')}
                renderItem={({ item }) => <PostItem post={item} />}
                contentContainerStyle={{ gap: 16 }}
                ListHeaderComponent={() => (
                    <View style={{ gap: 16 }}>
                        <View style={{ gap: 8 }}>
                            <ListHeader
                                title={'Featured Services'}
                                onPress={() => console.log('VIEW ALL')}
                            />
                            <FlatList
                                style={{ flex: 1 }}
                                horizontal
                                data={posts.filter(
                                    post => post.type === 'service',
                                )}
                                renderItem={({ item }) => (
                                    <PostItem post={item} variant="portrait" />
                                )}
                                contentContainerStyle={{
                                    maxWidth: '120%',
                                    gap: 16,
                                }}
                            />
                        </View>
                        <ListHeader
                            title={'Tasks'}
                            onPress={() => console.log('VIEW ALL')}
                            style={{ top: 8 }}
                        />
                    </View>
                )}
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
    servicesSection: {
        flex: 1,
    },
});

export default HomeScreen;
