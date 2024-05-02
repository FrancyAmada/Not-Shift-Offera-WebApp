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

const SearchScreen = () => {
  console.log('SEARCH')

  const userId = FIREBASE_AUTH.currentUser?.uid || ''
  const { fetchPosts, posts, loading, error } = usePosts()
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

  // console.log(posts)

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
        <Text style={{ ...TextStyles.bold3, color: Colors.lightGrey }}>Results for {searchingFor}</Text>
        {loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size='large' color={Colors.blue} />
          </View>
        ) : (
          <FlatList
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
    borderColor: Colors.grey,
    borderWidth: 1,
    padding: 4,
  },
  searchInput: {
    ...TextStyles.bold4,
    padding: 8,
    paddingLeft: 16,
    width: '80%',
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
