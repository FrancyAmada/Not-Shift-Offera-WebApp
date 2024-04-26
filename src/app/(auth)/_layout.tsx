import { Stack } from 'expo-router';

export default function AuthLayout() {
    <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>;
    //   const { session } = useAuth();

    return <Stack />;
}
