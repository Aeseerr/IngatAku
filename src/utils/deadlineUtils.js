export function addDaysToDate(days) {
  const totalDays = Number(days)

  if (!Number.isFinite(totalDays) || totalDays <= 0) {
    return null
  }

  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + totalDays)

  return date.toISOString().split('T')[0]
}

export function getRemainingDays(deadlineDate) {
  if (!deadlineDate) return 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const deadline = new Date(deadlineDate)
  deadline.setHours(0, 0, 0, 0)

  const diffTime = deadline.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return diffDays
}

export function getDeadlineLabel(remainingDays, hasDeadline = true) {
  if (!hasDeadline) return 'Tidak ada deadline'

  if (remainingDays < 0) {
    return `Terlambat ${Math.abs(remainingDays)} hari`
  }

  if (remainingDays === 0) {
    return 'Deadline hari ini'
  }

  return `${remainingDays} hari lagi`
}

export function getDeadlineStatus(remainingDays, hasDeadline = true) {
  if (!hasDeadline) return 'none'
  if (remainingDays < 0) return 'overdue'
  if (remainingDays === 0) return 'today'
  if (remainingDays <= 2) return 'soon'
  return 'safe'
}