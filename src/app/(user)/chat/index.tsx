import React, { useEffect, useMemo, useState } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native'
import Colors from '@/constants/Colors'
import ChatItem from '@/components/ChatItem'
import { useAddChat, useGetContacts } from '@/api/chats'
import { Stack, useRouter } from 'expo-router'
import { FIREBASE_AUTH } from 'firebaseConfig'
import TextStyles from '@/constants/TextStyles'
import { useChat } from '@/providers/ChatProvider'
import { usePostContext } from '@/providers/PostProvider'

const ChatListScreen = () => {
  const router = useRouter()
  const { fetchContacts, contacts, loading: contactsLoading, error: contactsError } = useGetContacts()
  const { chatMetadata, fetchChatMetadata } = useChat()
  const { addChat } = useAddChat()
  const { newPostChanges } = usePostContext()
  const user = FIREBASE_AUTH.currentUser

  const getLastMessageTimestamp = (userId: string): number => {
    const chatId = Object.keys(chatMetadata).find(id => chatMetadata[id].participants.includes(userId))
    return chatId ? chatMetadata[chatId].lastMessageTimestamp?.getTime() || 0 : 0
  }

  const sortedContacts = useMemo(() => {
    return [...contacts].sort((a, b) => {
      const timestampA = getLastMessageTimestamp(a.userId)
      const timestampB = getLastMessageTimestamp(b.userId)
      return timestampB - timestampA
    })
  }, [contacts, chatMetadata])

  useEffect(() => {
    if (user) {
      fetchContacts(user.uid)
      fetchChatMetadata(user.uid)
    }
  }, [user?.uid, newPostChanges])

  const handleChatPress = async (selectedUserId: string) => {
    try {
      const { chatId, error } = await addChat(selectedUserId)
      if (error) {
        console.error('Error creating chat:', error)
      }
      router.push(`/chat/${chatId}`)
    } catch (err: any) {
      console.error('Error handling chat press:', err.message)
    }
  }

  if (contactsLoading) {
    return (
      <View style={{ backgroundColor: Colors.white, justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size='large' color={Colors.blue} />
      </View>
    )
  }

  const error = contactsError

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Chats', headerShown: true }} />
      {error ? (
        <Text style={[TextStyles.medium2, { color: Colors.red }]}>Error: {error}</Text>
      ) : (
        <FlatList
          data={sortedContacts}
          keyExtractor={item => item.userId}
          renderItem={({ item }) => {
            const chatId = Object.keys(chatMetadata).find(id => chatMetadata[id].participants.includes(item.userId))
            const lastMessage = chatId ? chatMetadata[chatId].lastMessage : ''
            const lastMessageTimestamp = chatId ? chatMetadata[chatId].lastMessageTimestamp : null

            return (
              <ChatItem
                user={{ ...item, lastMessage, lastMessageTimestamp }}
                onPress={() => handleChatPress(item.userId)}
              />
            )
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
})

export default ChatListScreen
