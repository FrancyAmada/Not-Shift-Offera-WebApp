import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, RefreshControl, ActivityIndicator } from 'react-native'

import Colors from '@/constants/Colors'

import PostItem from '@/components/PostItem'
import Separator from '@/components/Separator'
import ListHeader from '@/components/ListHeader'
import { Stack, useRouter } from 'expo-router'
import { usePosts } from '@/api/posts'
import { usePostContext } from '@/providers/PostProvider'
import SkeletonPost from '@/components/SkeletonPost'
import { dummyPosts } from '@/utils/dummyPosts'

const HomeScreen = () => {
  const router = useRouter()
  console.log('HOME')

  const { fetchPosts, posts, loading } = usePosts()
  const { newPostChanges, setNewPostChanges } = usePostContext()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    })
  }, [])

  useEffect(() => {
    if (newPostChanges) {
      setNewPostChanges(false)
    }
    fetchPosts()
  }, [newPostChanges, refreshing])

  if (loading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: true }} />
        <FlatList
          data={dummyPosts}
          renderItem={({ item }) => <SkeletonPost post={item} />}
          contentContainerStyle={{ gap: 16 }}
          ListHeaderComponent={() => (
            <View style={{ gap: 16 }}>
              <View style={{ gap: 8 }}>
                <ListHeader title={'Featured Services'} onPress={() => router.navigate('/home/service/feed')} />
                <FlatList
                  style={{ flex: 1 }}
                  horizontal
                  data={dummyPosts}
                  renderItem={({ item }) => <SkeletonPost post={item} variant='portrait' />}
                  contentContainerStyle={{
                    maxWidth: '150%',
                    gap: 16,
                  }}
                />
              </View>
              <ListHeader title={'Tasks'} onPress={() => router.navigate('/home/task/feed')} style={{ top: 8 }} />
            </View>
          )}
          ItemSeparatorComponent={() => <Separator style={{ marginTop: 16 }} />}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true }} />
      <FlatList
        alwaysBounceVertical={true}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={posts.filter(post => post.type === 'Task')}
        renderItem={({ item }) => <PostItem post={item} />}
        contentContainerStyle={{ gap: 16 }}
        ListHeaderComponent={() => (
          <View style={{ gap: 16 }}>
            <View style={{ gap: 8 }}>
              <ListHeader title={'Featured Services'} onPress={() => router.navigate('/home/service/feed')} />
              <FlatList
                style={{ flex: 1 }}
                horizontal
                data={posts.filter(post => post.type === 'Service')}
                renderItem={({ item }) => <PostItem post={item} variant='portrait' />}
                contentContainerStyle={{
                  maxWidth: '150%',
                  gap: 16,
                }}
              />
            </View>
            <ListHeader title={'Tasks'} onPress={() => router.navigate('/home/task/feed')} style={{ top: 8 }} />
          </View>
        )}
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
    gap: -24,
  },
})

export default HomeScreen
