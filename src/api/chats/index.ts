import { useState } from 'react'
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { FIRESTORE_DB, FIREBASE_AUTH } from 'firebaseConfig'
import { UserProfile } from 'firebase/auth'
import { Message } from 'react-hook-form'

export const useAddChat = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [finished, setFinished] = useState(false)

  const addChat = async (userId: string) => {
    setLoading(true)

    try {
      const currentUserId = FIREBASE_AUTH.currentUser?.uid
      const participants = [currentUserId, userId].sort()

      const chatsSnapshot = await getDocs(
        query(collection(FIRESTORE_DB, 'chats'), where('participants', '==', participants)),
      )

      if (!chatsSnapshot.empty) {
        const existingChatId = chatsSnapshot.docs[0].id
        console.log('Chat already exists with ID: ', existingChatId)
        setLoading(false)
        return existingChatId
      }

      const newChatRef = doc(collection(FIRESTORE_DB, 'chats'))

      await setDoc(newChatRef, {
        chatId: newChatRef.id,
        participants,
        lastMessage: '',
        lastMessageTimestamp: Timestamp.now(),
        messages: [],
      })

      console.log('Chat created with ID: ', newChatRef.id)
      setLoading(false)
      return newChatRef.id
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
      return null
    } finally {
      setFinished(true)
    }
  }
  return { addChat, loading, error, finished }
}

export const useGetChatUsers = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [chatUsers, setChatUsers] = useState<UserProfile[]>([])

  const fetchChatUsers = async (currentUserId: string) => {
    setLoading(true)
    setError(null)

    try {
      if (currentUserId) {
        const postsSnapshot = await getDocs(
          query(collection(FIRESTORE_DB, 'posts'), where('applicants', 'array-contains', currentUserId)),
        )

        const authorIds = postsSnapshot.docs.map(doc => doc.data().authorId)

        const uniqueAuthorIds = [...new Set(authorIds)]

        const chatUsersSnapshot = await getDocs(
          query(collection(FIRESTORE_DB, 'users'), where('userId', 'in', uniqueAuthorIds)),
        )

        console.log(chatUsersSnapshot.docs.map(doc => doc.data()))

        const chatUsersData = chatUsersSnapshot.docs.map(doc => {
          const userData = doc.data() as UserProfile
          console.log(userData)

          const chatId = chatUsersSnapshot.docs.find(chatDoc => console.log(chatDoc.data()))
          return { ...userData, chatId }
        })
        setChatUsers(chatUsersData)
      }
    } catch (error: any) {
      setError(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return { fetchChatUsers, chatUsers, loading, error }
}

export const useGetChatMessages = (chatId: string) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [messages, setMessages] = useState<Message[]>([])

  const fetchMessages = async () => {
    setLoading(true)
    setError(null)

    try {
      const chatDocRef = doc(FIRESTORE_DB, 'chats', chatId)
      const chatDocSnapshot = await getDoc(chatDocRef)

      if (chatDocSnapshot.exists()) {
        const chatData = chatDocSnapshot.data()
        setMessages(chatData.messages)
      }
    } catch (error: any) {
      setError(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return { fetchMessages, messages, loading, error }
}

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = async (chatId: string, message: string) => {
    setLoading(true)
    setError(null)

    try {
      const chatDocRef = doc(FIRESTORE_DB, 'chats', chatId)
      const currentUserId = FIREBASE_AUTH.currentUser?.uid

      await updateDoc(chatDocRef, {
        lastMessage: message,
        lastMessageTimestamp: Timestamp.now(),
        messages: arrayUnion({
          text: message,
          sender: currentUserId,
          timestamp: Timestamp.now(),
        }),
      })
    } catch (error: any) {
      setError(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading, error }
}
