import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';

import { Link } from 'expo-router';

import Colors from '@/constants/Colors';
import TextStyles from '@/constants/TextStyles';
import Icon from '@/components/Icon';
import InputField from '@/components/InputField';
import { useForm } from 'react-hook-form';

const HomeHeader = () => {
    const { control } = useForm();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <Text style={styles.headerTitle}>offera</Text>
                    <Link href="/(user)/my-posts" asChild>
                        <TouchableOpacity style={styles.searchButtonContainer}>
                            <InputField
                                name="search"
                                placeholder="Search"
                                control={control}
                                style={styles.searchButton}
                                withIcon={true}
                                icon="search-fill"
                                editable={false}
                            />
                        </TouchableOpacity>
                    </Link>
                    <Link href="/(user)/home/profile" asChild>
                        <TouchableOpacity>
                            <Icon
                                name={'profile-outline'}
                                color={Colors.blue}
                            />
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        height: 64,
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 32,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGrey,
    },
    actionRow: {
        alignItems: 'center',
        height: 'auto',
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 16,
        gap: 16,
    },
    headerTitle: {
        ...TextStyles.bold7,
        color: Colors.blue,
    },
    searchButtonContainer: {
        flex: 1,
        height: 'auto',
        width: '100%',
    },
    searchButton: {
        height: 40,
        width: '100%',
        borderRadius: 50,
        elevation: 2,
        backgroundColor: Colors.white,
    },
});

// // headerShown: true,
// //                     headerTitle: 'offera',
// //                     headerTitleStyle: TextStyles.bold7,
// //                     headerTintColor: Colors.blue,
// //                     headerShadowVisible: true,
// //                     headerRight: () => (
// //                         <View style={styles.headerRightContainer}>
// //                             <Pressable style={{ flex: 1 }}>
// //                                 <InputField
//                                     name="search"
//                                     placeholder="Search"
//                                     control={control}
//                                     style={{ height: 'auto', width: '100%' }}
//                                     withIcon={true}
//                                     icon="search-fill"
//                                 />
//                             </Pressable>

//                             <Icon name={'profile-outline'} />
//                         </View>
//                     ),
