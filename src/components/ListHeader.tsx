import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import React from 'react';
import TextStyles from '@/constants/TextStyles';
import Colors from '@/constants/Colors';
import Button from './Button';

type ListHeaderProps = {
    title: string;
    titleStyle?: TextStyle;
    style?: ViewStyle;
    canExpand?: boolean;
    onPress?: () => void;
};

const ListHeader = ({
    title,
    titleStyle,
    style,
    canExpand = true,
    onPress,
}: ListHeaderProps) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                backgroundColor: Colors.blue,
                borderRadius: 8,
                ...style,
            }}>
            <Text
                style={{
                    ...TextStyles.bold5,
                    color: Colors.white,
                    ...titleStyle,
                }}>
                {title}
            </Text>
            {canExpand && (
                <Button
                    onPress={onPress}
                    text="View all"
                    hasBackground={false}
                    style={{
                        minWidth: 'auto',
                        width: 'auto',
                    }}
                    textStyle={{
                        ...TextStyles.medium2,
                        color: Colors.white,
                    }}
                />
            )}
        </View>
    );
};

export default ListHeader;
