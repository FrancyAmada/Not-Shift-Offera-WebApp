import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Link } from 'expo-router'

import Colors from '@/constants/Colors'
import TextStyles from '@/constants/TextStyles'
import UserTag from './UserTag'
import { Post } from '@/types'
import { getTimeAgo } from '@/utils/timeAgo'
import { FIREBASE_AUTH } from 'firebaseConfig'

import { useUserProfile } from '@/api/posts'
import IconButton from './IconButton'

const defaultImage = require('@assets/images/default-user.png')

type ApplicantProps = { userId: string }

const Applicant = ({ userId }: ApplicantProps) => {
  const { userProfile, userProfileLoading } = useUserProfile(userId)
  const [userFullName, setUserFullName] = useState(userProfile.fullName)
  const [userProfilePic, setUserProfilePic] = useState(userProfile.profileImg)
  const [selecting, setSelecting] = useState(false)

  useEffect(() => {
    setUserFullName(userProfile.fullName)
    setUserProfilePic(userProfile.profileImg)
  }, [userProfile])

  if (userProfileLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size='large' color={Colors.blue} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={userProfilePic ? { uri: userProfilePic } : defaultImage} style={styles.image}></Image>
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name}>{userFullName.split(' ')[0]}</Text>
      </View>
      <View style={styles.chatContainer}>
        <IconButton icon='chat-fill' size={48}></IconButton>
      </View>
    </View>
  )
}

export default Applicant

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderColor: Colors.lightGrey,
    borderWidth: 1,
    maxHeight: '100%',
  },
  loadingIndicator: {
    height: 64,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    padding: 6,
  },
  image: {
    width: 64,
    height: 64,
    borderColor: Colors.blue,
    borderWidth: 3,
    borderRadius: 32,
  },
  nameContainer: {
    paddingRight: '5%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '70%',
    maxWidth: '70%',
    maxHeight: '100%',
  },
  name: {
    ...TextStyles.bold3,
  },
  chatContainer: {
    maxHeight: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
