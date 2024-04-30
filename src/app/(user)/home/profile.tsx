import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import { useAuth } from '@/providers/AuthProvider'

import Colors from '@/constants/Colors'

import Button from '@/components/Button'
import TextStyles from '@/constants/TextStyles'
import { err } from 'react-native-svg'
import style from 'react-native-multiple-switch/style'

const defaultUserImage = require('@assets/images/default-user.png')

const ProfileScreen = () => {
  const { logOut } = useAuth()
  const authLogOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }
  const userData = useAuth()
  var userFullName = 'Full Name'
  var userEmail = 'Email'
  //   console.log(useAuth())
  try {
    if (userData.user != null) {
      userFullName = userData.user.fullName
      userEmail = userData.user.email
    }
  } catch (error) {
    console.log(error)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image source={defaultUserImage} style={styles.userImage} />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.name} numberOfLines={1}>
            {userFullName}
          </Text>
          <Text style={styles.email} numberOfLines={1}>
            {userEmail}
          </Text>
        </View>
      </View>
      <View style={styles.settingsContent}>
        <Text style={styles.settings}>Settings</Text>
      </View>
      <Button text='Sign Out' onPress={authLogOut} />
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    height: 300,
    maxHeight: '25%',
  },
  headerContent: {
    gap: 12,
    padding: 16,
    alignContent: 'center',
    justifyContent: 'center',
  },
  name: {
    ...TextStyles.bold6,
    color: Colors.white,
  },
  email: {
    ...TextStyles.bold4,
    color: Colors.white,
  },
  userImage: {
    width: 96,
    maxWidth: '100%',
    height: '61%',
  },
  settingsContent: {
    alignContent: 'center',
    height: '60%',
    padding: 16,
  },
  settings: {
    ...TextStyles.bold6,
  },
})
