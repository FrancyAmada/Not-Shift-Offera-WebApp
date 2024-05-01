import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

import Colors from '@/constants/Colors'
import TextStyles from '@/constants/TextStyles'
import UserTag from './UserTag'
import { Post } from '@/types'

const defaultImage = require('@assets/images/default-img.png')

type PostItemProps = {
  post: Post
  variant?: 'landscape' | 'portrait'
  fromTasksPage: boolean
}

const PostItem = ({ post, variant, fromTasksPage = false }: PostItemProps) => {
  const isPortrait = variant === 'portrait'
  const containerStyle = isPortrait ? styles.containerPortrait : styles.container
  const imageStyle = isPortrait ? styles.imagePortrait : styles.image

  console.log('post', post)

  if (fromTasksPage) {
    return (
      <Link href={`/home/my-posts/${post.postId}`} asChild>
        <TouchableOpacity style={containerStyle}>
          <Image source={post.imageList[0] ? { uri: post.imageList[0] } : defaultImage} style={imageStyle} />
          <View style={styles.textContainer}>
            <View style={styles.header}>
              {isPortrait ? (
                <>
                  <Text style={{ ...TextStyles.medium2, flex: 1 }} numberOfLines={1}>
                    {post.title}
                  </Text>
                  <UserTag post={post} userImgStyle={styles.userImage} />
                </>
              ) : (
                <>
                  <UserTag post={post} userImgStyle={styles.userImage} />
                  <Text style={{ ...TextStyles.medium2, flex: 1 }} numberOfLines={1}>
                    {post.title}
                  </Text>
                </>
              )}
            </View>
            <Text
              numberOfLines={2}
              style={isPortrait ? { ...TextStyles.cardDescription, paddingTop: 2 } : TextStyles.cardDescription}>
              {post.description}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    )
  } else {
    return (
      <Link href={`/home/${post.type.toLowerCase()}/${post.postId}`} asChild>
        <TouchableOpacity style={containerStyle}>
          <Image source={post.imageList[0] ? { uri: post.imageList[0] } : defaultImage} style={imageStyle} />
          <View style={styles.textContainer}>
            <View style={styles.header}>
              {isPortrait ? (
                <>
                  <Text style={{ ...TextStyles.medium2, flex: 1 }} numberOfLines={1}>
                    {post.title}
                  </Text>
                  <UserTag post={post} userImgStyle={styles.userImage} />
                </>
              ) : (
                <>
                  <UserTag post={post} userImgStyle={styles.userImage} />
                  <Text style={{ ...TextStyles.medium2, flex: 1 }} numberOfLines={1}>
                    {post.title}
                  </Text>
                </>
              )}
            </View>
            <Text
              numberOfLines={2}
              style={isPortrait ? { ...TextStyles.cardDescription, paddingTop: 2 } : TextStyles.cardDescription}>
              {post.description}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
    )
  }
}

export default PostItem

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
})
