import React from 'react'
import { TouchableOpacity, View, ViewStyle } from 'react-native'

import { Link, LinkProps } from 'expo-router'

import Colors from '@/constants/Colors'

import Icon from '@/components/Icon'

interface IconButtonProps {
  icon: string
  route?: LinkProps<string>['href']
  color?: string
  size?: number
  strokeWidth?: number
  onPress?: () => void
  style?: ViewStyle
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  route,
  onPress,
  strokeWidth,
  color = Colors.blue,
  size = 32,
  style,
}: IconButtonProps) => {
  return (
    <View style={style}>
      {route ? (
        <Link href={route} asChild>
          <TouchableOpacity onPress={onPress}>
            <Icon name={icon} color={color} size={size} stroke={color} strokeWidth={strokeWidth} />
          </TouchableOpacity>
        </Link>
      ) : (
        <TouchableOpacity onPress={onPress}>
          <Icon name={icon} color={color} size={size} stroke={color} strokeWidth={strokeWidth} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default IconButton
