import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  User,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { FIREBASE_AUTH, FIRESTORE_DB } from 'firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'

import { AuthData, AuthResponse } from '@/types'
import { Alert } from 'react-native'

const AuthContext = createContext<AuthData>({
  user: null,
  isAuthenticated: false,
  logIn: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    return { status: 'Idle' }
  },
  signUp: async (data: { fullName: string; email: string; password: string }): Promise<AuthResponse> => {
    return { status: 'Idle' }
  },
  logOut: async (): Promise<AuthResponse> => {
    return { status: 'Idle' }
  },
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(FIREBASE_AUTH, user => {
      if (user) {
        if (user.emailVerified) {
          setIsAuthenticated(true)
          updateUserData(user.uid)
        } else {
          setIsAuthenticated(false)
          setUser(null)
        }
      } else {
        setIsAuthenticated(false)
        setUser(null)
      }
    })
    return unsub
  }, [])

  const updateUserData = async (userId: string) => {
    const docRef = doc(FIRESTORE_DB, 'users', userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      let data = docSnap.data() as User
      setUser(data)
    }
  }

  const logIn = async (data: { email: string; password: string }): Promise<AuthResponse> => {
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password)
      if (!response.user.emailVerified) {
        return { success: false, msg: 'Please verify your email address.', status: 'Error' }
      }
      return { success: true, status: 'Resolved' }
    } catch (error: any) {
      return {
        success: false,
        msg: error.message,
        status: 'Error',
      }
    }
  }

  const signUp = async (data: { fullName: string; email: string; password: string }): Promise<AuthResponse> => {
    try {
      const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password)

      await sendEmailVerification(response.user)

      await setDoc(doc(FIRESTORE_DB, 'users', response.user.uid), {
        fullName: data.fullName,
        email: data.email,
        userId: response.user.uid,
      })

      return { success: true, msg: 'Registered successfully. Please verify your email.', status: 'Resolved' }
    } catch (error: any) {
      return {
        success: false,
        msg: error.message,
        status: 'Error',
      }
    }
  }

  const logOut = async (): Promise<AuthResponse> => {
    console.log('Logging out')
    try {
      await FIREBASE_AUTH.signOut()
      return { success: true, status: 'Resolved' }
    } catch (error: any) {
      return { success: false, msg: error.message, status: 'Error' }
    } finally {
      return { status: 'Resolved' }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user: user as User | null,
        isAuthenticated,
        logIn,
        signUp,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const value = useContext(AuthContext)
  if (value === undefined) {
    console.log('useAuth must be used within an AuthProvider')
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return value
}

export const changePassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(FIREBASE_AUTH, email)
    return { success: true, msg: 'Successfully sent password reset email.', status: 'Resolved' }
  } catch (error: any) {
    return { success: false, msg: 'Error sending password reset email', status: 'Error' }
  }
}
