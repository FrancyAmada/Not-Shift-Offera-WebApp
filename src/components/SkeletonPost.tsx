import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

import Colors from '@/constants/Colors'
import UserTag from './UserTag'
import { Post } from '@/types'
import { FIREBASE_AUTH } from 'firebaseConfig'

const defaultImage = require('@assets/images/default-img.png')

type PostItemProps = {
  post: Post
  variant?: 'landscape' | 'portrait'
}

const SkeletonPost = ({ post, variant }: PostItemProps) => {
  const isPortrait = variant === 'portrait'
  const containerStyle = isPortrait ? styles.containerPortrait : styles.container
  const imageStyle = isPortrait ? styles.imagePortrait : styles.image

  const userId = FIREBASE_AUTH.currentUser?.uid

  if (!userId) {
    return null
  }

  // console.log(isAppliedTo, userId, post.applicants, post.title)

  return (
    <TouchableOpacity style={containerStyle}>
      <Image source={defaultImage} style={imageStyle} />
      <View style={styles.textContainer}>
        <View style={styles.header}>
          {isPortrait ? (
            <View>
              <View style={styles.skeletonTitlePort}></View>
              <UserTag post={post} userImgStyle={styles.userImage} maxWidth={200} showCreatedAt />
            </View>
          ) : (
            <View>
              <UserTag post={post} userImgStyle={styles.userImage} timeAgo='' />
              <View style={styles.skeletonTitleLand}></View>
            </View>
          )}
        </View>
        <View style={styles.skeletonDesc}></View>
      </View>
    </TouchableOpacity>
  )
}

export default SkeletonPost

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
  skeletonTitlePort: {
    height: 25,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    borderBottomWidth: 8,
    borderColor: Colors.white,
  },
  skeletonTitleLand: {
    height: 25,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    borderTopWidth: 8,
    borderColor: Colors.white,
  },

  skeletonDesc: {
    backgroundColor: Colors.lightGrey,
    borderTopWidth: 10,
    borderColor: Colors.white,
    height: 20,
    width: '100%',
    borderRadius: 16,
  },
})
