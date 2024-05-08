import { useEffect, useState } from 'react'

import {
  collection,
  query,
  getDocs,
  orderBy,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  Timestamp,
  QueryConstraint,
  where,
  deleteDoc,
} from 'firebase/firestore'
import { FIRESTORE_DB, FIREBASE_AUTH } from 'firebaseConfig'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { FIREBASE_STORAGE } from 'firebaseConfig'

import { usePostContext } from '@/providers/PostProvider'

import { UserProfile, Post } from '@/types'

export const useAddPost = () => {
  const { setNewPostChanges } = usePostContext()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
        acceptedApplicant: null,
        status: 'Active',
        createdAt: Timestamp.now(),
      } as Post)

      console.log('Document written with ID: ', newPostRef.id)
      setNewPostChanges(true)
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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPosts = async (type?: string, userId?: string, inMyApplications?: boolean, inSearchPage?: boolean) => {
    setLoading(true)
    setError(null)

    const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')]

    if (type) {
      constraints.push(where('type', '==', type))
    }

    if (!inMyApplications && userId && !inSearchPage) {
      constraints.push(where('authorId', '==', userId))
    }

    if (inMyApplications && userId && !inSearchPage) {
      constraints.push(where('applicants', 'array-contains', userId))
    }

    const q = query(collection(FIRESTORE_DB, 'posts'), ...constraints)

    try {
      const querySnapshot = await getDocs(q)
      const fetchedPosts: Post[] = querySnapshot.docs.map(doc => doc.data() as Post)
      setPosts(fetchedPosts)
      setLoading(false)
    } catch (err: any) {
      console.log('Error getting documents: ', err.message)
      setError(err.message)
      setLoading(false)
    }
  }

  return { fetchPosts, posts, loading, error }
}

export const usePost = (postId: string) => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPost = async (postId: string) => {
    setLoading(true)

    try {
      const docRef = doc(FIRESTORE_DB, 'posts', postId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setPost(docSnap.data() as Post)
        setError(null)
      } else {
        setError('Document does not exist')
      }
      setLoading(false)
    } catch (err: any) {
      console.log('Error getting document: ', err.message)
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPost(postId)
  }, [postId])

  return { post, loading, error }
}

export const useGetPost = () => {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPost = async (postId: string) => {
    setLoading(true)

    try {
      const docRef = doc(FIRESTORE_DB, 'posts', postId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setPost(docSnap.data() as Post)
      } else {
        setError('Document does not exist')
      }
      setLoading(false)
    } catch (error: any) {
      console.log('Error getting document: ', error.message)
      setError(error.message)
      setLoading(false)
    }
  }

  return { fetchPost, post, loading, error }
}

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: '',
    email: '',
    fullName: '',
    profileImg: undefined,
  })
  const [userProfileLoading, setUserProfileLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUser = async (userId: string) => {
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
  return { fetchUser, userProfile, userProfileLoading, error }
}

export const useUpdatePost = () => {
  const { setNewPostChanges } = usePostContext()
  const [updateLoading, setUpdateLoading] = useState(false)

  const updatePost = async (data: { title: string; rate: number; description: string }, postId: string) => {
    setUpdateLoading(true)

    try {
      const docRef = doc(FIRESTORE_DB, 'posts', postId)
      const updates = {} as Partial<Post>

      if (data.title !== undefined) updates.title = data.title
      if (data.rate !== undefined) updates.rate = data.rate
      if (data.description !== undefined) updates.description = data.description

      await updateDoc(docRef, updates)
      setNewPostChanges(true)
      setUpdateLoading(false)
      return { success: true, msg: 'Successfully updated your post', status: 'Resolved' }
    } catch (error: any) {
      setUpdateLoading(false)

      return { success: false, msg: String(error), status: 'Error' }
    }
  }

  return { updatePost, updateLoading }
}

export const useDeletePost = () => {
  const { setNewPostChanges } = usePostContext()
  const [deleteLoading, setDeleteLoading] = useState(false)

  const deletePost = async (postId: string) => {
    setDeleteLoading(true)

    try {
      const docRef = doc(FIRESTORE_DB, 'posts', postId)
      await deleteDoc(docRef)
      setNewPostChanges(true)
      setDeleteLoading(false)
      return { success: true, msg: 'Successfully deleted your post', status: 'Resolved' }
    } catch (error: any) {
      setDeleteLoading(false)
      return { success: false, msg: String(error), status: 'Error' }
    }
  }

  return { deletePost, deleteLoading }
}

export const useAcceptApplicant = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const acceptApplicant = async (postId: string, userId: string) => {
    setLoading(true)

    try {
      const postRef = doc(FIRESTORE_DB, 'posts', postId)

      await updateDoc(postRef, {
        acceptedApplicant: userId,
        applicants: [userId],
      })

      setLoading(false)
      return { success: true }
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
      return { success: false, message: err.message }
    }
  }

  return { acceptApplicant, loading, error }
}

export const useRemoveApplicant = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const removeApplicant = async (postId: string, userId: string) => {
    setLoading(true)

    try {
      const postRef = doc(FIRESTORE_DB, 'posts', postId)
      const postSnap = await getDoc(postRef)

      if (postSnap.exists()) {
        const post = postSnap.data()
        const updatedApplicants = post.applicants.filter((applicantId: string) => applicantId !== userId)

        await updateDoc(postRef, {
          applicants: updatedApplicants,
        })
      }

      setLoading(false)
      return { success: true }
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
      return { success: false, message: err.message }
    }
  }

  return { removeApplicant, loading, error }
}
