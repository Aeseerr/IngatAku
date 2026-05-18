export function isUnreadNotification(activity) {
  if (!activity || activity.status === 'Selesai' || activity.is_read === true) return false

  const score = Number(activity.score ?? 0)
  const days = Number(activity.tenggat_waktu ?? 999)

  return activity.priority_level === 'Tinggi' || score >= 70 || (days > 0 && days <= 2)
}

export function getNotificationType(activity) {
  const days = Number(activity.tenggat_waktu ?? 999)
  if (days > 0 && days <= 2) return 'deadline'
  if (activity.priority_level === 'Tinggi' || Number(activity.score ?? 0) >= 70) return 'high'
  return 'info'
}

export function generateNotifications(activities = []) {
  return activities
    .filter(isUnreadNotification)
    .map(activity => {
      const type = getNotificationType(activity)
      return {
        ...activity,
        notifType: type,
        title: type === 'deadline' ? 'Deadline Dekat' : 'Prioritas Tinggi',
        message:
          type === 'deadline'
            ? `${activity.name} memiliki tenggat ${activity.tenggat_waktu} hari lagi.`
            : `${activity.name} perlu segera dikerjakan karena skornya tinggi.`,
      }
    })
    .sort((a, b) => Number(b.score ?? 0) - Number(a.score ?? 0))
}
