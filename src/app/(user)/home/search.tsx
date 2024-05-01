import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Colors from '@/constants/Colors'

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text>search</Text>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
})
