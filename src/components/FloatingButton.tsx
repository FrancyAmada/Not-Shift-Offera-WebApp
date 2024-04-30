import { forwardRef } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    Image,
    ViewStyle,
    TextStyle,
    TouchableOpacity,
} from 'react-native';

import Colors from '../constants/Colors';
import TextStyles from '@/constants/TextStyles';

type FloatingButtonProps = {
    type?: 'text' | 'withIcon';
    backgroundColor?: string;
    icon?: any;
    style?: ViewStyle;
} & React.ComponentPropsWithoutRef<typeof TouchableOpacity>;

const FloatingButton = forwardRef<View | null, FloatingButtonProps>(
    (
        {
            text,
            type = 'text',
            textStyle,
            hasBackground = true,
            backgroundColor = Colors.blue,
            style,
            icon,
            iconPosition = 'left',
            ...touchableOpacityProps
        },
        ref,
    ) => {
        return (
            <Pressable
                ref={ref}
                {...touchableOpacityProps}
                style={[
                    styles.container,
                    hasBackground && backgroundColor ? { backgroundColor } : {},
                    style,
                ]}>
                {type === 'withIcon' && iconPosition === 'left' && icon && (
                    <Image source={icon} style={styles.icon} />
                )}
                <Text
                    style={[
                        {
                            ...TextStyles.bold3,
                            color: Colors.white,
                            textAlign: 'center',
                        },
                        textStyle,
                    ]}>
                    {text}
                </Text>
                {type === 'withIcon' && iconPosition === 'right' && icon && (
                    <Image source={icon} style={styles.icon} />
                )}
            </Pressable>
        );
    },
);

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        width: '75%',
        minWidth: 220,
        maxWidth: 320,
        paddingVertical: 16,
        borderRadius: 16,
        gap: 16,
    },
    icon: {
        width: 32,
        height: 32,
    },
});

export default Button;
