import { Timestamp } from 'firebase/firestore'

export const getTimeAgo = (timestamp: Timestamp): string => {
  const now = new Date().getTime()
  const difference = now - timestamp.toDate().getTime()

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const month = 30 * day
  const year = 365 * day

  if (difference < minute) {
    const seconds = Math.floor(difference / 1000)
    return `${seconds}s`
  } else if (difference < hour) {
    const minutes = Math.floor(difference / minute)
    return `${minutes}m`
  } else if (difference < day) {
    const hours = Math.floor(difference / hour)
    return `${hours}h`
  } else if (difference < month) {
    const days = Math.floor(difference / day)
    return `${days}d`
  } else if (difference < year) {
    const months = Math.floor(difference / month)
    return `${months}mo`
  } else {
    const years = Math.floor(difference / year)
    return `${years}y`
  }
}
