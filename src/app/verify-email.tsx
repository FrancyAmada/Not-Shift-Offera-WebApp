import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/providers/AuthProvider'
import TextStyles from '@/constants/TextStyles'
import Colors from '@/constants/Colors'
import { Stack, useRouter } from 'expo-router'
import HeaderStyle from '@/constants/HeaderStyle'
import BackButton from '@/components/BackButton'

const verifyEmailScreen = () => {
  const router = useRouter()
  const { user } = useAuth()

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
      <Text style={styles.title}>Verify your email address</Text>
      <Text style={styles.body}> We have sent an email to {user?.email}. Please verify your email address.</Text>
    </View>
  )
}

export default verifyEmailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 24,
    gap: 16,
    flexWrap: 'wrap',
  },
  title: {
    ...TextStyles.bold7,
    color: Colors.blue,
    textAlign: 'left',
  },
  body: {
    width: '80%',
    ...TextStyles.medium2,
    color: Colors.placeholder,
    textAlign: 'justify',
  },
})
