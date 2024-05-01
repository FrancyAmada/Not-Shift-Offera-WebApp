import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView, Alert } from 'react-native'

import { useAuth, changePassword } from '@/providers/AuthProvider'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { FIREBASE_AUTH, FIRESTORE_DB } from 'firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'

import Colors from '@/constants/Colors'
import TextStyles from '@/constants/TextStyles'

import Button from '@/components/Button'
import InputField from '@/components/InputField'

import { useUserProfile } from '@/api/posts'

const FULL_NAME_REGEX = /^[ \t]*[a-zA-Z]+(?:[ '-][a-zA-Z]+)+[ \t]*$/
const defaultUserImage = require('@assets/images/default-user.png')

const ProfileScreen = () => {
  console.log('PROFILE')

  const userId = FIREBASE_AUTH.currentUser?.uid || ''
  const { userProfile, userProfileLoading } = useUserProfile(userId)
  const [userFullName, setUserFullName] = useState(userProfile.fullName)
  const [changeNameLoading, setChangeNameLoading] = useState(false)
  const [changePasswordLoading, setChangePasswordLoading] = useState(false)

  const { control, handleSubmit } = useForm()

  const authChangeName = async (data: { fullName: string }) => {
    setChangeNameLoading(true)
    const docRef = doc(FIRESTORE_DB, 'users', userId)
    await updateDoc(docRef, { fullName: data.fullName })
      .then(() => {
        Alert.alert('Change Name Success', 'Successfully updated your Full Name!', [{ text: 'OK' }])
      })
      .catch(err => {
        console.log(err)
      })
    setChangeNameLoading(false)
    setUserFullName(data.fullName)
  }

  const authChangePassword = async () => {
    setChangePasswordLoading(true)
    const response = await changePassword(userProfile.email)
    if (response.success) {
      Alert.alert('Change Password Success', response.msg, [{ text: 'OK' }])
    } else {
      Alert.alert(response.status, response.msg, [{ text: 'OK' }])
    }
    setChangePasswordLoading(false)
  }

  const { logOut } = useAuth()
  const authLogOut = async () => {
    try {
      await logOut()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log('Profile Loaded')
    setUserFullName(userProfile.fullName)
  }, [userProfile])

  return (
    <ScrollView style={styles.avoid} showsVerticalScrollIndicator={false}>
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
              {userProfile.email}
            </Text>
          </View>
        </View>
        <View style={styles.settings}>
          <Text style={styles.settingsText}>Settings</Text>
          <View style={styles.settingsContent}>
            <View style={styles.settingsContainer}>
              <Text style={styles.settingsContentText}>Change Name</Text>
              <View style={styles.inputContainer}>
                <InputField
                  rules={{
                    required: 'Full name is required',
                    pattern: {
                      value: FULL_NAME_REGEX,
                      message:
                        'Full name must be at least 2 words and contain only letters, spaces, apostrophes, and hyphens',
                    },
                    minLength: {
                      value: 3,
                      message: 'Name must be at least 3 characters',
                    },
                    maxLength: {
                      value: 50,
                      message: 'Name must be at most 50 characters',
                    },
                  }}
                  control={control}
                  name='fullName'
                  placeholder='Full Name'
                  autoCapitalize='words'></InputField>
              </View>
            </View>
            {changeNameLoading ? (
              <ActivityIndicator size='large' color={Colors.blue} />
            ) : (
              <>
                <Button text='Change Name' onPress={handleSubmit(authChangeName as SubmitHandler<FieldValues>)} />
              </>
            )}
            <View style={styles.settingsContainer}>
              <Text style={styles.settingsContentText}>Change Password</Text>
            </View>
            {changePasswordLoading ? (
              <ActivityIndicator size='large' color={Colors.blue} />
            ) : (
              <>
                <Button text='Send Change Password Email' onPress={authChangePassword} />
              </>
            )}
            <Button text='Sign Out' onPress={authLogOut} />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  avoid: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    height: 300,
    minHeight: 100,
    maxHeight: '25%',
  },
  headerContent: {
    gap: 12,
    padding: 16,
    alignContent: 'center',
    justifyContent: 'center',
    minHeight: '100%',
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
    height: 96,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  settings: {
    alignContent: 'center',
    minHeight: 200,
    maxHeight: '60%',
    padding: 16,
  },
  settingsText: {
    ...TextStyles.bold6,
  },
  settingsContent: {
    padding: 16,
    gap: 16,
  },
  settingsContentText: {
    ...TextStyles.bold4,
  },
  settingsContainer: {
    gap: 3,
  },
  inputContainer: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginTop: 5,
  },
})
