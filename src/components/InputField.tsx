import { StyleSheet, Text, View, ViewStyle, TextInput, TextStyle } from 'react-native'
import { Controller } from 'react-hook-form'

import Colors from '../constants/Colors'
import TextStyles from '@/constants/TextStyles'

import Icon from '@/components/Icon'
import { useState } from 'react'

type InputProps = {
  control: any
  name: string
  placeholder: string
  placeholderTextColor?: string
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  secureTextEntry?: boolean
  style?: ViewStyle
  inputStyle?: ViewStyle & TextStyle
  rules?: any
  withIcon?: boolean
  icon?: string
  iconColor?: string
  editable?: boolean
  selectTextOnFocus?: boolean
  numberOfLines?: number
  maxLength?: number
  autoGrow?: boolean
  inputMode?: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url'
}

const InputField = ({
  control,
  name,
  placeholder,
  placeholderTextColor,
  secureTextEntry = false,
  style,
  inputStyle,
  withIcon = false,
  icon,
  rules = {},
  editable = true,
  selectTextOnFocus = false,
  iconColor,
  numberOfLines = 1,
  inputMode = 'text',
  maxLength = 120,
  autoGrow = false,
}: InputProps) => {
  const [height, setHeight] = useState(0)

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View
            style={{
              ...styles.inputContainer,
              borderColor: error ? Colors.red : Colors.grey,
              ...(autoGrow && {
                height: Math.max(35, height),
              }),
              ...style,
            }}>
            {withIcon && icon && (
              <View style={{ top: 3 }}>
                <Icon name={icon} size={20} color={iconColor || Colors.placeholder} />
              </View>
            )}
            <TextInput
              inputMode={inputMode}
              maxLength={maxLength}
              numberOfLines={numberOfLines}
              multiline={numberOfLines > 1}
              {...(autoGrow && {
                onContentSizeChange: e => setHeight(e.nativeEvent.contentSize.height),
              })}
              selectTextOnFocus={selectTextOnFocus}
              editable={editable}
              style={{
                ...styles.input,
                paddingLeft: withIcon ? 8 : 0,
                ...(autoGrow && {
                  height: Math.max(35, height),
                }),
                ...inputStyle,
              }}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor || Colors.placeholder}
              secureTextEntry={secureTextEntry}
              autoCapitalize='none'
            />
          </View>
          {error && <Text style={styles.errorText}>{error.message || 'Error'}</Text>}
        </>
      )}
    />
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    height: 50,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    ...TextStyles.regular3,
    flex: 1,
  },
  errorText: {
    ...TextStyles.medium1,
    color: Colors.red,
    alignSelf: 'stretch',
  },
})

export default InputField
