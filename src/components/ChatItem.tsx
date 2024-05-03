import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { UserProfile } from '@/types'
import Colors from '@/constants/Colors'
import TextStyles from '@/constants/TextStyles'
const defaultUserImage = require('@assets/images/default-user.png')

type ChatItemProps = {
  user: UserProfile
  router: any
  index: Number
}

const ChatItem = ({ user, index, router }: ChatItemProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push(`/chat/${user}`)}>
      <View style={styles.imgContainer}>
        <Image source={user.profileImg || defaultUserImage} style={styles.userIng} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.username}>{user.fullName}</Text>
        <View style={styles.lastMessage}>
          <Text style={styles.lastMessage}>Last message goes here</Text>
          <Text style={styles.lastMessage}>Time</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGrey,
    paddingBottom: 8,
    gap: 16,
  },
  imgContainer: {
    borderRadius: 24,
  },
  userIng: {
    width: 54,
    height: 54,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },
  username: {
    ...TextStyles.medium3,
    color: Colors.black,
  },
  lastMessage: {
    ...TextStyles.regular2,
    flexDirection: 'row',
    color: Colors.placeholder,
    justifyContent: 'space-between',
  },
})

export default ChatItem
