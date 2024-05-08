import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native'
import { useRouter } from 'expo-router'

import Colors from '@/constants/Colors'
import TextStyles from '@/constants/TextStyles'
import IconButton from './IconButton'
import { useAcceptApplicant, useRemoveApplicant, useUserProfile } from '@/api/posts'
import { useAddChat } from '@/api/chats'
import Button from './Button'

const defaultImage = require('@assets/images/default-user.png')

type ApplicantProps = {
  postId: string
  userId: string
}

const Applicant = ({ userId, postId }: ApplicantProps) => {
  const { fetchUser, userProfile, userProfileLoading, error } = useUserProfile()
  const [userFullName, setUserFullName] = useState(userProfile.fullName)
  const [userProfilePic, setUserProfilePic] = useState(userProfile.profileImg)
  const { addChat } = useAddChat()
  const { acceptApplicant } = useAcceptApplicant()
  const { removeApplicant } = useRemoveApplicant()
  const router = useRouter()

  useEffect(() => {
    fetchUser(userId)
  }, [])

  const handleAcceptApplicant = async () => {
    const response = await acceptApplicant(postId, userId)
    if (response.success) {
      Alert.alert('Success', 'Applicant has been accepted.')
      router.back()
    } else {
      Alert.alert('Error', response.message)
    }
  }

  const handleRemoveApplicant = async () => {
    const response = await removeApplicant(postId, userId)
    if (response.success) {
      Alert.alert('Success', 'Applicant has been removed.')
      router.back()
    } else {
      Alert.alert('Error', response.message)
    }
  }

  useEffect(() => {
    const loadProfile = async () => {
      await fetchUser(userId)
    }

    loadProfile()
  }, [userId])

  useEffect(() => {
    if (userProfile) {
      setUserFullName(userProfile.fullName || 'Unknown User')
      setUserProfilePic(userProfile.profileImg || '')
    }
  }, [userProfile])

  useEffect(() => {
    if (error) {
      Alert.alert('Error', 'Failed to load user profile.')
    }
  }, [error])

  const handleOpenChat = async () => {
    try {
      const { chatId } = await addChat(userId)
      router.navigate(`/chat/${chatId}`)
    } catch (err) {
      Alert.alert('Error', 'Error loading chat.')
    }
  }

  if (userProfileLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color={Colors.blue} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={userProfilePic ? { uri: userProfilePic } : defaultImage} style={styles.image} />
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {userFullName}
        </Text>
      </View>

      <View style={styles.buttonsContainer}>
        <IconButton icon='chat-fill' size={36} onPress={handleOpenChat} />
        <IconButton icon='check-outline' onPress={handleAcceptApplicant} color={Colors.green} style={{ top: 5 }} />
        <IconButton icon='x-outline' onPress={handleRemoveApplicant} color={Colors.red} style={{ top: 5 }} />
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
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 10,
    alignItems: 'center',
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: 15,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 32,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    ...TextStyles.medium3,
    color: Colors.placeholder,
  },
  buttonsContainer: {
    justifyContent: 'space-evenly',
    gap: 16,
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 8,
  },
})
