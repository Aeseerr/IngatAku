// =========================
// MEAN
// =========================
export function mean(data) {

  if (!data.length) return 0

  const total =
    data.reduce((a, b) => a + b, 0)

  return total / data.length
}

// =========================
// MEDIAN
// =========================
export function median(data) {

  if (!data.length) return 0

  const sorted =
    [...data].sort((a, b) => a - b)

  const middle =
    Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 0) {

    return (
      sorted[middle - 1] +
      sorted[middle]
    ) / 2
  }

  return sorted[middle]
}

// =========================
// MODUS
// =========================
export function modus(data) {

  if (!data.length) return 0

  const count = {}

  let maxCount = 0

  let mode = null

  data.forEach(item => {

    count[item] =
      (count[item] || 0) + 1

    if (count[item] > maxCount) {

      maxCount = count[item]

      mode = item
    }

  })

  return mode
}

// =========================
// MIN
// =========================
export function min(data) {

  if (!data.length) return 0

  return Math.min(...data)
}

// =========================
// MAX
// =========================
export function max(data) {

  if (!data.length) return 0

  return Math.max(...data)
}

// =========================
// RANGE
// =========================
export function range(data) {

  return max(data) - min(data)
}

// =========================
// VARIANCE
// =========================
export function variance(data) {

  if (data.length <= 1) return 0

  const avg = mean(data)

  const squaredDiffs =
    data.map(value =>
      Math.pow(value - avg, 2)
    )

  return (
    squaredDiffs.reduce((a, b) => a + b, 0)
    / (data.length - 1)
  )
}

// =========================
// STANDARD DEVIATION
// =========================
export function standardDeviation(data) {

  return Math.sqrt(
    variance(data)
  )
}

// =========================
// PROBABILITY OF HIGH
// =========================
export function probabilityHighPriority(activities) {

  if (!activities.length) return 0

  const high =
    activities.filter(
      item =>
        item.priority_level === 'Tinggi'
    )

  return (
    high.length / activities.length
  ) * 100
}