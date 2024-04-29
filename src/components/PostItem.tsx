import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import Colors from '@/constants/Colors';
import TextStyles from '@/constants/TextStyles';

const defaultImage = require('@assets/images/default-img.png');

import { Post } from '@/types';
import { Link } from 'expo-router';
import UserTag from './UserTag';

type PostItemProps = {
    post: Post;
    variant?: 'landscape' | 'portrait';
};

const PostItem = ({ post, variant }: PostItemProps) => {
    const isPortrait = variant === 'portrait';

    const containerStyle = isPortrait
        ? styles.containerPortrait
        : styles.container;

    const imageStyle = isPortrait ? styles.imagePortrait : styles.image;

    return (
        <Link href={`/home/${post.type}/${post.id}`} asChild>
            <TouchableOpacity style={containerStyle}>
                <Image source={post.image || defaultImage} style={imageStyle} />
                <View style={styles.textContainer}>
                    {isPortrait && (
                        <View style={styles.header}>
                            <Text
                                style={{
                                    ...TextStyles.medium2,
                                    flexDirection: 'row',
                                }}
                                numberOfLines={1}>
                                {post.title}
                            </Text>
                            <UserTag
                                post={post}
                                userImgStyle={styles.userImage}
                            />
                        </View>
                    )}

                    {!isPortrait && (
                        <View style={styles.header}>
                            <UserTag
                                post={post}
                                userImgStyle={styles.userImage}
                            />
                            <Text
                                style={{
                                    ...TextStyles.medium2,
                                    flexDirection: 'row',
                                }}
                                numberOfLines={1}>
                                {post.title}
                            </Text>
                        </View>
                    )}

                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <Text
                            numberOfLines={2}
                            style={
                                isPortrait
                                    ? {
                                          ...TextStyles.cardDescription,
                                          paddingTop: 2,
                                      }
                                    : TextStyles.cardDescription
                            }>
                            {post.description}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default PostItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
    },
    containerPortrait: {
        flexBasis: '50%',
        flexDirection: 'column',
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderColor: Colors.lightGrey,
        borderWidth: 1,
    },
    image: {
        resizeMode: 'cover',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        width: 120,
        height: 100,
    },
    imagePortrait: {
        resizeMode: 'cover',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        width: 'auto',
        height: 100,
    },
    textContainer: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 8,
    },
    header: {
        gap: 8,
    },
    userTag: {
        flex: 1,
        flexDirection: 'row',
        gap: 8,
    },
    userImage: {
        width: 16,
        height: 16,
    },
});
