import { StyleSheet } from 'react-native';
import Colors from './Colors';
import TextStyles from './TextStyles';

const FormStyles = StyleSheet.create({
    avoid: { flex: 1, backgroundColor: Colors.white },
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignContent: 'center',
        padding: 16,
        gap: 40,
        backgroundColor: Colors.white,
    },
    form: {
        flex: 1,
        gap: 20,
        padding: 14,
    },
    inputContainer: {
        gap: 3,
    },
    label: TextStyles.medium3,
    captionRight: {
        ...TextStyles.medium2,
        alignSelf: 'flex-end',
        color: Colors.blue,
    },
    captionLeft: {
        ...TextStyles.medium2,
        alignSelf: 'flex-start',
        color: Colors.blue,
    },
    captionCenter: {
        textAlign: 'center',
        flexDirection: 'row',
        ...TextStyles.medium2,
    },
    footerText: {
        textAlign: 'center',
        ...TextStyles.medium2,
        color: Colors.placeholder,
    },
    googleLogin: {
        color: Colors.placeholder,
    },
    highlight: {
        ...TextStyles.bold2,
        color: Colors.blue,
    },
    rowFix: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: '90%',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    footer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 20,
    },
    error: {
        borderColor: Colors.red,
        borderWidth: 2,
    },
    errorText: {
        color: Colors.red,
    },
});

export default FormStyles;
