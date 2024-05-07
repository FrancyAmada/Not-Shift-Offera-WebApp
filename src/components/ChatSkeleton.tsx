import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import Colors from '@/constants/Colors'
import IconButton from './IconButton'
import TextStyles from '@/constants/TextStyles'

const ChatSkeleton = () => {
  const skeletonMessages = Array.from({ length: 6 }, (_, index) => index)

  return (
    <View style={styles.container}>
      <View style={styles.messagesContainer}>
        {skeletonMessages.map((_, index) => (
          <View
            key={index}
            style={[styles.skeletonMessage, index % 2 === 0 ? styles.currentUserMessage : styles.otherUserMessage]}
          />
        ))}
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder='Type a message...' editable={false} />
        <IconButton icon='send-fill' color={Colors.white} style={styles.sendButton} size={24} />
      </View>
    </View>
  )
}

export default ChatSkeleton

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  skeletonMessage: {
    minHeight: 30,
    minWidth: '60%',
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.lightGrey,
  },
  currentUserMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.lightGrey,
  },
  otherUserMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.lightGrey,
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
