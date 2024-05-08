import React, { createContext, useContext, useState, useEffect } from 'react'
import { collection, doc, query, where, orderBy, getDocs, onSnapshot, Timestamp, limit } from 'firebase/firestore'
import { FIRESTORE_DB, FIREBASE_AUTH } from 'firebaseConfig'

interface ChatMetadata {
  chatId: string
  lastMessage: string
  lastMessageTimestamp: Date | null
  participants: string[]
}

interface ChatContextProps {
  chatMetadata: Record<string, ChatMetadata>
  updateChatMetadata: (chatId: string, newMetadata: Partial<ChatMetadata>) => void
  fetchChatMetadata: (currentUserId: string) => Promise<void>
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined)

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chatMetadata, setChatMetadata] = useState<Record<string, ChatMetadata>>({})

  const fetchChatMetadata = async (currentUserId: string) => {
    try {
      const chatsRef = collection(FIRESTORE_DB, 'chats')
      const q = query(chatsRef, where('participants', 'array-contains', currentUserId))
      const snapshot = await getDocs(q)

      const metadata = await Promise.all(
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
            lastMessageTimestamp: lastMessageData.timestamp?.toDate() || null,
            participants: chatData.participants,
          }
        }),
      )

      setChatMetadata(
        metadata.reduce((acc: Record<string, ChatMetadata>, chat) => {
          acc[chat.chatId] = chat
          return acc
        }, {}),
      )
    } catch (err: any) {
      console.error('Error fetching chat metadata:', err.message)
    }
  }

  const updateChatMetadata = (chatId: string, newMetadata: Partial<ChatMetadata>) => {
    setChatMetadata(prev => ({
      ...prev,
      [chatId]: {
        ...(prev[chatId] || {}),
        ...newMetadata,
      },
    }))
  }

  return (
    <ChatContext.Provider value={{ chatMetadata, updateChatMetadata, fetchChatMetadata }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
