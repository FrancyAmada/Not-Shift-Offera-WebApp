import React, { useEffect, useState } from 'react'
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native'

import { useForm } from 'react-hook-form'

import { Link, Stack, useRouter } from 'expo-router'

import { FIREBASE_AUTH, FIRESTORE_DB } from 'firebaseConfig'

import Colors from '@/constants/Colors'
import HeaderStyle from '@/constants/HeaderStyle'

import InputField from '@/components/InputField'
import IconButton from '@/components/IconButton'
import BackButton from '@/components/BackButton'
import TextStyles from '@/constants/TextStyles'

import { useUserProfile } from '@/api/posts'

const defaultUserImage = require('@assets/images/default-user.png')

const HomeStack = () => {
  const router = useRouter()
  const { control } = useForm()

  const userId = FIREBASE_AUTH.currentUser?.uid || ''
  const { fetchUser, userProfile, userProfileLoading } = useUserProfile()
  const [userProfilePic, setUserProfilePic] = useState(userProfile.profileImg)

  useEffect(() => {
    fetchUser(userId)
  }, [])

  const goToProfile = async () => {
    router.navigate('/(user)/home/profile')
  }

  useEffect(() => {
    setUserProfilePic(userProfile.profileImg)
  }, [userProfile])

  return (
    <Stack initialRouteName='index'>
      <Stack.Screen
        name='index'
        options={{
          headerTitle: 'offera',
          ...{ ...HeaderStyle, headerTitleStyle: TextStyles.bold7 },
          headerRight: () => (
            <View style={styles.actionRow}>
              <Link href='/(user)/home/search' asChild>
                <TouchableOpacity style={styles.searchButtonContainer}>
                  <InputField
                    name='search'
                    placeholder='Search'
                    control={control}
                    style={styles.searchButton}
                    withIcon={true}
                    icon='search-fill'
                    editable={false}
                  />
                </TouchableOpacity>
              </Link>
              {/* <IconButton icon='profile-fill' color={Colors.blue} route='/(user)/home/profile' strokeWidth={0} /> */}
              <TouchableOpacity onPress={goToProfile}>
                <Image
                  source={userProfilePic ? { uri: userProfilePic } : defaultUserImage}
                  style={styles.userImage}></Image>
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='profile'
        options={{
          title: 'Profile',
          ...{ ...HeaderStyle },
          headerLeft: () => {
            return <BackButton router={router} color={Colors.blue} />
          },
        }}
      />
      <Stack.Screen
        name='search'
        options={{
          title: 'Search',
          ...{ ...HeaderStyle },
          headerLeft: () => {
            return <BackButton router={router} color={Colors.blue} />
          },
        }}
      />
    </Stack>
  )
}

export default HomeStack

const styles = StyleSheet.create({
  actionRow: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingEnd: 5,
    right: 25,
    gap: 40,
  },
  searchButtonContainer: {
    width: '100%',
  },
  searchButton: {
    height: 40,
    borderRadius: 50,
    elevation: 2,
    shadowRadius: 8,
    shadowOpacity: 0.1,
    backgroundColor: Colors.white,
    width: '100%',
  },
  userImage: {
    height: 40,
    width: 40,
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: 32,
    borderColor: Colors.blue,
    borderWidth: 1,
  },
})
