import { Post } from '@/types'
import { Timestamp } from 'firebase/firestore'

export const dummyPosts = Array.from(
  { length: 5 },
  _ =>
    ({
      authorId: '...',
      type: 'Task',
      postId: `...`,
      title: '...',
      description: '...',
      imageList: [],
      rate: 0,
      createdAt: Timestamp.now(),
      applicants: [],
      status: 'Pending',
    }) as Post,
)
