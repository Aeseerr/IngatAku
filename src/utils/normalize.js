// =======================================
// NORMALIZE STRING
// =======================================
function cleanString(value) {

  return String(value || '')
    .trim()

}

// =======================================
// NORMALIZE NUMBER
// =======================================
function cleanNumber(value) {

  return Number(value || 0)

}

// =======================================
// NORMALIZE PRIORITY
// =======================================
export function normalizePriority(value) {

  const normalized =
    cleanString(value)
      .toLowerCase()

  if (normalized === 'tinggi') {
    return 'Tinggi'
  }

  if (
    normalized === 'sedang'
    ||
    normalized === 'normal'
  ) {
    return 'Normal'
  }

  return 'Rendah'
}

// =======================================
// NORMALIZE STATUS
// =======================================
export function normalizeStatus(value) {

  const normalized =
    cleanString(value)
      .toLowerCase()

  if (normalized === 'selesai') {
    return 'Selesai'
  }

  return 'Belum'
}

// =======================================
// NORMALIZE JENIS
// =======================================
export function normalizeJenis(value) {

  const normalized =
    cleanString(value)
      .toLowerCase()

  if (normalized === 'pekerjaan') {
    return 'Pekerjaan'
  }

  if (normalized === 'kelompok') {
    return 'Kelompok'
  }

  if (normalized === 'hiburan') {
    return 'Hiburan'
  }

  return 'Individu'
}

// =======================================
// SANITIZE ACTIVITY
// =======================================
export function sanitizeActivity(item) {

  return {

    id:
      cleanString(item.id),

    user_id:
      cleanString(item.user_id),

    name:
      cleanString(item.name)
      || 'Tanpa Nama',

    jenis:
      normalizeJenis(item.jenis),

    tenggat_waktu:
      cleanNumber(item.tenggat_waktu),

    dampak_nilai:
      cleanString(item.dampak_nilai)
      || 'Rendah',

    ketergantungan_tim:
      cleanString(
        item.ketergantungan_tim
      ) || 'Tidak',

    konsekuensi_telat:
      cleanString(
        item.konsekuensi_telat
      ) || 'Rendah',

    beban_sks:
      cleanNumber(item.beban_sks),

    score:
      cleanNumber(item.score),

    priority_level:
      normalizePriority(
        item.priority_level
      ),

    status:
      normalizeStatus(item.status),

    created_at:
      cleanString(item.created_at)

  }
}