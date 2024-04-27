import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import IconButton from './IconButton';

type BackButtonProps = {
    router: any;
    icon?: string;
    strokeWidth?: number;
};

const BackButton = ({
    icon = 'chevron-left',
    router,
    strokeWidth = 1,
}: BackButtonProps) => {
    return (
        <View style={{ paddingRight: 16 }}>
            <IconButton
                icon={icon}
                onPress={() => router.back()}
                strokeWidth={strokeWidth}
            />
        </View>
    );
};

export default BackButton;
