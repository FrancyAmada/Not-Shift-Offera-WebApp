import React, { PropsWithChildren, createContext, useContext, useState } from 'react'

export const PostContext = createContext({
  newPostChanges: false,
  setNewPostChanges: (value: boolean) => {},
})

export const PostProvider = ({ children }: PropsWithChildren) => {
  const [newPostChanges, setNewPostChanges] = useState(false)

  return <PostContext.Provider value={{ newPostChanges, setNewPostChanges }}>{children}</PostContext.Provider>
}

export const usePostContext = () => {
  const value = useContext(PostContext)
  if (value === undefined) {
    console.log('usePostState must be used within an PostProvider')
    throw new Error('usePostState  must be used within an PostProvider')
  }
  return value
}
