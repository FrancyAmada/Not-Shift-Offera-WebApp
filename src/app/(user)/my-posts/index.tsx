import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import MultipleSwitch from 'react-native-multiple-switch'

import { FIREBASE_AUTH } from 'firebaseConfig'
import Colors from '@/constants/Colors'
import PostItem from '@/components/PostItem'
import Separator from '@/components/Separator'
import TextStyles from '@/constants/TextStyles'

import { usePosts } from '@/api/posts'
import { usePostContext } from '@/providers/PostProvider'

const myPosts = () => {
  console.log('MY POSTS')

  const userId = FIREBASE_AUTH.currentUser?.uid || ''
  const { fetchPosts, posts, loading, error } = usePosts()
  const { newPostChanges, setNewPostChanges } = usePostContext()
  const [type, setType] = useState('Task')
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  useEffect(() => {
    if (newPostChanges) {
      setNewPostChanges(false)
    }
    fetchPosts(type, userId, false)
    // console.log('error', error)
  }, [newPostChanges, type])

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <MultipleSwitch
          items={['Task', 'Service']}
          value={type}
          onChange={setType}
          textStyle={{
            color: Colors.blue,
            ...TextStyles.bold4,
          }}
          activeTextStyle={{
            color: Colors.white,
            ...TextStyles.bold4,
          }}
          sliderStyle={{
            backgroundColor: Colors.blue,
            margin: -2,
            borderRadius: 8,
            height: 50,
          }}
          containerStyle={styles.switchContainer}
        />
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color={Colors.blue} />
          </View>
        ) : (
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            data={posts}
            renderItem={({ item }) => <PostItem post={item} />}
            contentContainerStyle={{ gap: 16 }}
            ItemSeparatorComponent={() => <Separator style={{ marginTop: 16 }} />}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  headerRightContainer: {
    flex: 1,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  switchContainer: {
    height: 50,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.blue,
    borderRadius: 8,
    padding: 0,
    margin: 0,
  },
  titleText: {
    ...TextStyles.bold6,
    color: Colors.black,
    marginBottom: 16,
  },
  taskContainer: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
})

export default myPosts
