import React from 'react'
import { View } from 'react-native'

import IconButton from './IconButton'
import Colors from '@/constants/Colors'

type BackButtonProps = {
  router: any
  icon?: string
  color?: string
  strokeWidth?: number
}

const BackButton = ({ icon = 'chevron-left', color = Colors.white, router, strokeWidth = 1 }: BackButtonProps) => {
  return (
    <View style={{ paddingRight: 16 }}>
      <IconButton
        icon={icon}
        color={color}
        onPress={() => {
          router.back()
        }}
        strokeWidth={strokeWidth}
      />
    </View>
  )
}

export default BackButton
