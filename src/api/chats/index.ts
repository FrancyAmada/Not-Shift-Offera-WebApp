import { useState, useEffect } from 'react'
import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
  setDoc,
  addDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { FIRESTORE_DB, FIREBASE_AUTH } from 'firebaseConfig'
import { UserProfile } from '@/types'

export const useAddChat = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addChat = async (userId: string) => {
    setLoading(true)
    setError(null)

    try {
      const currentUserId = FIREBASE_AUTH.currentUser?.uid
      if (!currentUserId) {
        throw new Error('User not authenticated')
      }

      const participants = [currentUserId, userId].sort()
      const chatsRef = collection(FIRESTORE_DB, 'chats')
      const q = query(chatsRef, where('participants', '==', participants))

      const chatsSnapshot = await getDocs(q)
      if (!chatsSnapshot.empty) {
        setLoading(false)
        return { chatId: chatsSnapshot.docs[0].id }
      }

      const newChatRef = doc(chatsRef)
      await setDoc(newChatRef, {
        participants,
        lastMessage: '',
        lastMessageTimestamp: Timestamp.now(),
      })

      setLoading(false)
      return { chatId: newChatRef.id }
    } catch (err: any) {
      console.log('Error getting documents: ', error)
      setError(err.message)
      setLoading(false)
      return { error: err.message }
    }
  }

  return { addChat, loading, error }
}

export const useGetContacts = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contacts, setContacts] = useState<UserProfile[]>([])

  const fetchContacts = async (currentUserId: string) => {
    setLoading(true)
    setError(null)

    try {
      const applicantsQuery = query(collection(FIRESTORE_DB, 'posts'), where('authorId', '==', currentUserId))
      const postsSnapshot = await getDocs(applicantsQuery)
      const allApplicants = new Set(postsSnapshot.docs.flatMap(doc => doc.data().applicants || []))

      const appliedPostsQuery = query(
        collection(FIRESTORE_DB, 'posts'),
        where('applicants', 'array-contains', currentUserId),
      )
      const appliedPostsSnapshot = await getDocs(appliedPostsQuery)
      const allAuthors = new Set(appliedPostsSnapshot.docs.map(doc => doc.data().authorId))

      const userIds = new Set([...allApplicants, ...allAuthors])

      if (userIds.size > 0) {
        const usersRef = collection(FIRESTORE_DB, 'users')
        const usersQuery = query(usersRef, where('userId', 'in', [...userIds]))
        const usersSnapshot = await getDocs(usersQuery)
        const fetchedContacts = usersSnapshot.docs.map(doc => doc.data() as UserProfile)

        setContacts(fetchedContacts)
      } else {
        setContacts([])
      }

      setLoading(false)
    } catch (err: any) {
      console.error('Error fetching contacts:', err.message)
      setError(err.message)
      setLoading(false)
    }
  }

  return { fetchContacts, contacts, loading, error }
}

export const useGetChatMessages = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<any[]>([])

  const fetchMessages = (chatId: string) => {
    setLoading(true)
    setError(null)

    const messagesRef = collection(FIRESTORE_DB, `chats/${chatId}/messages`)
    const messagesQuery = query(messagesRef, orderBy('timestamp', 'asc'))

    const unsubscribe = onSnapshot(
      messagesQuery,
      snapshot => {
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })),
        )
        setLoading(false)
      },
      err => {
        setError(err.message)
        setLoading(false)
      },
    )

    return unsubscribe
  }

  return { fetchMessages, messages, loading, error }
}

export const useSendMessage = () => {
  const [error, setError] = useState<string | null>(null)

  const sendMessage = async (chatId: string, message: string) => {
    try {
      const currentUserId = FIREBASE_AUTH.currentUser?.uid
      if (!currentUserId) {
        throw new Error('User not authenticated')
      }

      const messagesRef = collection(FIRESTORE_DB, `chats/${chatId}/messages`)
      await addDoc(messagesRef, {
        text: message,
        senderId: currentUserId,
        timestamp: serverTimestamp(),
      })

      const chatRef = doc(FIRESTORE_DB, 'chats', chatId)
      await setDoc(
        chatRef,
        {
          lastMessage: message,
          lastMessageTimestamp: Timestamp.now(),
        },
        { merge: true },
      )
    } catch (err: any) {
      setError(err.message)
    }
  }

  return { sendMessage, error }
}
