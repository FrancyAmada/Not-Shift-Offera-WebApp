import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '@/constants/Colors'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { IconStyle } from '@/constants/Icons'
import HeaderStyle from '@/constants/HeaderStyle'
import BackButton from '@/components/BackButton'
import IconButton from '@/components/IconButton'
import TextStyles from '@/constants/TextStyles'
import { useGetChatMessages, useSendMessage } from '@/api/chats'
import { FIREBASE_AUTH } from 'firebaseConfig'

const ChatScreen = () => {
  const { id } = useLocalSearchParams()
  const [message, setMessage] = useState('')

  const chatId = typeof id === 'string' ? id : id[0]
  const { messages, loading, error } = useGetChatMessages(chatId)
  console.log(messages)
  const { sendMessage } = useSendMessage()

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      await sendMessage(chatId, message)
      setMessage('')
    }
  }

  const renderMessage = ({ item }: any) => (
    <View
      style={[styles.messageContainer, item.sender === FIREBASE_AUTH.currentUser?.uid && styles.currentUserMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: true }} />
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Type a message...' value={message} onChangeText={setMessage} />
        <IconButton icon='send-fill' color={Colors.white} size={32} onPress={handleSendMessage} />
      </View>
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
    paddingVertical: 12,
  },
  messageContainer: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  currentUserMessage: {
    backgroundColor: Colors.blue,
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    backgroundColor: Colors.blue,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGrey,
    gap: 16,
  },
  input: {
    paddingLeft: 24,
    ...TextStyles.medium2,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.blue,
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 8,
  },
  sendButton: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: Colors.blue,
    borderRadius: 8,
  },
  sendButtonText: {
    color: Colors.white,
  },
})
