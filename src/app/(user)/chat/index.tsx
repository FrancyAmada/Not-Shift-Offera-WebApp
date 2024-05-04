import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native'

import Colors from '@/constants/Colors'
import ChatItem from '@/components/ChatItem'
import { useAuth } from '@/providers/AuthProvider'
import { useGetChatUsers } from '@/api/chats'
import { Stack, useRouter } from 'expo-router'
import { FIREBASE_AUTH } from 'firebaseConfig'
import { usePostContext } from '@/providers/PostProvider'
import { UserProfile } from '@/types'

const ChatListScreen = () => {
  console.log('CHAT')

  const router = useRouter()
  const user = FIREBASE_AUTH.currentUser
  const { newPostChanges } = usePostContext()
  const { fetchChatUsers, chatUsers, loading, error } = useGetChatUsers()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    })
  }

  useEffect(() => {
    if (user) {
      fetchChatUsers(user.uid)
    }
  }, [newPostChanges, refreshing])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={Colors.blue} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true }} />
      <FlatList
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        data={chatUsers}
        renderItem={({ item }) => <ChatItem user={item as UserProfile} router={router} chatId={item.chatId} />}
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
