import React from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { posts } from '@assets/data/posts';

import Colors from '@/constants/Colors';
import TextStyles from '@/constants/TextStyles';

import PostItem from '@/components/PostItem';
import Separator from '@/components/Separator';
import Button from '@/components/Button';
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
                                numColumns={2}
                                data={posts.filter(
                                    post => post.type === 'service',
                                )}
                                renderItem={({ item }) => (
                                    <PostItem post={item} variant="portrait" />
                                )}
                                columnWrapperStyle={{ gap: 8 }}
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
