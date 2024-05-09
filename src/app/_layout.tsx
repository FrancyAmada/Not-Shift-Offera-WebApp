import { useEffect } from 'react'

import { useFonts } from 'expo-font'
import { Stack, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'

import { AuthProvider, useAuth } from '@/providers/AuthProvider'
import { PostProvider } from '@/providers/PostProvider'
import { Platform, StatusBar, View } from 'react-native'
import Colors from '@/constants/Colors'
import { ChatProvider } from '@/providers/ChatProvider'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Montserrat-Regular': require('../../assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Light': require('../../assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Bold': require('../../assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    'Montserrat-Medium': require('../../assets/fonts/Montserrat-Medium.ttf'),
  })

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true)
    }
  }, [])

  useEffect(() => {
    if (error) throw error
  }, [error])

  if (!loaded) {
    return null
  }
  return (
    <ChatProvider>
      <AuthProvider>
        <PostProvider>
          <MainLayout />
        </PostProvider>
      </AuthProvider>
    </ChatProvider>
  )
}

function MainLayout() {
  const { isAuthenticated, isLoading } = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return
    if (typeof isAuthenticated == 'undefined') return

    const inApp = segments[0] == '(app)'

    if (isAuthenticated && !inApp) {
      router.replace('/(user)/home')
    } else if (isAuthenticated == false) {
      router.replace('/')
    }

    setTimeout(() => {
      SplashScreen.hideAsync()
    }, 500)
  }, [isAuthenticated, isLoading])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
      }}>
      <Stack.Screen name='index' />
      <Stack.Screen
        name='verify-email'
        options={{
          animation: 'slide_from_right',
          presentation: 'modal',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name='add-post'
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name='[postId]'
        options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
          gestureEnabled: true,
        }}
      />
    </Stack>
  )
}
