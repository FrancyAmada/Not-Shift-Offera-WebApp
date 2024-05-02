import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'

import Colors from '@/constants/Colors'
import TextStyles from '@/constants/TextStyles'
import { IconStyle } from '@/constants/Icons'

import BackButton from '@/components/BackButton'

const defaultUserImage = require('@assets/images/default-user.png')

const ApplyScreen = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      {/* <Stack.Screen options={{}} /> */}
      <View style={styles.mainContainer}>
        <View style={styles.header}>
          <View
            style={{
              backgroundColor: Colors.blue,
              ...IconStyle.fill,
              alignItems: 'flex-start',
            }}>
            <BackButton icon='chevron-left-fill' router={router} color={Colors.white} />
          </View>
        </View>
        <View style={styles.userImageContainer}>
          <Image source={defaultUserImage} style={styles.userImage} />
        </View>
        <View style={styles.userProfileContainer}>
          <Text style={styles.userName}>Francy Angelo Amada</Text>
        </View>
        <View style={styles.postDetailsContainer}>
          <Text style={styles.postTitle}>Post Title</Text>
          <Text style={styles.postTime}>Date Posted: </Text>
        </View>
      </View>
    </View>
  )
}

export default ApplyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mainContainer: {
    flexWrap: 'wrap',
    margin: 48,
    padding: 32,
    backgroundColor: Colors.white,
    height: '90%',
    borderRadius: 16,
  },
  header: {
    margin: -32,
    paddingLeft: 16,
    paddingTop: 16,
  },
  userImage: {
    width: 160,
    height: 160,
    maxWidth: '100%',
    maxHeight: '100%',
  },
  userImageContainer: {
    marginLeft: 16,
    padding: 48,
    justifyContent: 'center',
    alignContent: 'center',
    width: '100%',
  },
  userName: {
    ...TextStyles.bold5,
    padding: 6,
  },
  userProfileContainer: {
    backgroundColor: Colors.blue,
    width: '100%',
    borderRadius: 16,
    padding: 8,
  },
  postDetailsContainer: {
    gap: 8,
    marginTop: 16,
    height: '50%',
  },
  postTitle: {
    ...TextStyles.bold5,
    color: Colors.black,
  },
  postTime: {
    ...TextStyles.bold4,
    color: Colors.black,
  },
})
