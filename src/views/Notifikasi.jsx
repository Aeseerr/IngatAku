import { AlertTriangle, Bell, CheckCheck, Clock3, Filter, Trash2, ArrowUpDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import PageContainer from '../components/layout/PageContainer'
import { generateNotifications, getNotificationType } from '../utils/notificationEngine'
import {
  deleteNotification,
  deleteNotifications,
  markActivitiesAsRead,
  markActivityAsRead,
} from '../services/activityService'

export default function Notifikasi({
  activities = [],
  loading = false,
  updateActivityLocal,
  updateManyActivitiesLocal,
}) {
  const [savingId, setSavingId] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('score_desc')
  const [confirmAction, setConfirmAction] = useState(null)

  const allNotifications = useMemo(() => generateNotifications(activities), [activities])

  const unreadCount = allNotifications.filter(item => !item.is_read).length
  const readCount = allNotifications.filter(item => item.is_read).length

  const filteredNotifications = useMemo(() => {
    let result = [...allNotifications]

    if (filterStatus === 'unread') {
      result = result.filter(item => !item.is_read)
    }

    if (filterStatus === 'read') {
      result = result.filter(item => item.is_read)
    }

    if (sortBy === 'score_desc') {
      result.sort((a, b) => Number(b.score ?? 0) - Number(a.score ?? 0))
    }

    if (sortBy === 'deadline_asc') {
      result.sort((a, b) => Number(a.tenggat_waktu ?? 999) - Number(b.tenggat_waktu ?? 999))
    }

    if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }

    return result
  }, [allNotifications, filterStatus, sortBy])

  async function handleMarkAsRead(id) {
    try {
      setSavingId(id)
      const updated = await markActivityAsRead(id)
      updateActivityLocal?.(updated)
      toast.success('Notifikasi ditandai dibaca')
    } catch (err) {
      toast.error(err.message || 'Gagal menandai notifikasi')
    } finally {
      setSavingId(null)
    }
  }

  async function handleMarkAllAsRead() {
    const ids = allNotifications.filter(item => !item.is_read).map(item => item.id)

    if (!ids.length) {
      toast('Tidak ada notifikasi yang belum dibaca')
      return
    }

    try {
      const updatedRows = await markActivitiesAsRead(ids)
      updateManyActivitiesLocal?.(updatedRows)
      toast.success('Semua notifikasi ditandai dibaca')
    } catch (err) {
      toast.error(err.message || 'Gagal menandai semua notifikasi')
    }
  }

  function askDeleteNotification(item) {
    setConfirmAction({
      type: 'single',
      ids: [item.id],
      title: 'Hapus notifikasi ini?',
      description: `Notifikasi "${item.name}" akan dihapus dari halaman notifikasi, tetapi data kegiatannya tetap tersimpan.`,
    })
  }

  function askDeleteReadNotifications() {
    const ids = allNotifications.filter(item => item.is_read).map(item => item.id)

    if (!ids.length) {
      toast('Belum ada notifikasi yang sudah dibaca')
      return
    }

    setConfirmAction({
      type: 'bulk',
      ids,
      title: 'Hapus semua notifikasi yang sudah dibaca?',
      description: `${ids.length} notifikasi yang sudah dibaca akan dihapus dari halaman notifikasi. Data kegiatan tetap tersimpan.`,
    })
  }

  async function confirmDelete() {
    if (!confirmAction?.ids?.length) return

    try {
      if (confirmAction.type === 'single') {
        const updated = await deleteNotification(confirmAction.ids[0])
        updateActivityLocal?.(updated)
        toast.success('Notifikasi berhasil dihapus')
      } else {
        const updatedRows = await deleteNotifications(confirmAction.ids)
        updateManyActivitiesLocal?.(updatedRows)
        toast.success('Notifikasi yang sudah dibaca berhasil dihapus')
      }
    } catch (err) {
      toast.error(err.message || 'Gagal menghapus notifikasi')
    } finally {
      setConfirmAction(null)
    }
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="min-h-[60vh] flex items-center justify-center text-slate-500">
          Memuat notifikasi...
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <section className="rounded-[28px] border border-slate-200 bg-white p-6">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                <Bell className="h-7 w-7 text-indigo-600" />
              </div>

              <div>
                <p className="text-sm font-semibold text-indigo-600">NOTIFICATION CENTER</p>
                <h1 className="text-4xl font-black text-slate-900">Notifikasi</h1>
                <p className="mt-2 text-slate-500">
                  Pantau kegiatan penting yang perlu segera dikerjakan.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={askDeleteReadNotifications}
                disabled={readCount === 0}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-rose-100 bg-rose-50 px-5 font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 className="h-5 w-5" />
                Hapus Dibaca
              </button>

              <button
                onClick={handleMarkAllAsRead}
                disabled={unreadCount === 0}
                className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 font-semibold text-emerald-600 transition hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <CheckCheck className="h-5 w-5" />
                Tandai Semua Dibaca
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900">Filter Notifikasi</h2>
              <p className="text-sm text-slate-500">
                Pisahkan notifikasi yang sudah dibaca dan belum dibaca.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
                <Filter className="h-5 w-5 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                  className="h-full bg-transparent font-semibold text-slate-700 outline-none"
                >
                  <option value="all">Semua ({allNotifications.length})</option>
                  <option value="unread">Belum dibaca ({unreadCount})</option>
                  <option value="read">Sudah dibaca ({readCount})</option>
                </select>
              </div>

              <div className="flex h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
                <ArrowUpDown className="h-5 w-5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="h-full bg-transparent font-semibold text-slate-700 outline-none"
                >
                  <option value="score_desc">Skor tertinggi</option>
                  <option value="deadline_asc">Deadline terdekat</option>
                  <option value="latest">Terbaru</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {!allNotifications.length ? (
          <EmptyNotificationState
            title="Semua notifikasi selesai"
            description="Tidak ada kegiatan prioritas tinggi atau deadline dekat yang membutuhkan perhatian."
          />
        ) : !filteredNotifications.length ? (
          <EmptyNotificationState
            title="Tidak ada notifikasi"
            description="Tidak ada notifikasi yang sesuai dengan filter yang dipilih."
          />
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map(item => {
              const type = getNotificationType(item)
              const danger = type === 'deadline'
              const read = item.is_read === true

              return (
                <div
                  key={item.id}
                  className={`relative overflow-hidden rounded-[30px] border bg-white shadow-sm ${
                    read
                      ? 'border-slate-200 opacity-80'
                      : danger
                        ? 'border-orange-100'
                        : 'border-red-100'
                  }`}
                >
                  <div
                    className={`absolute bottom-0 left-0 top-0 w-1.5 ${
                      read ? 'bg-slate-300' : danger ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                  />

                  <div className="flex flex-col justify-between gap-5 p-6 lg:flex-row lg:items-start">
                    <div className="flex gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                          read
                            ? 'bg-slate-100 text-slate-500'
                            : danger
                              ? 'bg-orange-100 text-orange-500'
                              : 'bg-red-100 text-red-500'
                        }`}
                      >
                        <AlertTriangle className="h-6 w-6" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-2xl font-black text-slate-900">{item.name}</h2>

                          <div
                            className={`rounded-full px-3 py-1 text-sm font-bold text-white ${
                              read ? 'bg-slate-500' : danger ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                          >
                            SKOR: {Number(item.live_score ?? item.score ?? 0).toFixed(1)}
                          </div>

                          <div
                            className={`rounded-full px-3 py-1 text-sm font-bold ${
                              read
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-amber-50 text-amber-600'
                            }`}
                          >
                            {read ? 'Sudah dibaca' : 'Belum dibaca'}
                          </div>
                        </div>

                        <p className="mt-3 text-slate-600">{item.message}</p>

                        <div className="mt-5 flex flex-wrap gap-3">
                          <MetaTag icon={<Clock3 className="h-4 w-4" />}>
                            {item.deadline_label}
                          </MetaTag>
                          <MetaTag>{item.jenis}</MetaTag>
                          <MetaTag>{item.live_priority_level ?? item.priority_level}</MetaTag>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                      {!read && (
                        <button
                          onClick={() => handleMarkAsRead(item.id)}
                          disabled={savingId === item.id}
                          className="h-11 rounded-2xl bg-indigo-600 px-5 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
                        >
                          {savingId === item.id ? 'Menyimpan...' : 'Tandai Dibaca'}
                        </button>
                      )}

                      <button
                        onClick={() => askDeleteNotification(item)}
                        className="flex h-11 items-center justify-center gap-2 rounded-2xl border border-rose-100 bg-rose-50 px-5 font-semibold text-rose-600 transition hover:bg-rose-100"
                      >
                        <Trash2 className="h-4 w-4" />
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {confirmAction && (
        <ConfirmDialog
          title={confirmAction.title}
          description={confirmAction.description}
          onCancel={() => setConfirmAction(null)}
          onConfirm={confirmDelete}
        />
      )}
    </PageContainer>
  )
}

function MetaTag({ children, icon }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-600">
      {icon}
      {children}
    </div>
  )
}

function EmptyNotificationState({ title, description }) {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-200 bg-white p-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100">
        <Bell className="h-9 w-9 text-indigo-600" />
      </div>

      <h2 className="mt-6 text-2xl font-black text-slate-900">{title}</h2>
      <p className="mt-3 max-w-md leading-relaxed text-slate-500">{description}</p>
    </div>
  )
}

function ConfirmDialog({ title, description, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[28px] bg-white p-6 shadow-2xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
          <Trash2 className="h-7 w-7" />
        </div>

        <h3 className="mt-5 text-2xl font-black text-slate-900">{title}</h3>
        <p className="mt-3 leading-relaxed text-slate-500">{description}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={onCancel}
            className="h-12 rounded-2xl border border-slate-200 font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Tidak
          </button>

          <button
            onClick={onConfirm}
            className="h-12 rounded-2xl bg-rose-600 font-bold text-white transition hover:bg-rose-700"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  )
}