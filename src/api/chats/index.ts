import { useState } from 'react'
import { collection, doc, getDoc, getDocs, query, setDoc, Timestamp, where } from 'firebase/firestore'
import { FIRESTORE_DB, FIREBASE_AUTH } from 'firebaseConfig'
import { UserProfile } from 'firebase/auth'

export const useAddChat = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [finished, setFinished] = useState(false)

  const addChat = async (userId: string) => {
    setLoading(true)

    try {
      const newChatRef = doc(collection(FIRESTORE_DB, 'chats'))

      await setDoc(newChatRef, {
        chatId: newChatRef.id,
        participants: [FIREBASE_AUTH.currentUser?.uid, userId],
        lastMessage: '',
        lastMessageTimestamp: Timestamp.now(),
        messages: [],
      })

      console.log('Chat created with ID: ', newChatRef.id)
      setLoading(false)
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
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

        const chatUsersData = chatUsersSnapshot.docs.map(doc => doc.data() as UserProfile)
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
