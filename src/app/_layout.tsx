import { useEffect } from 'react';

import { useFonts } from 'expo-font';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider, useAuth } from '@/providers/AuthProvider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const insets = useSafeAreaInsets();
    const [loaded, error] = useFonts({
        'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <View style={{ flex: 1, paddingBottom: insets.bottom }}>
                <MainLayout />
            </View>
        </AuthProvider>
    );
}

function MainLayout() {
    const { isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (typeof isAuthenticated == 'undefined') return;

        const inApp = segments[0] == '(app)';

        if (isAuthenticated && !inApp) {
            router.replace('/(user)/home/');
        } else if (isAuthenticated == false) {
            router.replace('/');
        }
    }, [isAuthenticated]);

    return <Slot />;
}
