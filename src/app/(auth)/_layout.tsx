// import { useAuth } from '@/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
    <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>;
    //   const { session } = useAuth();

    return <Stack />;
}
