import { User } from 'firebase/auth'
import { Timestamp } from 'firebase/firestore'

export type AuthStatus = 'Idle' | 'Resolved' | 'Error'

export type AuthResponse = {
  success?: boolean
  msg?: string
  status: AuthStatus
}

export type PostStatus = 'Active' | 'Pending' | 'Completed' | 'Cancelled'

export type ApplicationStatus = 'Pending' | 'Accepted' | 'Rejected'

export type Post = {
  authorId: string
  type: 'Task' | 'Service'
  postId: string
  title: string
  description: string
  imageList: string[]
  rate: number
  createdAt: Timestamp
  applicants: string[]
  status: PostStatus
}

export type UserProfile = {
  fullName: string
  email: string
  userId: string
  profileImg?: string | undefined
  lastMessage?: string
  lastMessageTimestamp?: Date | null
}

export type AuthData = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  logIn: (data: { email: string; password: string }) => Promise<AuthResponse>
  signUp: (data: { fullName: string; email: string; password: string }) => Promise<AuthResponse>
  logOut: () => Promise<AuthResponse>
}
