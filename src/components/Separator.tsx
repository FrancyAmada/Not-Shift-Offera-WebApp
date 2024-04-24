import { StyleSheet, View, Text, ViewStyle } from 'react-native';
import React from 'react';

import Colors from '@constants/Colors';
import TextStyles from '@/constants/TextStyles';

type SeparatorProps = {
    type?: 'line' | 'withLabel';
    text?: string;
    style?: ViewStyle;
    textStyle?: ViewStyle;
};

const Separator = ({ type, text, style, textStyle }: SeparatorProps) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.separator} />
            {type === 'withLabel' && (
                <>
                    <Text style={[styles.text, textStyle]}>{text}</Text>
                    <View style={styles.separator} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: Colors.grey,
        marginHorizontal: 10,
    },
    text: {
        ...TextStyles.bold2,
        color: Colors.grey,
    },
});

export default Separator;
