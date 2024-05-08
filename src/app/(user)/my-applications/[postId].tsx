import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native'

import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'

import { FIREBASE_AUTH, FIRESTORE_DB } from 'firebaseConfig'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

import Colors from '@/constants/Colors'
import HeaderStyle from '@/constants/HeaderStyle'
import { IconStyle } from '@/constants/Icons'
import TextStyles from '@/constants/TextStyles'

import BackButton from '@/components/BackButton'
import IconButton from '@/components/IconButton'
import Button from '@/components/Button'

import { getTimeAgo } from '@/utils/timeAgo'

import { useGetPost, useUserProfile, useUpdatePost } from '@/api/posts'
import { usePostContext } from '@/providers/PostProvider'

const defaultUserImage = require('@assets/images/default-user.png')
const defaultImage = require('@assets/images/default-img.png')

const PostDetails = () => {
  const router = useRouter()
  const { newPostChanges } = usePostContext()

  const { postId } = useLocalSearchParams()
  const id = typeof postId === 'string' ? postId : postId[0]

  const { fetchPost, post, loading } = useGetPost()
  const { fetchUser, userProfile, userProfileLoading } = useUserProfile()

  const [isCancelling, setIsCancelling] = useState(false)

  const [cancelLoading, setCancelLoading] = useState(false)

  const [userProfilePic, setUserProfilePic] = useState(userProfile.profileImg)

  useEffect(() => {
    if (post) {
      fetchUser(post.authorId)
    }
  }, [post])

  useEffect(() => {
    setUserProfilePic(userProfile.profileImg)
  }, [userProfile])

  useEffect(() => {
    fetchPost(id)
  }, [id, newPostChanges])

  const handleCancelling = () => {
    if (!isCancelling) {
      Alert.alert('Cancel Application?', 'Are you sure you want to cancel your application for this post?', [
        { text: 'OK' },
      ])
    }
    setIsCancelling(!isCancelling)
  }

  const handleCancelApplication = async () => {
    setCancelLoading(true)
    const docRef = doc(FIRESTORE_DB, 'posts', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userId = FIREBASE_AUTH.currentUser?.uid || ''
      const docData = docSnap.data()
      let currentApplicants: Array<string> = docData.applicants
      if (currentApplicants.includes(userId)) {
        await updateDoc(docRef, { applicants: currentApplicants.filter(id => id != userId) })
          .then(() => {
            Alert.alert('Cancelled Application', 'Successfully cancelled application to the post...', [
              { text: 'OK', onPress: () => router.navigate('/(user)/my-applications/') },
            ])
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        Alert.alert('Error!', 'You did not have an application for this post...', [
          { text: 'OK', onPress: () => router.navigate('/(user)/my-applications/') },
        ])
      }
    } else {
      Alert.alert('Error', 'Post does not exist...', [{ text: 'OK', onPress: () => router.navigate('/(user)/home/') }])
    }
    setCancelLoading(false)
  }

  const handleOpenChat = () => {}

  if (loading || userProfileLoading) {
    return (
      <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size='large' color={Colors.blue} />
      </View>
    )
  }

  if (!post) {
    return <Text>Post not found</Text>
  }

  const timeAgo = getTimeAgo(post.createdAt)

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          ...{
            ...HeaderStyle,
            headerShadowVisible: false,
            headerStyle: { backgroundColor: 'transparent' },
          },
          headerLeft: () => {
            return (
              <View
                style={{
                  backgroundColor: Colors.blue,
                  ...IconStyle.fill,
                  alignItems: 'flex-start',
                }}>
                <BackButton icon='chevron-left-fill' router={router} color={Colors.white} route='/my-applications/' />
              </View>
            )
          },
          headerRight: () => {
            return (
              <View
                style={{
                  backgroundColor: Colors.blue,
                  ...IconStyle.fill,
                }}>
                <IconButton icon='more-options' color={Colors.white} strokeWidth={0} />
              </View>
            )
          },
        }}
      />
      <Image source={post.imageList[0] ? { uri: post.imageList[0] } : defaultImage} style={styles.image} />
      <View style={{ flex: 1 }}>
        <View style={styles.textContainer}>
          <View style={styles.userTag}>
            <Image source={userProfilePic ? { uri: userProfilePic } : defaultUserImage} style={styles.userImage} />
            <Text
              style={{
                ...TextStyles.medium2,
                minWidth: 20,
                maxWidth: 200,
                flexShrink: 0,
              }}
              numberOfLines={1}>
              {userProfile?.fullName}
            </Text>
            <Text
              style={{
                ...TextStyles.medium2,
              }}>
              •
            </Text>
            <Text
              style={{
                ...TextStyles.medium2,
                flexShrink: 0,
                flex: 1,
              }}>
              {timeAgo}
            </Text>
          </View>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {post.title}
            </Text>
            <Text style={styles.rate} numberOfLines={2}>
              ₱{post.rate}
            </Text>
            <Text style={styles.location} numberOfLines={2}>
              {userProfile.location != undefined ? userProfile.location : 'No Address'}
            </Text>
          </View>
          <View style={styles.descContainer}>
            <Text style={styles.description}>{post.description}</Text>
          </View>

          {isCancelling ? (
            cancelLoading ? (
              <View style={styles.cancelContainer}>
                <ActivityIndicator size='large' color={Colors.blue} />
              </View>
            ) : (
              <>
                <View style={styles.cancelContainer}>
                  <Button text='Stop Cancel' onPress={handleCancelling}></Button>
                  <Button text='Confirm Cancel' onPress={handleCancelApplication}></Button>
                </View>
              </>
            )
          ) : (
            <>
              <View style={styles.cancelContainer}>
                <Button text='Open Chat' onPress={handleOpenChat}></Button>
                <Button text='Cancel Application' onPress={handleCancelling}></Button>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  )
}

export default PostDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: Colors.white,
    gap: -32,
    // paddingTop: 8,
    // paddingHorizontal: 16,
  },
  image: {
    height: 300,
    width: '100%',
    resizeMode: 'cover',
  },
  textContainer: {
    minWidth: '100%',
    flex: 1,
    gap: 16,
    padding: 16,
    borderRadius: 40,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    backgroundColor: Colors.white,
    elevation: 5,
    borderColor: Colors.placeholder,
  },
  header: {
    gap: 4,
  },
  title: {
    ...TextStyles.bold6,
    margin: 0,
    padding: 0,
    paddingVertical: 0,
    marginVertical: 0,
    textAlignVertical: 'auto',
  },
  rate: {
    ...TextStyles.medium6,
    color: Colors.blue,
  },
  location: {
    ...TextStyles.bold3,
    color: Colors.darkGrey,
  },
  description: {
    textAlign: 'justify',
    ...TextStyles.medium2,
  },
  userTag: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  userImage: {
    alignSelf: 'flex-start',
    width: 24,
    height: 24,
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 24,
    borderColor: Colors.blue,
    borderWidth: 1,
  },
  loadingIndicator: {
    position: 'absolute',
    width: 70,
    height: 70,
    right: 30,
    bottom: 30,
    flexBasis: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: Colors.white,
    elevation: 3,
  },
  descContainer: {
    margin: 0,
    padding: 0,
    paddingVertical: 0,
    paddingHorizontal: 12,
    marginVertical: 0,
    borderWidth: 0,
    marginBottom: '40%',
  },
  cancelContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
    alignItems: 'center',
    gap: 12,
  },
  cancelText: {
    ...TextStyles.bold4,
    color: Colors.red,
  },
})
