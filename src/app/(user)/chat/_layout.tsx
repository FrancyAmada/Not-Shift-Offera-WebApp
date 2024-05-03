import React from 'react'
import { View } from 'react-native'

import { Stack } from 'expo-router'

import HeaderStyle from '@/constants/HeaderStyle'

import IconButton from '@/components/IconButton'
import Colors from '@/constants/Colors'

const ChatStack = () => {
  return (
    <Stack
      screenOptions={{
        title: 'Chats',
        ...{ ...HeaderStyle },
        headerLeft: () => {
          return <View style={{ paddingRight: 16 }}></View>
        },
        headerRight: () => {
          return (
            <View>
              <IconButton icon='profile-fill' color={Colors.blue} route='/(user)/home/profile' strokeWidth={0} />
            </View>
          )
        },
      }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='[id]' />
    </Stack>
  )
}

export default ChatStack
