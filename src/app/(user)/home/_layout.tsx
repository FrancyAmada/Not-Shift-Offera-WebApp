import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'

import { useForm } from 'react-hook-form'

import { Link, Stack, useRouter } from 'expo-router'

import Colors from '@/constants/Colors'
import HeaderStyle from '@/constants/HeaderStyle'

import InputField from '@/components/InputField'
import IconButton from '@/components/IconButton'
import BackButton from '@/components/BackButton'
import TextStyles from '@/constants/TextStyles'

const HomeStack = () => {
  const router = useRouter()
  const { control } = useForm()

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
              <IconButton icon='profile-fill' color={Colors.blue} route='/(user)/home/profile' strokeWidth={0} />
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
})
