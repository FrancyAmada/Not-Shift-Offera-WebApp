import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageSourcePropType,
} from 'react-native';

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

import Colors from '@/constants/Colors';
import HeaderStyle from '@/constants/HeaderStyle';

import BackButton from '@/components/BackButton';
import IconButton from '@/components/IconButton';

import { posts } from '@assets/data/posts';

const PostDetails = () => {
    const router = useRouter();

    const { id } = useLocalSearchParams();

    const post = posts.find(post => post.id.toString() === id);

    if (!post) {
        return (
            <View style={styles.container}>
                <Text>Post not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerTransparent: true,
                    headerBlurEffect: 'light',
                    headerTitle: 'Details',
                    ...{ ...HeaderStyle },
                    headerLeft: () => {
                        return (
                            <BackButton router={router} color={Colors.blue} />
                        );
                    },
                    headerRight: () => {
                        return <IconButton icon="add-circle-fill" />;
                    },
                }}
            />
            <View>
                <Image
                    source={post.image as ImageSourcePropType}
                    style={styles.image}
                />
            </View>
        </View>
    );
};

export default PostDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.white,
        padding: 16,
    },
    image: {
        resizeMode: 'cover',
        height: 250,
    },
});
