import React, { useEffect } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'

import { FIREBASE_AUTH, FIRESTORE_DB } from 'firebaseConfig'
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
  const { newPostAdded, setNewPostAdded } = usePostContext()

  useEffect(() => {
    fetchPosts()
  }, [newPostAdded])

  useEffect(() => {
    if (newPostAdded) {
      setNewPostAdded(false)
    }
  }, [newPostAdded, setNewPostAdded])

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>My Tasks</Text>
        <FlatList
          alwaysBounceVertical={true}
          showsVerticalScrollIndicator={false}
          data={posts.filter(post => post.type === 'Task' && post.authorId === userId)}
          renderItem={({ item }) => <PostItem post={item} fromTasksPage={true} />}
          contentContainerStyle={{ gap: 16 }}
          ItemSeparatorComponent={() => <Separator style={{ marginTop: 16 }} />}
        />
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
    alignContent: 'center',
    justifyContent: 'center',
    padding: 16,
  },
})

export default myPosts
