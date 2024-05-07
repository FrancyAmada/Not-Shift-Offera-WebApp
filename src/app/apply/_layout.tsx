import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ApplyScreen = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='[postId]' />
    </Stack>
  )
}

export default ApplyScreen

const styles = StyleSheet.create({})
