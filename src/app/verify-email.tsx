import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/providers/AuthProvider'
import TextStyles from '@/constants/TextStyles'
import Colors from '@/constants/Colors'

const verifyEmailScreen = () => {
  const { user } = useAuth()
  console.log(user)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify your email address</Text>
      <Text style={styles.body}>
        {' '}
        We have sent an email to {user?.email}. Please verify your email address to continue.
      </Text>
    </View>
  )
}

export default verifyEmailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    ...TextStyles.bold7,
    color: Colors.blue,
    textAlign: 'left',
  },
  body: {
    ...TextStyles.medium3,
    color: Colors.placeholder,
    textAlign: 'left',
  },
})
