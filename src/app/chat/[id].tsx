import { StyleSheet, Text, View, FlatList, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useUserProfile } from '@/api/posts'
import { useGetChatMessages, useSendMessage } from '@/api/chats'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { FIREBASE_AUTH } from 'firebaseConfig'
import IconButton from '@/components/IconButton'
import Colors from '@/constants/Colors'
import TextStyles from '@/constants/TextStyles'
import HeaderStyle from '@/constants/HeaderStyle'
import BackButton from '@/components/BackButton'
import ChatSkeleton from '@/components/ChatSkeleton'
import { useChat } from '@/providers/ChatProvider'

const ChatScreen = () => {
  const { id } = useLocalSearchParams()
  const [message, setMessage] = useState('')
  const chatId = typeof id === 'string' ? id : ''
  const currentUserId = FIREBASE_AUTH.currentUser?.uid || ''
  const { fetchMessages, messages, loading: loadingMessages } = useGetChatMessages()
  const { fetchUser, userProfile } = useUserProfile()
  const { sendMessage } = useSendMessage()
  const flatListRef = useRef<FlatList>(null)
  const router = useRouter()
  const { chatMetadata, updateChatMetadata } = useChat()

  useEffect(() => {
    if (chatId) {
      const unsubscribeMessages = fetchMessages(chatId) // Fetch messages for the chat

      if (chatMetadata[chatId]) {
        const participants = chatMetadata[chatId].participants
        const contactId = participants.find((id: string) => id !== currentUserId)
        fetchUser(contactId as string)
      }

      return () => {
        unsubscribeMessages()
      }
    }
  }, [chatId, chatMetadata])

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ animated: true, offset: 0 })
  }, [messages])

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      await sendMessage(chatId, message)
      setMessage('')

      // Update chat metadata with the new last message
      updateChatMetadata(chatId, {
        lastMessage: message,
        lastMessageTimestamp: new Date(),
      })
    }
  }

  const renderMessage = ({ item }: any) => (
    <View
      style={[styles.messageContainer, item.senderId === FIREBASE_AUTH.currentUser?.uid && styles.currentUserMessage]}>
      <Text style={[styles.messageText, item.senderId === FIREBASE_AUTH.currentUser?.uid && styles.userMessageText]}>
        {item.text}
      </Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: userProfile.fullName.split(' ')[0] || 'Chat',
          ...HeaderStyle,
          headerLeft: () => <BackButton router={router} color={Colors.blue} />,
        }}
      />
      {loadingMessages ? (
        <ChatSkeleton />
      ) : (
        <>
          <FlatList
            ref={flatListRef}
            data={messages.slice().reverse()}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messagesContainer}
            inverted
          />

          <View style={styles.inputContainer}>
            <TextInput style={styles.input} placeholder='Type a message...' value={message} onChangeText={setMessage} />
            <IconButton
              icon='send-fill'
              color={Colors.white}
              onPress={handleSendMessage}
              style={styles.sendButton}
              size={24}
            />
          </View>
        </>
      )}
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 4,
  },
  messageContainer: {
    maxWidth: '70%',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.lightGrey,
    alignSelf: 'flex-start',
  },
  currentUserMessage: {
    maxWidth: '70%',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.blue,
    alignSelf: 'flex-end',
  },
  userMessageText: {
    ...TextStyles.regular2,
    color: Colors.white,
  },
  messageText: {
    ...TextStyles.regular2,
    color: Colors.black,
  },
  inputContainer: {
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey,
    gap: 8,
  },
  input: {
    paddingLeft: 16,
    ...TextStyles.medium2,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.blue,
    backgroundColor: Colors.white,
    borderRadius: 24,
    paddingVertical: 8,
  },
  sendButton: {
    padding: 8,
    backgroundColor: Colors.blue,
    borderRadius: 8,
  },
})
