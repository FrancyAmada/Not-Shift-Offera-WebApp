import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native'
import MultipleSwitch from 'react-native-multiple-switch'

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
  const { newPostChanges, setNewPostChanges } = usePostContext()
  const [type, setType] = useState('Task')

  useEffect(() => {
    if (newPostChanges) {
      setNewPostChanges(false)
    }
    fetchPosts()
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
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            data={posts.filter(post => post.type === type && post.authorId === userId)}
            renderItem={({ item }) => <PostItem post={item} fromMyPostsPage={true} />}
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
