import {

  mean,
  median,
  modus,
  min,
  max,
  range,
  variance,
  standardDeviation,
  probabilityHighPriority

} from '../utils/statistics'

export function useStatistics(activities) {

  const scores =
    activities.map(
      item => item.score || 0
    )

  return {

    mean:
      mean(scores),

    median:
      median(scores),

    modus:
      modus(scores),

    min:
      min(scores),

    max:
      max(scores),

    range:
      range(scores),

    variance:
      variance(scores),

    standardDeviation:
      standardDeviation(scores),

    probabilityHigh:
      probabilityHighPriority(
        activities
      )

  }
}