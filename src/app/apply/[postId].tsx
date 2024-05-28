import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useRouter, useLocalSearchParams } from 'expo-router'

import { FIREBASE_AUTH, FIRESTORE_DB } from 'firebaseConfig'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

import Colors from '@/constants/Colors'
import TextStyles from '@/constants/TextStyles'
import { IconStyle } from '@/constants/Icons'
import { usePostContext } from '@/providers/PostProvider'

import BackButton from '@/components/BackButton'
import Button from '@/components/Button'

import { getTimeAgo } from '@/utils/timeAgo'

import { usePost, useUserProfile } from '@/api/posts'
import { useAddChat } from '@/api/chats'

const defaultUserImage = require('@assets/images/default-user.png')

const ApplyScreen = () => {
  const { newPostChanges, setNewPostChanges } = usePostContext()
  const router = useRouter()
  const { postId } = useLocalSearchParams()
  const id = typeof postId === 'string' ? postId : ''
  const { post } = usePost(id)
  const { fetchUser, userProfile, userProfileLoading } = useUserProfile()
  const [timeAgo, setTimeAgo] = useState('...')
  const { addChat } = useAddChat()
  const [applyLoading, setApplyLoading] = useState(false)

  useEffect(() => {
    if (post) {
      fetchUser(post.authorId)
    }
  }, [post])

  const authApply = async () => {
    if (!post) {
      return
    }

    setApplyLoading(true)
    const docRef = doc(FIRESTORE_DB, 'posts', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userId = FIREBASE_AUTH.currentUser?.uid || ''
      const docData = docSnap.data()
      let currentApplicants: Array<string> = docData.applicants
      if (currentApplicants.includes(userId)) {
        Alert.alert('Already Applied!', 'You have already applied for this post!', [
          { text: 'OK', onPress: () => router.back() },
        ])
        setNewPostChanges(true)
      } else {
        currentApplicants.push(userId)
        await updateDoc(docRef, { applicants: currentApplicants })
          .then(() => {
            Alert.alert(
              'Application Successful!',
              'Successfully Applied to the post, please wait for the author to reply.',
              [{ text: 'OK', onPress: () => router.back() }],
            )
            addChat(post?.authorId)
            setNewPostChanges(true)
          })
          .catch(err => {
            console.log(err)
          })
      }
    } else {
      Alert.alert('Error', 'Post does not exist...', [{ text: 'OK', onPress: () => router.back() }])
    }
    setApplyLoading(false)
  }

  useEffect(() => {
    if (post) {
      setTimeAgo(getTimeAgo(post.createdAt))
    }
  }, [post])

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View
            style={{
              backgroundColor: Colors.blue,
              ...IconStyle.fill,
              alignItems: 'flex-start',
            }}>
            <BackButton icon='chevron-left-fill' router={router} color={Colors.white} />
          </View>
        </View>
        <View style={styles.userImageContainer}>
          <Image source={defaultUserImage} style={styles.userImage} />
        </View>
        <View style={styles.userProfileContainer}>
          <Text style={styles.userName}>{userProfile.fullName}</Text>
        </View>
        <View style={styles.postDetailsContainer}>
          <Text style={styles.postTitle}>{post?.title}</Text>
          <Text style={styles.postTime}>Posted {timeAgo} ago</Text>
          <Text style={styles.postRate}>Rate: ₱{post?.rate}</Text>
        </View>
        <View style={styles.buttonsContainer}>
          {applyLoading ? (
            <ActivityIndicator size='large' color={Colors.blue} />
          ) : (
            <Button text={'Confirm'} onPress={authApply}></Button>
          )}
        </View>
      </View>
    </View>
  )
}

export default ApplyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainContainer: {
    padding: 32,
    backgroundColor: Colors.white,
    height: '90%',
    borderRadius: 16,
  },
  header: {
    margin: -32,
    paddingLeft: 16,
    paddingTop: 16,
  },
  userImage: {
    width: 160,
    height: 160,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  userImageContainer: {
    marginLeft: 16,
    padding: 48,
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  userName: {
    ...TextStyles.bold5,
    padding: 6,
    color: Colors.white,
  },
  userProfileContainer: {
    backgroundColor: Colors.blue,
    width: '100%',
    borderRadius: 16,
    padding: 8,
  },
  postDetailsContainer: {
    gap: 8,
    marginTop: 16,
    minHeight: '45%',
    maxHeight: '45%',
  },
  postTitle: {
    ...TextStyles.bold6,
    color: Colors.black,
  },
  postTime: {
    ...TextStyles.bold3,
    color: Colors.black,
  },
  postRate: {
    ...TextStyles.bold4,
    color: Colors.black,
  },
  buttonsContainer: {
    gap: 16,
    marginTop: -64,
  },
})
