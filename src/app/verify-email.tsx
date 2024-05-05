import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '@/providers/AuthProvider'
import TextStyles from '@/constants/TextStyles'
import Colors from '@/constants/Colors'
import { Stack, useRouter, useSegments } from 'expo-router'
import HeaderStyle from '@/constants/HeaderStyle'
import BackButton from '@/components/BackButton'
import Button from '@/components/Button'
import { FIREBASE_AUTH } from 'firebaseConfig'

const verifyEmailScreen = () => {
  const { isAuthenticated } = useAuth()
  const user = FIREBASE_AUTH.currentUser
  const segments = useSegments()
  const router = useRouter()

  const checkEmailVerification = async () => {
    try {
      await user?.reload()
      if (user?.emailVerified) {
        router.replace('/(user)/home')
      } else {
        console.log('Email not verified')
      }
    } catch (error) {
      console.log('Error verifying email', error)
    }
  }

  useEffect(() => {
    if (typeof isAuthenticated == 'undefined') return

    const inApp = segments[0] == '(app)'

    if (isAuthenticated && !inApp) {
      router.replace('/(user)/home')
    }
  }, [isAuthenticated])

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: '',
          ...{ ...HeaderStyle, headerShadowVisible: false },
          headerLeft: () => {
            return <BackButton router={router} color={Colors.blue} />
          },
        }}
      />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Verify your Email</Text>
          <Text style={styles.body}>We have sent an email to {user?.email}. Please verify your email address.</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button text='I have verified my email' onPress={checkEmailVerification} style={styles.button} />
      </View>
    </View>
  )
}

export default verifyEmailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textContainer: {
    gap: 16,
  },
  title: {
    ...TextStyles.bold7,
    color: Colors.blue,
    textAlign: 'left',
  },
  body: {
    ...TextStyles.medium2,
    color: Colors.placeholder,
    textAlign: 'justify',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 24,
  },
  button: {
    borderRadius: 8,
    width: '100%',
  },
})
