import React, { useCallback, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from 'react-native'

import { useAuth, changePassword } from '@/providers/AuthProvider'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import * as ImagePicker from 'expo-image-picker'

import { FIREBASE_AUTH, FIRESTORE_DB } from 'firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FIREBASE_STORAGE } from 'firebaseConfig'

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
  const { fetchUser, userProfile, userProfileLoading } = useUserProfile()
  const [userFullName, setUserFullName] = useState(userProfile.fullName)
  const [userLocation, setUserLocation] = useState(userProfile.location)
  const [userProfilePic, setUserProfilePic] = useState(userProfile.profileImg)
  const [changeNameLoading, setChangeNameLoading] = useState(false)
  const [changeAddressLoading, setChangeAddressLoading] = useState(false)
  const [changePasswordLoading, setChangePasswordLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const { control, handleSubmit } = useForm()

  useEffect(() => {
    fetchUser(userId)
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    })
  }, [])

  const authChangeName = async (data: { fullName: string }) => {
    setChangeNameLoading(true)
    if (data.fullName) {
      const docRef = doc(FIRESTORE_DB, 'users', userId)
      await updateDoc(docRef, { fullName: data.fullName })
        .then(() => {
          Alert.alert('Change Name Success', 'Successfully updated your Full Name!', [{ text: 'OK' }])
        })
        .catch(err => {
          console.log(err)
        })
      setUserFullName(data.fullName)
    }
    setChangeNameLoading(false)
  }

  const authChangeAddress = async (data: { location: string }) => {
    setChangeAddressLoading(true)
    if (data.location) {
      const docRef = doc(FIRESTORE_DB, 'users', userId)
      await updateDoc(docRef, { location: data.location })
        .then(() => {
          Alert.alert('Change Location Success', 'Successfully updated your Location!', [{ text: 'OK' }])
        })
        .catch(err => {
          console.log(err)
        })
      setUserFullName(data.location)
    }
    setChangeAddressLoading(false)
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

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      })

      console.log(result)

      if (!result.canceled) {
        const selectedImageUris = result.assets.map(asset => asset.uri)
        return selectedImageUris[0]
      }
    } catch (error) {
      console.log(error)
    }
    return null
  }

  const authChangeProfilePicture = async () => {
    const image = await pickImage()
    if (image) {
      const docRef = doc(FIRESTORE_DB, 'users', userId)
      console.log('Uploading image: ', image)
      const response = await fetch(image)
      const blob = await response.blob()
      const storageRef = ref(FIREBASE_STORAGE, `profileImages/${userId}/image_profile_${Date.now()}.jpg`)
      await uploadBytes(storageRef, blob)
      const downloadUrl = await getDownloadURL(storageRef)
      await updateDoc(docRef, { profileImg: downloadUrl })
        .then(() => {
          Alert.alert('Changed Profile Picture', 'Successfully updated your profile picture!', [{ text: 'OK' }])
        })
        .catch(err => {
          console.log(err)
        })
      setUserProfilePic(downloadUrl)
    }
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
    setUserProfilePic(userProfile.profileImg)
    setUserFullName(userProfile.fullName)
    setUserLocation(userProfile.location)
  }, [userProfile, refreshing])

  return (
    <ScrollView
      style={styles.avoid}
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={authChangeProfilePicture}>
              <Image source={userProfilePic ? { uri: userProfilePic } : defaultUserImage} style={styles.userImage} />
            </TouchableOpacity>
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.name} numberOfLines={1}>
              {userFullName}
            </Text>
            <Text style={styles.email} numberOfLines={1}>
              {userProfile.email}
            </Text>
            <Text style={styles.location} numberOfLines={2}>
              {userLocation}
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
                  placeholder='Enter New Name'
                  autoCapitalize='words'></InputField>
              </View>
              {changeNameLoading ? (
                <ActivityIndicator size='large' color={Colors.blue} />
              ) : (
                <>
                  <Button
                    style={styles.changeNameButton}
                    text='Change Name'
                    onPress={handleSubmit(authChangeName as SubmitHandler<FieldValues>)}
                  />
                </>
              )}
            </View>

            <View style={styles.settingsContainer}>
              <Text style={styles.settingsContentText}>Change Address</Text>
              <View style={styles.inputContainer}>
                <InputField
                  rules={{
                    minLength: {
                      value: 5,
                      message: 'Address must be at least 5 characters',
                    },
                    maxLength: {
                      value: 60,
                      message: 'Address must be at most 60 characters',
                    },
                  }}
                  control={control}
                  name='location'
                  placeholder='Enter New Address'
                  autoCapitalize='words'></InputField>
              </View>
              {changeAddressLoading ? (
                <ActivityIndicator size='large' color={Colors.blue} />
              ) : (
                <>
                  <Button
                    style={styles.changeNameButton}
                    text='Change Address'
                    onPress={handleSubmit(authChangeAddress as SubmitHandler<FieldValues>)}
                  />
                </>
              )}
            </View>

            <View style={styles.settingsContainer}>
              <Text style={styles.settingsContentText}>Change Password</Text>
              {changePasswordLoading ? (
                <ActivityIndicator size='large' color={Colors.blue} />
              ) : (
                <>
                  <Button
                    style={styles.changeChangePassword}
                    text='Send Change Password Email'
                    onPress={authChangePassword}
                  />
                </>
              )}
            </View>

            <Button style={styles.signOutButton} text='Sign Out' onPress={authLogOut} />
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
    backgroundColor: Colors.white,
  },
  avoid: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    backgroundColor: Colors.blue,
    flexDirection: 'row',
    height: 180,
    minHeight: 120,
    maxHeight: '25%',
  },
  headerContent: {
    gap: 13,
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
  location: {
    ...TextStyles.bold3,
    color: Colors.white,
  },
  userImage: {
    width: 96,
    height: 96,
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 96,
    borderColor: Colors.black,
    borderWidth: 2,
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
    padding: 4,
    gap: 10,
  },
  settingsContentText: {
    ...TextStyles.bold4,
    marginBottom: 10,
  },
  settingsContainer: {
    gap: 3,
    padding: 12,
    backgroundColor: Colors.lightGrey,
    borderRadius: 16,
    borderColor: Colors.grey,
    borderWidth: 3,
  },
  inputContainer: {
    marginBottom: 5,
    borderRadius: 15,
    marginTop: 5,
    backgroundColor: Colors.white,
  },
  changeNameButton: {
    borderRadius: 10,
  },
  changeChangePassword: {
    borderRadius: 10,
  },
  signOutButton: {
    borderRadius: 10,
    backgroundColor: '#dc143c',
  },
})
