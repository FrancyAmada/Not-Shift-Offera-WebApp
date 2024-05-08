import React, { useCallback, useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator, RefreshControl, Text, TextInput } from 'react-native'
import MultipleSwitch from 'react-native-multiple-switch'

import { FIREBASE_AUTH } from 'firebaseConfig'

import Colors from '@/constants/Colors'
import TextStyles from '@/constants/TextStyles'

import { usePosts } from '@/api/posts'
import { usePostContext } from '@/providers/PostProvider'

import Icon from '@/components/Icon'
import IconButton from '@/components/IconButton'
import Separator from '@/components/Separator'
import PostItem from '@/components/PostItem'
import { Post } from '@/types'
import { dummyPosts } from '@/utils/dummyPosts'
import SkeletonPost from '@/components/SkeletonPost'

const SearchScreen = () => {
  console.log('SEARCH')

  const userId = FIREBASE_AUTH.currentUser?.uid || ''
  const { fetchPosts, posts, loading } = usePosts()
  const { newPostChanges, setNewPostChanges } = usePostContext()
  const [type, setType] = useState('Task')
  const [refreshing, setRefreshing] = useState(false)
  const [searchingFor, setSearchingFor] = useState('')
  const [postsShown, setPostsShown] = useState(posts)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    })
  }, [])

  const filterBySearchingFor = () => {
    if (searchingFor != '') {
      let postsToShow: Array<Post> = []
      for (let post of posts) {
        if (post.title.toLocaleLowerCase().includes(searchingFor.toLocaleLowerCase())) {
          postsToShow.push(post)
        }
      }
      setPostsShown(postsToShow)
    } else {
      setPostsShown(posts)
    }
  }

  useEffect(() => {
    if (newPostChanges) {
      setNewPostChanges(false)
    }
    fetchPosts(type, userId, false, true)
    // console.log('error', error)
  }, [newPostChanges, type, refreshing])

  const onClear = () => {
    setSearchingFor('')
  }

  useEffect(() => {
    filterBySearchingFor()
  }, [searchingFor, type, posts])

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <View style={styles.searchIcon}>
            <Icon name='search-fill' color={Colors.grey}></Icon>
          </View>
          <TextInput
            value={searchingFor}
            style={styles.searchInput}
            placeholder='What are you looking for?'
            placeholderTextColor={Colors.grey}
            onChangeText={setSearchingFor}></TextInput>
          <View style={styles.searchIcon}>
            <IconButton icon='eraser-fill' color={Colors.grey} onPress={onClear}></IconButton>
          </View>
        </View>
        <View style={styles.searchSeparator}></View>
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
      </View>
      <View style={styles.contentContainer}>
        <Text style={{ ...TextStyles.bold3, color: Colors.placeholder }}>Results for {searchingFor}</Text>
        {loading ? (
          <FlatList
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            data={dummyPosts}
            renderItem={({ item }) => <SkeletonPost post={item} />}
            contentContainerStyle={{ gap: 16 }}
            ItemSeparatorComponent={() => <Separator style={{ marginTop: 16 }} />}
          />
        ) : (
          <FlatList
            keyExtractor={item => item.postId}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            alwaysBounceVertical={true}
            showsVerticalScrollIndicator={false}
            data={postsShown}
            renderItem={({ item }) => <PostItem post={item} />}
            contentContainerStyle={{ gap: 16 }}
            ItemSeparatorComponent={() => <Separator style={{ marginTop: 16 }} />}
          />
        )}
      </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchHeader: {
    padding: 8,
    gap: 8,
    margin: 4,
    backgroundColor: Colors.white,
  },
  searchContainer: {
    borderRadius: 16,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.grey,
    borderWidth: 1,
    padding: 8,
  },
  searchInput: {
    ...TextStyles.bold4,
    padding: 8,
    paddingLeft: 8,
  },
  searchIcon: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: 6,
    marginTop: 4,
  },
  searchSeparator: {
    height: 1,
    backgroundColor: Colors.lightGrey,
  },
  contentContainer: {
    flex: 1,
    marginTop: -16,
    padding: 16,
    gap: 16,
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
})
