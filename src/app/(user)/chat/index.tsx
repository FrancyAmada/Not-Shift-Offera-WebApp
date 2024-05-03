import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native'

import Colors from '@/constants/Colors'
import ChatItem from '@/components/ChatItem'
import { useAuth } from '@/providers/AuthProvider'
import { useGetChatUsers } from '@/api/chats'
import { useRouter } from 'expo-router'
import { FIREBASE_AUTH } from 'firebaseConfig'
import { usePostContext } from '@/providers/PostProvider'
import { UserProfile } from '@/types'

const ChatListScreen = () => {
  console.log('CHAT')

  const router = useRouter()
  const user = FIREBASE_AUTH.currentUser
  const { newPostChanges } = usePostContext()
  const { fetchChatUsers, chatUsers, loading, error } = useGetChatUsers()

  useEffect(() => {
    if (user) {
      fetchChatUsers(user.uid)
    }
  }, [newPostChanges])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={Colors.blue} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chatUsers}
        renderItem={({ item, index }) => <ChatItem user={item as UserProfile} index={index} router={router} />}
        contentContainerStyle={{ gap: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  conversationContainer: {
    flex: 1,
    paddingHorizontal: 8,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
})

export default ChatListScreen
