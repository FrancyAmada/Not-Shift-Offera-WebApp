import React, { PropsWithChildren, createContext, useContext, useState } from 'react'

export const PostContext = createContext({
  newPostAdded: false,
  setNewPostAdded: (value: boolean) => {},
})

export const PostProvider = ({ children }: PropsWithChildren) => {
  const [newPostAdded, setNewPostAdded] = useState(false)

  return <PostContext.Provider value={{ newPostAdded, setNewPostAdded }}>{children}</PostContext.Provider>
}

export const usePostContext = () => {
  const value = useContext(PostContext)
  if (value === undefined) {
    console.log('usePostState must be used within an PostProvider')
    throw new Error('usePostState  must be used within an PostProvider')
  }
  return value
}
