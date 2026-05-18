import { useActivities }
from './useActivities'

import { generateNotifications }
from '../utils/notificationEngine'

export function useNotifications(user) {

  const {

    activities,
    loading

  } = useActivities(user)

  const notifications =
    generateNotifications(
      activities
    )

  return {

    notifications,
    loading

  }
}