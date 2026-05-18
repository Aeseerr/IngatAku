// =======================
// MAP
// =======================
const dampakMap = {

  Tinggi: 1,
  Sedang: 0.75,
  Rendah: 0.25,
  "Tidak ada": 0

}

const ketergantunganMap = {

  Ya: 1,
  Tidak: 0.5

}

const konsekuensiMap = {

  Tinggi: 1,
  Sedang: 0.5,
  Rendah: 0.25,
  "Tidak ada": 0

}

const jenisMap = {

  Kelompok: 1,
  Pekerjaan: 1,
  Individu: 0.75,
  Hiburan: 0.05

}

const bebanMap = {

  3: 1,
  2: 0.5,
  1: 0.25,
  0: 0

}

// =======================
// DEADLINE SCORE
// =======================
function hitungBobotDeadline(hari) {

  if (hari <= 2) return 1

  if (hari <= 4) return 0.75

  if (hari <= 7) return 0.3

  if (hari <= 14) return 0.05

  return 0
}

// =======================
// PRIORITY ENGINE
// =======================
export function hitungPrioritas(data) {

  const deadline =
    hitungBobotDeadline(data.tenggat_waktu) * 0.4

  const dampak =
    (dampakMap[data.dampak_nilai] || 0) * 0.15

  const ketergantungan =
    (ketergantunganMap[data.ketergantungan_tim] || 0) * 0.15

  const konsekuensi =
    (konsekuensiMap[data.konsekuensi_telat] || 0) * 0.2

  const beban =
    (bebanMap[data.beban_sks] || 0) * 0.05

  const jenis =
    (jenisMap[data.jenis] || 0) * 0.05

  return (

    deadline +
    dampak +
    ketergantungan +
    konsekuensi +
    beban +
    jenis

  ) * 100
}

// =======================
// PRIORITY CATEGORY
// =======================
export function kategoriPrioritas(score) {

  if (score >= 70) {
    return 'Tinggi'
  }

  if (score >= 50) {
    return 'Sedang'
  }

  return 'Rendah'
}