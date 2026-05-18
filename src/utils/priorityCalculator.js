// =======================================
// PRIORITY SCORE CALCULATOR
// Rumus mengikuti spreadsheet:
// Tenggat 40%, Dampak 15%, Ketergantungan 15%, Konsekuensi 20%, Beban 5%, Jenis 5%
// =======================================

export const PRIORITY_WEIGHTS = {
  tenggat: 0.4,
  dampak: 0.15,
  ketergantungan: 0.15,
  konsekuensi: 0.2,
  beban: 0.05,
  jenis: 0.05,
}

export const dampakMap = {
  Tinggi: 1,
  Sedang: 0.75,
  Rendah: 0.25,
  'Tidak ada': 0,
  'Tidak Ada': 0,
}

export const ketergantunganMap = {
  Ya: 1,
  Tidak: 0.5,
}

export const konsekuensiMap = {
  Tinggi: 1,
  Sedang: 0.5,
  Rendah: 0.25,
  'Tidak ada': 0,
  'Tidak Ada': 0,
}

export const bebanMap = {
  3: 1,
  2: 0.5,
  1: 0.25,
  0: 0,
  'Tidak ada': 0,
  'Tidak Ada': 0,
}

export const jenisMap = {
  Kelompok: 1,
  Pekerjaan: 1,
  Individu: 0.75,
  Hiburan: 0.05,
}

export function getTenggatValue(tenggatWaktu) {
  const days = Number(tenggatWaktu ?? 0)

  if (!days || days <= 0) return 0
  if (days <= 2) return 1
  if (days <= 4) return 0.75
  if (days <= 7) return 0.3
  if (days <= 14) return 0.05

  return 0
}

function getMappedValue(map, value) {
  return Number(map[value] ?? 0)
}

export function getPriorityBreakdown(tenggatWaktu, dampak, ketergantungan, konsekuensi, beban, jenis) {
  const raw = {
    tenggat: getTenggatValue(tenggatWaktu),
    dampak: getMappedValue(dampakMap, dampak),
    ketergantungan: getMappedValue(ketergantunganMap, ketergantungan),
    konsekuensi: getMappedValue(konsekuensiMap, konsekuensi),
    beban: getMappedValue(bebanMap, Number(beban ?? 0)),
    jenis: getMappedValue(jenisMap, jenis),
  }

  const weighted = {
    tenggat: raw.tenggat * PRIORITY_WEIGHTS.tenggat * 100,
    dampak: raw.dampak * PRIORITY_WEIGHTS.dampak * 100,
    ketergantungan: raw.ketergantungan * PRIORITY_WEIGHTS.ketergantungan * 100,
    konsekuensi: raw.konsekuensi * PRIORITY_WEIGHTS.konsekuensi * 100,
    beban: raw.beban * PRIORITY_WEIGHTS.beban * 100,
    jenis: raw.jenis * PRIORITY_WEIGHTS.jenis * 100,
  }

  const score = Object.values(weighted).reduce((total, value) => total + value, 0)

  return {
    raw,
    weighted,
    score: Number(score.toFixed(1)),
  }
}

export function calculatePriorityScore(tenggatWaktu, dampak, ketergantungan, konsekuensi, beban, jenis) {
  return getPriorityBreakdown(tenggatWaktu, dampak, ketergantungan, konsekuensi, beban, jenis).score
}

export function getPriorityLevel(score) {
  const value = Number(score ?? 0)

  if (value >= 70) return 'Tinggi'
  if (value >= 50) return 'Sedang'

  return 'Rendah'
}

export function getPriorityColor(level) {
  switch (level) {
    case 'Tinggi':
      return 'bg-red-500 text-white'
    case 'Sedang':
      return 'bg-yellow-400 text-slate-900'
    default:
      return 'bg-emerald-500 text-white'
  }
}

export function getPriorityTextColor(level) {
  switch (level) {
    case 'Tinggi':
      return 'text-red-600'
    case 'Sedang':
      return 'text-amber-600'
    default:
      return 'text-emerald-600'
  }
}
