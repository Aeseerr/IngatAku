import { calculatePriorityScore, getPriorityLevel } from './priorityCalculator'
import { getDeadlineLabel, getDeadlineStatus, getRemainingDays } from './deadlineUtils'

export function mapActivityWithLiveDeadline(activity) {
  const hasDeadline = Boolean(activity.deadline_date)
  const remainingDays = hasDeadline ? getRemainingDays(activity.deadline_date) : 0

  const liveScore = calculatePriorityScore(
    remainingDays,
    activity.dampak_nilai,
    activity.ketergantungan_tim,
    activity.konsekuensi_telat,
    activity.beban_sks,
    activity.jenis,
  )

  return {
    ...activity,

    // data live
    remaining_days: remainingDays,
    deadline_label: getDeadlineLabel(remainingDays, hasDeadline),
    deadline_status: getDeadlineStatus(remainingDays, hasDeadline),

    // skor live yang berubah mengikuti deadline
    live_score: liveScore,
    live_priority_level: getPriorityLevel(liveScore),
  }
}

export function mapActivitiesWithLiveDeadline(activities = []) {
  return activities.map(mapActivityWithLiveDeadline)
}
