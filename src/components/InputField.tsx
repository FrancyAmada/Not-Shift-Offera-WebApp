import { StyleSheet, Text, View, ViewStyle, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import TextStyles from '@/constants/TextStyles';
import { Controller } from 'react-hook-form';

type InputProps = {
    control: any;
    name: string;
    placeholder: string;
    placeholderTextColor?: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    secureTextEntry?: boolean;
    style?: ViewStyle;
    rules?: any;
    // onChange: any;
};

const InputField = ({
    control,
    name,
    placeholder,
    placeholderTextColor,
    secureTextEntry = false,
    style,
    rules = {},
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
                <View>
                    <TextInput
                        style={[
                            styles.input,
                            style,
                            error && { borderColor: Colors.red },
                        ]}
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
                    {error && (
                        <Text style={styles.errorText}>
                            {error.message || 'Error'}
                        </Text>
                    )}
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        ...TextStyles.regular3,
        height: 50,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 8,
    },
    errorText: {
        ...TextStyles.medium1,
        color: Colors.red,
        alignSelf: 'stretch',
    },
});

export default InputField;
