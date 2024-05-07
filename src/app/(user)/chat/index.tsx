import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native'
import Colors from '@/constants/Colors'
import ChatItem from '@/components/ChatItem'
import { useAddChat, useGetContacts, useGetChatMetadata } from '@/api/chats'
import { Stack, useRouter } from 'expo-router'
import { FIREBASE_AUTH } from 'firebaseConfig'
import TextStyles from '@/constants/TextStyles'

const ChatListScreen = () => {
  const router = useRouter()
  const [refreshing, setRefreshing] = useState(false)
  const { fetchContacts, contacts, loading: contactsLoading, error: contactsError } = useGetContacts()
  const {
    fetchChatMetadata,
    chatMetadata,
    loading: chatMetadataLoading,
    error: chatMetadataError,
  } = useGetChatMetadata()
  const { addChat } = useAddChat()
  const user = FIREBASE_AUTH.currentUser

  useEffect(() => {
    if (user) {
      const unsubscribeContacts = fetchContacts(user.uid)
      const unsubscribeChatMetadata = fetchChatMetadata(user.uid)

      return () => {
        unsubscribeContacts()
        unsubscribeChatMetadata()
      }
    }
  }, [user])

  const handleChatPress = async (selectedUserId: string) => {
    try {
      const { chatId, error } = await addChat(selectedUserId)
      if (error) {
        console.error('Error creating chat:', error)
        return
      }
      router.push(`/chat/${chatId}`)
    } catch (err: any) {
      console.error('Error handling chat press:', err.message)
    }
  }

  if (contactsLoading || chatMetadataLoading) {
    return (
      <View style={{ backgroundColor: Colors.white, justifyContent: 'center', flex: 1 }}>
        <ActivityIndicator size='large' color={Colors.blue} />
      </View>
    )
  }

  const error = contactsError || chatMetadataError

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Chats', headerShown: true }} />
      {error ? (
        <Text style={[TextStyles.medium2, { color: Colors.red }]}>Error: {error}</Text>
      ) : (
        <FlatList
          data={contacts}
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
