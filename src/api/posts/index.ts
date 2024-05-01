import { useEffect, useState } from 'react'

import { collection, query, getDocs, orderBy, doc, setDoc, getDoc } from 'firebase/firestore'
import { FIRESTORE_DB, FIREBASE_AUTH } from 'firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FIREBASE_STORAGE } from 'firebaseConfig'

import { usePostContext } from '@/providers/PostProvider'

import { UserProfile, Post } from '@/types'

export const useAddPost = () => {
  const { setNewPostAdded } = usePostContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [finished, setFinished] = useState(false)

  const addPost = async (data: {
    title: string
    rate: number
    description: string
    imageList: string[]
    type: string
  }) => {
    setLoading(true)

    try {
      const newPostRef = doc(collection(FIRESTORE_DB, 'posts'))

      const imageUrls: string[] = []
      if (data.imageList) {
        for (const [index, imageUri] of data.imageList.entries()) {
          console.log('Uploading image: ', imageUri)
          const response = await fetch(imageUri)
          const blob = await response.blob()
          const storageRef = ref(FIREBASE_STORAGE, `posts/${newPostRef.id}/image_${index}_${Date.now()}.jpg`)
          await uploadBytes(storageRef, blob)
          const downloadUrl = await getDownloadURL(storageRef)
          imageUrls.push(downloadUrl)
        }
      }

      await setDoc(newPostRef, {
        postId: newPostRef.id,
        authorId: FIREBASE_AUTH.currentUser?.uid,
        type: data.type,
        title: data.title,
        rate: data.rate,
        description: data.description,
        imageList: imageUrls,
        applicants: [],
        status: 'Active',
        createdAt: 'Time',
      } as Post)

      console.log('Document written with ID: ', newPostRef.id)
      setNewPostAdded(true)
      setLoading(false)
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    } finally {
      setFinished(true)
    }
  }

  return { addPost, loading, error, finished }
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPosts = async () => {
    setLoading(true)

    try {
      const q = query(collection(FIRESTORE_DB, 'posts'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const fetchedPosts: Post[] = []
      querySnapshot.forEach(doc => {
        fetchedPosts.push(doc.data() as Post)
      })
      setPosts(fetchedPosts)
      setLoading(false)
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
    }
  }

  return { fetchPosts, posts, loading, error }
}

export const usePost = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)

      try {
        const docRef = doc(FIRESTORE_DB, 'posts', postId)

        const docSnap = await getDoc(docRef)
        console.log(docSnap.data())

        if (docSnap.exists()) {
          setPost(docSnap.data() as Post)
        } else {
          setError('Document does not exist')
        }
        setLoading(false)
      } catch (error: any) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchPost()
  }, [postId])

  return { post, loading, error }
}

export const useUserProfile = (userId: string) => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: '',
    email: '',
    fullName: '',
    profileImg: undefined,
  })
  const [userProfileLoading, setUserProfileLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAuthor = async () => {
      setUserProfileLoading(true)

      try {
        const docRef = doc(FIRESTORE_DB, 'users', userId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          setUserProfile(docSnap.data() as UserProfile)
        } else {
          setError('Document does not exist')
        }
        setUserProfileLoading(false)
      } catch (error: any) {
        setError(error.message)
        setUserProfileLoading(false)
      }
    }

    fetchAuthor()
  }, [userId])

  return { userProfile, userProfileLoading, error }
}