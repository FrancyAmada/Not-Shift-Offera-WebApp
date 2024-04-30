import { User } from 'firebase/auth'

export interface UserProfile extends User {
  userId: string
  fullName: string
  profileImg: string
}

export type AuthStatus = 'Idle' | 'Resolved' | 'Error'

export type AuthResponse = {
  success?: boolean
  msg?: string
  status: AuthStatus
}

export type PostStatus = 'Active' | 'Pending' | 'Completed' | 'Cancelled'

export type ApplicationStatus = 'Pending' | 'Accepted' | 'Rejected'

export type Post = {
  author: UserProfile
  type: 'task' | 'service'
  id: number
  title: string
  description: string
  imageList: string[]
  rate: number
  createdAt: string
  applicants: User[]
  status: PostStatus
}

export type AuthData = {
  user: User | null
  isAuthenticated: boolean
  logIn: (data: { email: string; password: string }) => Promise<AuthResponse>
  signUp: (data: { fullName: string; email: string; password: string }) => Promise<AuthResponse>
  logOut: () => Promise<AuthResponse>
}
