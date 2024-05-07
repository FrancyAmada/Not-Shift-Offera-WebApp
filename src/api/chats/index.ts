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

  const fetchContacts = (currentUserId: string) => {
    setLoading(true)
    setError(null)

    // get user posts
    const applicantsQuery = query(collection(FIRESTORE_DB, 'posts'), where('authorId', '==', currentUserId))

    const unsubscribeApplicants = onSnapshot(
      applicantsQuery,
      async postsSnapshot => {
        // all applicants to your posts
        const allApplicants = postsSnapshot.docs.flatMap(doc => doc.data().applicants || [])
        const uniqueApplicants = [...new Set(allApplicants)]

        const usersRef = collection(FIRESTORE_DB, 'users')
        // get user profile of all applicants
        const applicantsUsersQuery = query(usersRef, where('userId', 'in', uniqueApplicants))
        const applicantsUsersSnapshot = await getDocs(applicantsUsersQuery)
        const fetchedApplicants = applicantsUsersSnapshot.docs.map(doc => doc.data() as UserProfile)

        const postsRef = collection(FIRESTORE_DB, 'posts')
        const postsQuery = query(postsRef, where('applicants', 'array-contains', currentUserId))

        const unsubscribeApplications = onSnapshot(
          postsQuery,
          async postsSnapshot => {
            const authorIds = postsSnapshot.docs.map(doc => doc.data().authorId)
            const uniqueAuthorIds = [...new Set(authorIds)]

            if (uniqueAuthorIds.length === 0) {
              setLoading(false)
              setContacts(fetchedApplicants)
              return
            }

            const usersQuery = query(usersRef, where('userId', 'in', uniqueAuthorIds))
            const usersSnapshot = await getDocs(usersQuery)

            const fetchedAuthors = usersSnapshot.docs.map(doc => doc.data() as UserProfile)

            const combinedContacts = [...fetchedApplicants, ...fetchedAuthors]
            const uniqueContacts = Array.from(new Set(combinedContacts.map(contact => contact.userId))).map(userId =>
              combinedContacts.find(contact => contact.userId === userId),
            )

            setLoading(false)
            setContacts(uniqueContacts as UserProfile[])
          },
          err => {
            setError(err.message)
            setLoading(false)
          },
        )

        return () => unsubscribeApplications()
      },
      err => {
        setError(err.message)
        setLoading(false)
      },
    )

    return unsubscribeApplicants
  }

  return { fetchContacts, contacts, loading, error }
}

export const useGetChatMetadata = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [chatMetadata, setChatMetadata] = useState<Record<string, any>>({})

  const fetchChatMetadata = (currentUserId: string) => {
    setLoading(true)
    setError(null)

    const chatsRef = collection(FIRESTORE_DB, 'chats')
    const q = query(chatsRef, where('participants', 'array-contains', currentUserId))

    const unsubscribe = onSnapshot(
      q,
      async snapshot => {
        const chatMetadata = await Promise.all(
          snapshot.docs.map(async doc => {
            const chatId = doc.id
            const chatData = doc.data()

            const messagesRef = collection(FIRESTORE_DB, `chats/${chatId}/messages`)
            const lastMessageQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(1))
            const lastMessageSnapshot = await getDocs(lastMessageQuery)
            const lastMessageData = lastMessageSnapshot.docs[0]?.data() || {}

            return {
              chatId,
              lastMessage: lastMessageData.text || '',
              lastMessageTimestamp: lastMessageData.timestamp?.toDate(),
              participants: chatData.participants,
            }
          }),
        )

        setLoading(false)
        setChatMetadata(
          chatMetadata.reduce(
            (acc, chat) => {
              acc[chat.chatId] = chat
              return acc
            },
            {} as Record<string, any>,
          ),
        )
      },
      err => {
        setError(err.message)
        setLoading(false)
      },
    )

    return unsubscribe
  }

  return { fetchChatMetadata, chatMetadata, loading, error }
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
