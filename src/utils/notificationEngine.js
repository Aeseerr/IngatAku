export function isNotificationCandidate(activity) {
  if (!activity) return false
  if (activity.status === 'Selesai') return false
  if (activity.is_notification_deleted === true) return false

  const score = Number(activity.live_score ?? activity.score ?? 0)
  const remainingDays = Number(activity.remaining_days ?? 999)
  const hasDeadline = Boolean(activity.deadline_date)

  return (
    activity.live_priority_level === 'Tinggi' ||
    score >= 70 ||
    (hasDeadline && remainingDays <= 2)
  )
}

export function isUnreadNotification(activity) {
  return isNotificationCandidate(activity) && activity.is_read !== true
}

export function isReadNotification(activity) {
  return isNotificationCandidate(activity) && activity.is_read === true
}

export function getNotificationType(activity) {
  const days = Number(activity.tenggat_waktu ?? 999)
  if (days > 0 && days <= 2) return 'deadline'
  if (activity.priority_level === 'Tinggi' || Number(activity.score ?? 0) >= 70) return 'high'
  return 'info'
}

export function generateNotifications(activities = []) {
  return activities
    .filter(isNotificationCandidate)
    .map(activity => {
      const remainingDays = Number(activity.remaining_days ?? 999)

      let message = `${activity.name} perlu segera dikerjakan karena skornya tinggi.`

      if (activity.deadline_status === 'overdue') {
        message = `${activity.name} sudah melewati deadline ${Math.abs(remainingDays)} hari.`
      } else if (activity.deadline_status === 'today') {
        message = `${activity.name} memiliki deadline hari ini.`
      } else if (activity.deadline_status === 'soon') {
        message = `${activity.name} memiliki deadline ${remainingDays} hari lagi.`
      }

      return {
        ...activity,
        score: activity.live_score ?? activity.score,
        priority_level: activity.live_priority_level ?? activity.priority_level,
        message,
      }
    })
    .sort((a, b) => {
      if (a.is_read !== b.is_read) return a.is_read ? 1 : -1
      return Number(b.live_score ?? b.score ?? 0) - Number(a.live_score ?? a.score ?? 0)
    })
}