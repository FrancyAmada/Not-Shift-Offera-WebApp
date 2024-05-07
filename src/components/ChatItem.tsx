import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { UserProfile } from '@/types'
import Colors from '@/constants/Colors'
import TextStyles from '@/constants/TextStyles'
import { format } from 'date-fns'

const defaultUserImage = require('@assets/images/default-user.png')

type ChatItemProps = {
  user: UserProfile & { lastMessage?: string; lastMessageTimestamp?: Date }
  onPress: () => void
}

const ChatItem = ({ user, onPress }: ChatItemProps) => {
  const formattedTime = user.lastMessageTimestamp ? format(user.lastMessageTimestamp, 'MMM d, yyyy h:mm a') : ''

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imgContainer}>
        <Image source={user.profileImg ? { uri: user.profileImg } : defaultUserImage} style={styles.userImg} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{user.fullName}</Text>
        <View style={styles.lastMessageContainer}>
          <Text style={styles.lastMessage} numberOfLines={1} ellipsizeMode='clip'>
            {user.lastMessage || 'No messages yet'}
          </Text>
          <Text style={styles.timestamp}>{formattedTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingVertical: 16,
  },
  imgContainer: {
    marginRight: 12,
  },
  userImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  contentContainer: {
    flex: 1,
  },
  lastMessageContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    gap: 8,
  },
  username: {
    ...TextStyles.medium3,
    color: Colors.black,
  },
  timestamp: {
    ...TextStyles.regular2,
    color: Colors.placeholder,
  },
  lastMessage: {
    maxWidth: '50%',
    ...TextStyles.regular2,
    color: Colors.placeholder,
  },
})

export default ChatItem
