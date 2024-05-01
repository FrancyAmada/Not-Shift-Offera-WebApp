import { StyleSheet, Text, View, Image, ImageStyle, ViewStyle } from 'react-native'
import React, { useEffect, useState } from 'react'

import TextStyles from '@/constants/TextStyles'

import { Post } from '@/types'
import { DocumentData } from 'firebase/firestore'

import { useUserProfile } from '@/api/posts'

const defaultUserImage = require('@assets/images/default-user.png')

type UserTagProps = {
  post: Post
  textStyle?: ViewStyle
  maxWidth?: number
  style?: ViewStyle
  showCreatedAt?: boolean
  createdAt?: string
  userImgStyle?: ImageStyle & ViewStyle
}

const UserTag: React.FC<UserTagProps> = ({
  post,
  textStyle = { ...TextStyles.regular1 },
  style = styles.userTag,
  userImgStyle,
  maxWidth = 120,
  showCreatedAt = true,
}: UserTagProps) => {
  const { userProfile, userProfileLoading } = useUserProfile(post?.authorId || '')

  return (
    <View style={style}>
      <Image source={userProfile.profileImg || defaultUserImage} style={(styles.userImage, userImgStyle)} />
      <Text
        style={{
          ...textStyle,
          minWidth: maxWidth - 100,
          maxWidth: maxWidth,
          flexShrink: 0,
        }}
        numberOfLines={1}>
        {userProfile?.fullName}
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
            {post.createdAt}
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
  },
})
