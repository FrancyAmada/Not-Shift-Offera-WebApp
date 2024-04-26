import { StyleSheet, Text, View, ViewStyle, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import TextStyles from '@/constants/TextStyles';
import { Controller } from 'react-hook-form';
import Icon from '@/components/Icon';

type InputProps = {
    control: any;
    name: string;
    placeholder: string;
    placeholderTextColor?: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    secureTextEntry?: boolean;
    style?: ViewStyle;
    rules?: any;
    withIcon?: boolean;
    icon?: string;
    iconColor?: string;
    editable?: boolean;
    selectTextOnFocus?: boolean;
};

const InputField = ({
    control,
    name,
    placeholder,
    placeholderTextColor,
    secureTextEntry = false,
    style,
    withIcon = false,
    icon,
    rules = {},
    editable = true,
    selectTextOnFocus = false,
    iconColor,
}: InputProps) => {
    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
            }) => (
                <>
                    <View
                        style={[
                            styles.inputContainer,
                            style,
                            error && { borderColor: Colors.red },
                        ]}>
                        {withIcon && icon && (
                            <View style={{ top: 3 }}>
                                <Icon
                                    name={icon}
                                    size={20}
                                    color={iconColor || Colors.placeholder}
                                />
                            </View>
                        )}
                        <TextInput
                            selectTextOnFocus={selectTextOnFocus}
                            editable={editable}
                            style={{
                                ...styles.input,
                                paddingLeft: withIcon ? 8 : 0,
                            }}
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder={placeholder}
                            placeholderTextColor={
                                placeholderTextColor || Colors.placeholder
                            }
                            secureTextEntry={secureTextEntry}
                            autoCapitalize="none"
                        />
                    </View>
                    {error && (
                        <Text style={styles.errorText}>
                            {error.message || 'Error'}
                        </Text>
                    )}
                </>
            )}
        />
    );
};

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
});

export default InputField;
