import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router'

import Colors from '@/constants/Colors'
import TextStyles from '@/constants/TextStyles'
import UserTag from './UserTag'
import { Post } from '@/types'
import { getTimeAgo } from '@/utils/timeAgo'
import { FIREBASE_AUTH } from 'firebaseConfig'

const defaultImage = require('@assets/images/default-img.png')

type PostItemProps = {
  post: Post
  variant?: 'landscape' | 'portrait'
}

const PostItem = ({ post, variant }: PostItemProps) => {
  const isPortrait = variant === 'portrait'
  const containerStyle = isPortrait ? styles.containerPortrait : styles.container
  const imageStyle = isPortrait ? styles.imagePortrait : styles.image

  const userId = FIREBASE_AUTH.currentUser?.uid

  if (!userId) {
    return null
  }

  const timeAgo = getTimeAgo(post.createdAt)
  const isUserPost = post.authorId === userId
  const isAppliedTo = post.applicants.includes(userId)

  // console.log(isAppliedTo, userId, post.applicants, post.title)

  return (
    <Link
      href={
        isAppliedTo
          ? `/my-applications/${post.postId}`
          : isUserPost
            ? `/my-posts/${post.postId}`
            : `/home/${post.type.toLowerCase()}/${post.postId}`
      }
      asChild>
      <TouchableOpacity style={containerStyle}>
        <Image source={post.imageList[0] ? { uri: post.imageList[0] } : defaultImage} style={imageStyle} />
        <View style={styles.textContainer}>
          <View style={styles.header}>
            {isPortrait ? (
              <>
                <Text style={{ ...TextStyles.medium2, flex: 1 }} numberOfLines={1}>
                  {post.title}
                </Text>
                <UserTag post={post} userImgStyle={styles.userImage} showCreatedAt={true} maxWidth={200} />
              </>
            ) : (
              <>
                <UserTag post={post} userImgStyle={styles.userImage} timeAgo={timeAgo} />
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
