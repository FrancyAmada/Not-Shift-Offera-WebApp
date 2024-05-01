import React, { useEffect } from 'react'
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native'

import { Stack, useRouter } from 'expo-router'

import Colors from '@/constants/Colors'
import HeaderStyle from '@/constants/HeaderStyle'

import PostItem from '@/components/PostItem'
import Separator from '@/components/Separator'
import BackButton from '@/components/BackButton'

import { usePosts } from '@/api/posts'

import { usePostContext } from '@/providers/PostProvider'

const ServiceFeed = () => {
  const router = useRouter()
  const { fetchPosts, posts, loading } = usePosts()
  const { newPostAdded, setNewPostAdded } = usePostContext()

  useEffect(() => {
    fetchPosts()
  }, [newPostAdded])

  useEffect(() => {
    if (newPostAdded) {
      setNewPostAdded(false)
    }
  }, [newPostAdded, setNewPostAdded])

  if (loading) {
    return (
      <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
        <Stack.Screen options={{ headerShown: false }} />
        <ActivityIndicator size='large' color={Colors.blue} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Services',
          ...{ ...HeaderStyle },
          headerLeft: () => {
            return <BackButton router={router} color={Colors.blue} />
          },
        }}
      />
      <FlatList
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        data={posts.filter(post => post.type === 'Service')}
        renderItem={({ item }) => <PostItem post={item} fromMyPostsPage={false} />}
        contentContainerStyle={{ gap: 16 }}
        ItemSeparatorComponent={() => <Separator style={{ marginTop: 16 }} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    paddingVertical: 8,
  },
})

export default ServiceFeed
