import React, { useEffect, useState } from 'react'

import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'

import { Stack, useRouter } from 'expo-router'

import { FIREBASE_AUTH } from 'firebaseConfig'

import IconButton from '@/components/IconButton'
import Colors from '@/constants/Colors'
import HeaderStyle from '@/constants/HeaderStyle'

import { useUserProfile } from '@/api/posts'

const defaultUserImage = require('@assets/images/default-user.png')

const ChatStack = () => {
  const router = useRouter()

  const userId = FIREBASE_AUTH.currentUser?.uid || ''
  const { userProfile, userProfileLoading } = useUserProfile(userId)
  const [userProfilePic, setUserProfilePic] = useState(userProfile.profileImg)

  const goToProfile = async () => {
    router.navigate('/(user)/home/profile')
  }

  useEffect(() => {
    setUserProfilePic(userProfile.profileImg)
  }, [userProfile])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        title: 'Chats',
        ...{ ...HeaderStyle },
        headerLeft: () => {
          return <View style={{ paddingRight: 16 }}></View>
        },
        headerRight: () => {
          return (
            <View>
              <TouchableOpacity onPress={goToProfile}>
                <Image
                  source={userProfilePic ? { uri: userProfilePic } : defaultUserImage}
                  style={styles.userImage}></Image>
              </TouchableOpacity>
            </View>
          )
        },
      }}>
      <Stack.Screen name='index' />
    </Stack>
  )
}

export default ChatStack

const styles = StyleSheet.create({
  userImage: {
    height: 40,
    width: 40,
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 32,
    borderColor: Colors.blue,
    borderWidth: 1,
  },
})
