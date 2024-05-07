import { StyleSheet, Text, View, Image, ImageStyle, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'

import TextStyles from '@/constants/TextStyles'

import { Post } from '@/types'

import { useUserProfile } from '@/api/posts'
import Colors from '@/constants/Colors'

const defaultUserImage = require('@assets/images/default-user.png')

type UserTagProps = {
  post: Post
  textStyle?: ViewStyle
  maxWidth?: number
  style?: ViewStyle
  showCreatedAt?: boolean
  timeAgo?: string
  userImgStyle?: ImageStyle & ViewStyle
}

const UserTag: React.FC<UserTagProps> = ({
  post,
  textStyle = { ...TextStyles.regular1 },
  style = styles.userTag,
  userImgStyle,
  maxWidth = 120,
  showCreatedAt = true,
  timeAgo,
}: UserTagProps) => {
  const { fetchUser, userProfile, userProfileLoading } = useUserProfile()
  const [userProfilePic, setUserProfilePic] = useState(userProfile.profileImg)

  useEffect(() => {
    fetchUser(post.authorId)
  }, [])

  useEffect(() => {
    setUserProfilePic(userProfile.profileImg)
  }, [userProfile])

  if (userProfileLoading) {
    return (
      <View style={style}>
        <View style={[styles.skeletonImage, styles.skeleton]} />
        <View style={[styles.skeletonText, { width: maxWidth - 32 }, styles.skeleton]} />
      </View>
    )
  }

  return (
    <View style={style}>
      <Image source={userProfilePic ? { uri: userProfilePic } : defaultUserImage} style={styles.userImage} />

      <Text
        style={{
          ...textStyle,
          minWidth: maxWidth - 100,
          maxWidth: maxWidth,
          flexShrink: 0,
        }}
        numberOfLines={1}>
        {userProfile.fullName}
      </Text>

      {showCreatedAt && (
        <>
          <Text
            style={{
              ...textStyle,
            }}>
            •
          </Text>
          <Text
            style={{
              ...textStyle,
              flexShrink: 0,
              flex: 1,
            }}>
            {timeAgo}
          </Text>
        </>
      )}
    </View>
  )
}

export default UserTag

const styles = StyleSheet.create({
  userTag: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
  },
  userImage: {
    width: 16,
    height: 16,
    maxWidth: '100%',
    maxHeight: '100%',
    borderColor: Colors.grey,
    borderRadius: 8,
    backgroundColor: Colors.lightGrey,
  },
  skeleton: {
    backgroundColor: Colors.lightGrey,
  },
  skeletonImage: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  skeletonText: {
    height: 16,
    borderRadius: 16,
  },
})
