import { Bell, AlertTriangle, Clock3, CheckCheck } from 'lucide-react'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import PageContainer from '../components/layout/PageContainer'
import { generateNotifications, getNotificationType } from '../utils/notificationEngine'
import { markActivitiesAsRead, markActivityAsRead } from '../services/activityService'

export default function Notifikasi({ activities = [], loading = false, updateActivityLocal, updateManyActivitiesLocal }) {
  const [savingId, setSavingId] = useState(null)
  const notifications = useMemo(() => generateNotifications(activities), [activities])

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
    try {
      const ids = notifications.map(item => item.id)
      const updatedRows = await markActivitiesAsRead(ids)
      updateManyActivitiesLocal?.(updatedRows)
      toast.success('Semua notifikasi ditandai dibaca')
    } catch (err) {
      toast.error(err.message || 'Gagal menandai semua notifikasi')
    }
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="min-h-[60vh] flex items-center justify-center text-slate-500">Memuat notifikasi...</div>
      </PageContainer>
    )
  }

  if (!notifications.length) {
    return (
      <PageContainer>
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
            <Bell className="h-10 w-10 text-indigo-600" />
          </div>
          <h1 className="mt-6 text-3xl font-black text-slate-900">Semua notifikasi selesai</h1>
          <p className="mt-3 max-w-md leading-relaxed text-slate-500">
            Tidak ada kegiatan prioritas tinggi atau deadline dekat yang membutuhkan perhatian.
          </p>
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
                <p className="mt-2 text-slate-500">Pantau kegiatan penting yang perlu segera dikerjakan.</p>
              </div>
            </div>

            <button
              onClick={handleMarkAllAsRead}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 font-semibold text-emerald-600 transition hover:bg-emerald-100"
            >
              <CheckCheck className="h-5 w-5" />
              Tandai Semua Dibaca
            </button>
          </div>
        </section>

        <div className="space-y-4">
          {notifications.map(item => {
            const type = getNotificationType(item)
            const danger = type === 'deadline'
            return (
              <div key={item.id} className="relative overflow-hidden rounded-[30px] border border-red-100 bg-white shadow-sm">
                <div className={`absolute bottom-0 left-0 top-0 w-1.5 ${danger ? 'bg-orange-500' : 'bg-red-500'}`} />
                <div className="flex flex-col justify-between gap-5 p-6 lg:flex-row lg:items-start">
                  <div className="flex gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${danger ? 'bg-orange-100 text-orange-500' : 'bg-red-100 text-red-500'}`}>
                      <AlertTriangle className="h-6 w-6" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-2xl font-black text-slate-900">{item.name}</h2>
                        <div className={`rounded-full px-3 py-1 text-sm font-bold text-white ${danger ? 'bg-orange-500' : 'bg-red-500'}`}>
                          SKOR: {Number(item.score ?? 0).toFixed(1)}
                        </div>
                      </div>

                      <p className="mt-3 text-slate-600">{item.message}</p>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <MetaTag icon={<Clock3 className="h-4 w-4" />}>{item.tenggat_waktu} hari</MetaTag>
                        <MetaTag>{item.jenis}</MetaTag>
                        <MetaTag>{item.priority_level}</MetaTag>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleMarkAsRead(item.id)}
                    disabled={savingId === item.id}
                    className="h-11 rounded-2xl bg-indigo-600 px-5 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
                  >
                    {savingId === item.id ? 'Menyimpan...' : 'Tandai Dibaca'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
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
