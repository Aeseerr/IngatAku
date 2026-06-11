import { supabase } from '../lib/supabase'
import { addDaysToDate } from '../utils/deadlineUtils'
import { calculatePriorityScore, getPriorityLevel } from '../utils/priorityCalculator'

const TABLE = 'kegiatan'

function toNumber(value, fallback = 0) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function buildActivityPayload(form, userId) {
  const tenggatWaktu = toNumber(form.tenggatWaktu ?? form.tenggat_waktu, 0)
  const beban = toNumber(form.beban ?? form.beban_sks, 0)
  const dampak = form.dampak ?? form.dampak_nilai ?? 'Tidak ada'
  const ketergantungan = form.ketergantungan ?? form.ketergantungan_tim ?? 'Tidak'
  const konsekuensi = form.konsekuensi ?? form.konsekuensi_telat ?? 'Tidak ada'
  const jenis = form.jenis ?? 'Pekerjaan'
  const deadlineDate = addDaysToDate(tenggatWaktu)

  const score = calculatePriorityScore(tenggatWaktu, dampak, ketergantungan, konsekuensi, beban, jenis)

return {
  user_id: userId,
  name: String(form.name ?? '').trim(),
  jenis,
  tenggat_waktu: tenggatWaktu,
  deadline_date: deadlineDate,
  dampak_nilai: dampak,
  ketergantungan_tim: ketergantungan,
  konsekuensi_telat: konsekuensi,
  beban_sks: beban,
  score,
  priority_level: getPriorityLevel(score),
  status: form.status ?? 'Belum',
  is_read: false,
  is_notification_deleted: false,
  }
}

export async function createActivity(form, user) {
  if (!user?.id) throw new Error('User tidak ditemukan. Silakan login ulang.')

  const payload = buildActivityPayload(form, user.id)
  if (!payload.name) throw new Error('Nama kegiatan wajib diisi')

  const { data, error } = await supabase.from(TABLE).insert(payload).select('*').single()

  if (error) throw error
  return data
}

export async function getActivities(userId) {
  if (!userId) return []

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .order('priority_level', { ascending: true })
    .order('score', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function deleteActivity(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

export async function toggleActivityStatus(activity) {
  const nextStatus = activity.status === 'Selesai' ? 'Belum' : 'Selesai'

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      status: nextStatus,
      is_read: nextStatus === 'Selesai' ? true : activity.is_read,
    })
    .eq('id', activity.id)
    .select('*')
    .single()

  if (error) throw error
  return data
}

export async function markActivityAsRead(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ is_read: true })
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data
}

export async function markActivitiesAsRead(ids) {
  if (!ids.length) return []

  const { data, error } = await supabase
    .from(TABLE)
    .update({ is_read: true })
    .in('id', ids)
    .select('*')

  if (error) throw error
  return data ?? []
}

export async function deleteNotification(id) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ is_notification_deleted: true })
    .eq('id', id)
    .select('*')
    .single()

  if (error) throw error
  return data
}

export async function deleteNotifications(ids) {
  if (!ids.length) return []

  const { data, error } = await supabase
    .from(TABLE)
    .update({ is_notification_deleted: true })
    .in('id', ids)
    .select('*')

  if (error) throw error
  return data ?? []
}