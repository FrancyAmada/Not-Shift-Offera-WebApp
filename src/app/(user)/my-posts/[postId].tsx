import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native'

import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'

import { useForm } from 'react-hook-form'

import Colors from '@/constants/Colors'
import HeaderStyle from '@/constants/HeaderStyle'
import { IconStyle } from '@/constants/Icons'
import TextStyles from '@/constants/TextStyles'

import InputField from '@/components/InputField'
import BackButton from '@/components/BackButton'
import IconButton from '@/components/IconButton'

import Button from '@/components/Button'
import { usePost, useUserProfile, updatePost } from '@/api/posts'

const defaultUserImage = require('@assets/images/default-user.png')
const defaultImage = require('@assets/images/default-img.png')

const PostDetails = () => {
  const router = useRouter()
  const { postId } = useLocalSearchParams()

  const id = typeof postId === 'string' ? postId : postId[0]

  const { control, handleSubmit } = useForm()

  const { post, error, loading } = usePost(id)

  const { userProfile, userProfileLoading } = useUserProfile(post?.authorId || '')

  const [editingPost, setEditingPost] = useState(false)

  const [changesLoading, setChangesLoading] = useState(false)

  const [postTitle, setPostTitle] = useState('Post Title')
  const [postRate, setPostRate] = useState(0)
  const [postDesc, setPostDesc] = useState('Description')

  const setEditPost = async () => {
    setEditingPost(!editingPost)
    clearInputs()
  }

  const editPost = async (data: { title: string; rate: number; description: string }) => {
    setChangesLoading(true)
    const response = await updatePost(data, id)
    setEditingPost(false)
    if (response.success) {
      Alert.alert('Updated Post!', response.msg, [{ text: 'OK' }])
    } else {
      Alert.alert('Error Updating Post.', response.msg, [{ text: 'OK' }])
    }
    clearInputs()
    setChangesLoading(false)
  }

  const clearInputs = () => {
    setPostTitle(post.title)
    setPostRate(post.rate)
    setPostDesc(post.description)
  }

  useEffect(() => {
    if (post) {
      clearInputs()
    }
  }, [post])

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
                <BackButton icon='chevron-left-fill' router={router} color={Colors.white} />
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
            <Image source={defaultUserImage} style={styles.userImage} />
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
              {post.createdAt}
            </Text>
          </View>
          <View style={styles.header}>
            {editingPost ? (
              <>
                <InputField
                  rules={{
                    pattern: {
                      value: /^[a-zA-Z0-9\s]+$/i,
                      message: 'Invalid title',
                    },
                  }}
                  maxLength={64}
                  numberOfLines={4}
                  name='title'
                  placeholder={String(postTitle)}
                  autoGrow={true}
                  style={styles.titleContainer}
                  inputStyle={styles.titleInput}
                  control={control}
                />
              </>
            ) : (
              <Text style={styles.title} numberOfLines={2}>
                {postTitle}
              </Text>
            )}
            {editingPost ? (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      ...TextStyles.medium3,
                      color: Colors.blue,
                    }}>
                    ₱
                  </Text>
                  <InputField
                    rules={{
                      pattern: {
                        value: /^[0-9]+(\.[0-9]{1,2})?$/i,
                        message: 'Invalid rate',
                      },
                    }}
                    inputMode='decimal'
                    maxLength={10}
                    numberOfLines={1}
                    name='rate'
                    placeholder={String(postRate)}
                    placeholderTextColor={Colors.blue + '90'}
                    style={styles.rateContainer}
                    inputStyle={styles.rateInput}
                    control={control}
                  />
                </View>
              </>
            ) : (
              <Text style={styles.rate} numberOfLines={2}>
                ₱{postRate}
              </Text>
            )}
          </View>
          {editingPost ? (
            <InputField
              rules={{
                pattern: {
                  value: /^[a-zA-Z0-9\s]+$/i,
                  message: 'Invalid description',
                },
              }}
              maxLength={250}
              numberOfLines={8}
              autoGrow={true}
              name='description'
              placeholder={String(postDesc)}
              style={styles.descContainer}
              inputStyle={styles.descInput}
              control={control}
            />
          ) : (
            <Text style={styles.description}>{postDesc}</Text>
          )}

          {editingPost ? (
            changesLoading ? (
              <ActivityIndicator size={'large'} color={Colors.blue} style={styles.loadingIndicator} />
            ) : (
              <>
                <Button text='Cancel Changes' onPress={setEditPost}></Button>
                <Button
                  text='Apply Changes'
                  onPress={handleSubmit(data => {
                    const postData = {
                      title: data.title,
                      rate: data.rate,
                      description: data.description,
                    }
                    editPost(postData)
                  })}></Button>
              </>
            )
          ) : (
            <Button text='Edit Post' onPress={setEditPost}></Button>
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
  },
  titleContainer: {
    margin: 0,
    padding: 0,
    paddingVertical: 0,
    paddingHorizontal: 4,
    marginVertical: 0,
    borderWidth: 0,
  },
  titleInput: {
    ...TextStyles.bold6,
    margin: 0,
    padding: 0,
    paddingVertical: 0,
    marginVertical: 0,
    textAlignVertical: 'auto',
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
  rateContainer: {
    ...TextStyles.medium6,
    width: '100%',
    alignItems: 'flex-start',
    margin: 0,
    padding: 0,
    paddingVertical: 0,
    paddingHorizontal: 4,
    marginVertical: 0,
    borderWidth: 0,
  },
  rateInput: {
    ...TextStyles.medium3,
    color: Colors.blue,
    margin: 0,
    padding: 0,
    paddingVertical: 0,
    marginVertical: 0,
    textAlignVertical: 'top',
  },
  descContainer: {
    margin: 0,
    padding: 0,
    paddingVertical: 0,
    paddingHorizontal: 4,
    marginVertical: 0,
    borderWidth: 0,
  },
  descInput: {
    ...TextStyles.regular3,
    margin: 0,
    padding: 0,
    paddingVertical: 0,
    marginVertical: 0,
    textAlignVertical: 'top',
  },
})
