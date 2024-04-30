import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from 'react-native';
import MultipleSwitch from 'react-native-multiple-switch';
import { useForm } from 'react-hook-form';

import { Stack, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import Colors from '@/constants/Colors';
import HeaderStyle from '@/constants/HeaderStyle';
import TextStyles from '@/constants/TextStyles';
import FormStyles from '@/constants/FormStyles';

import BackButton from '@/components/BackButton';
import InputField from '@/components/InputField';
import IconButton from '@/components/IconButton';

const addPostScreen = () => {
    console.log('ADD POST');
    const imgIcon = require('@assets/icons/img_placeholder.png');

    const router = useRouter();
    const { control, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const [type, setType] = useState('');
    const [imageList, setImageList] = useState<string[] | null>(null);

    const addPost = async (data: {
        title: string;
        rate: number;
        description: string;
    }) => {
        setLoading(true);

        console.log('POST:', {
            type,
            title: data.title,
            rate: data.rate,
            description: data.description,
            imageList,
        });
        setTimeout(() => {
            setLoading(false);
            router.back();
        }, 3000);
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsMultipleSelection: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.canceled) {
                const selectedImageUris = result.assets.map(asset => asset.uri);
                setImageList(selectedImageUris);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={FormStyles.container}>
            <ScrollView
                style={FormStyles.avoid}
                showsVerticalScrollIndicator={false}>
                <Stack.Screen
                    options={{
                        headerShown: true,
                        headerTitle: 'Add Post',
                        ...{ ...HeaderStyle },
                        headerLeft: () => {
                            return (
                                <BackButton
                                    router={router}
                                    color={Colors.blue}
                                />
                            );
                        },
                    }}
                />
                <View style={FormStyles.form}>
                    <MultipleSwitch
                        items={['Task', 'Service']}
                        value={type}
                        onChange={setType}
                        textStyle={{
                            color: Colors.blue,
                            ...TextStyles.bold4,
                        }}
                        activeTextStyle={{
                            color: Colors.white,
                            ...TextStyles.bold4,
                        }}
                        sliderStyle={{
                            backgroundColor: Colors.blue,
                            margin: -2,
                            borderRadius: 8,
                            height: 50,
                        }}
                        containerStyle={styles.switchContainer}
                    />

                    <TouchableOpacity
                        style={styles.imageContainer}
                        onPress={pickImage}>
                        {imageList ? (
                            <Image
                                source={{ uri: imageList[0] }}
                                style={styles.uploadedImg}
                            />
                        ) : (
                            <>
                                <Image
                                    source={imgIcon}
                                    style={styles.placeholderImg}
                                />
                                <Text
                                    style={{
                                        ...TextStyles.bold2,
                                        color: Colors.blue,
                                    }}>
                                    Add Image
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                    <View style={{ gap: 8 }}>
                        <InputField
                            maxLength={64}
                            numberOfLines={4}
                            name="title"
                            placeholder="Title"
                            autoGrow={true}
                            style={styles.titleContainer}
                            inputStyle={styles.titleInput}
                            control={control}
                        />
                        <View
                            style={{
                                paddingHorizontal: 4,
                                flexDirection: 'row',
                                gap: 0,
                            }}>
                            <Text
                                style={{
                                    ...TextStyles.medium3,
                                    color: Colors.placeholder,
                                }}>
                                Rate: {'  '}
                            </Text>
                            <Text
                                style={{
                                    ...TextStyles.medium3,
                                    color: Colors.blue,
                                }}>
                                ₱
                            </Text>
                            <InputField
                                inputMode="decimal"
                                maxLength={10}
                                numberOfLines={1}
                                name="rate"
                                placeholder="0.00"
                                placeholderTextColor={Colors.blue + '90'}
                                style={styles.rateContainer}
                                inputStyle={styles.rateInput}
                                control={control}
                            />
                        </View>
                    </View>

                    <InputField
                        maxLength={250}
                        numberOfLines={8}
                        autoGrow={true}
                        name="description"
                        placeholder="Put your description here..."
                        style={styles.descContainer}
                        inputStyle={styles.descInput}
                        control={control}
                    />
                </View>
            </ScrollView>
            {loading ? (
                <ActivityIndicator
                    size={'large'}
                    color={Colors.blue}
                    style={styles.loadingIndicator}
                />
            ) : (
                <IconButton
                    onPress={handleSubmit(data => {
                        const postData = {
                            title: data.title,
                            rate: data.rate,
                            description: data.description,
                            imageList,
                            type,
                        };
                        addPost(postData);
                    })}
                    style={styles.actionButton}
                    icon="add-circle-fill"
                    color={Colors.blue}
                    size={75}
                    strokeWidth={0}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    imageContainer: {
        height: 200,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 8,
        alignItems: 'center',
        gap: 8,
        justifyContent: 'center',
    },
    uploadedImg: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    placeholderImg: {
        width: 24,
        height: 24,
    },
    switchContainer: {
        height: 50,
        backgroundColor: Colors.white,
        borderWidth: 2,
        borderColor: Colors.blue,
        borderRadius: 8,
        padding: 0,
        margin: 0,
    },
    titleContainer: {
        margin: 0,
        padding: 0,
        paddingVertical: 0,
        paddingHorizontal: 4,
        marginVertical: 0,
        borderWidth: 0,
    },
    titleInput: {
        ...TextStyles.bold5,
        margin: 0,
        padding: 0,
        paddingVertical: 0,
        marginVertical: 0,
        textAlignVertical: 'auto',
    },
    rateContainer: {
        flex: 1,
        height: 28,
        alignItems: 'flex-start',
        margin: 0,
        padding: 0,
        paddingVertical: 0,
        paddingHorizontal: 4,
        marginVertical: 0,
        borderWidth: 0,
    },
    rateInput: {
        ...TextStyles.medium3,
        color: Colors.blue,
        margin: 0,
        padding: 0,
        paddingVertical: 0,
        marginVertical: 0,
        textAlignVertical: 'top',
    },
    descContainer: {
        margin: 0,
        padding: 0,
        paddingVertical: 0,
        paddingHorizontal: 4,
        marginVertical: 0,
        borderWidth: 0,
    },
    descInput: {
        ...TextStyles.regular3,
        margin: 0,
        padding: 0,
        paddingVertical: 0,
        marginVertical: 0,
        textAlignVertical: 'top',
    },
    actionButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        flexBasis: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: Colors.white,
        elevation: 3,
    },
    loadingIndicator: {
        position: 'absolute',
        width: 70,
        height: 70,
        right: 30,
        bottom: 30,
        flexBasis: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: Colors.white,
        elevation: 3,
    },
});

export default addPostScreen;
