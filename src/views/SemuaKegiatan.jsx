import { useState } from 'react'
import toast from 'react-hot-toast'
import { CheckCircle2, Circle, Filter, Search, Trash2 } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import { deleteActivity, toggleActivityStatus } from '../services/activityService'

export default function SemuaKegiatan({ activities = [], loading = false, updateActivityLocal, removeActivityLocal }) {
  const [search, setSearch] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('Semua')

  async function handleDelete(id) {
    if (!confirm('Hapus kegiatan ini?')) return

    try {
      await deleteActivity(id)
      removeActivityLocal?.(id)
      toast.success('Kegiatan berhasil dihapus')
    } catch (err) {
      toast.error(err.message || 'Gagal menghapus kegiatan')
    }
  }

  async function handleToggle(activity) {
    try {
      const updated = await toggleActivityStatus(activity)
      updateActivityLocal?.(updated)
      toast.success('Status berhasil diperbarui')
    } catch (err) {
      toast.error(err.message || 'Gagal memperbarui status')
    }
  }

  const filteredActivities = activities.filter(activity => {
    const keyword = search.trim().toLowerCase()
    const matchSearch = !keyword || activity.name?.toLowerCase().includes(keyword) || activity.jenis?.toLowerCase().includes(keyword)
    const matchPriority = priorityFilter === 'Semua' || activity.priority_level === priorityFilter
    return matchSearch && matchPriority
  })

  function getPriorityColor(level) {
    switch (level) {
      case 'Tinggi':
        return 'bg-rose-500 text-white'
      case 'Sedang':
      case 'Normal':
        return 'bg-amber-400 text-black'
      case 'Rendah':
        return 'bg-emerald-500 text-white'
      default:
        return 'bg-slate-200 text-slate-700'
    }
  }

  if (loading) {
    return (
      <PageContainer>
        <div className="flex min-h-[60vh] items-center justify-center text-lg text-slate-500">Loading kegiatan...</div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-[34px] font-bold leading-tight text-slate-900">Semua Kegiatan</h1>
            <p className="mt-2 text-base text-slate-500">Kelola dan pantau seluruh kegiatan Anda.</p>
          </div>

          <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row lg:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Cari kegiatan..." value={search} onChange={e => setSearch(e.target.value)} className="app-input with-icon" />
            </div>

            <div className="relative w-full sm:w-auto">
              <Filter className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <select value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="app-input with-icon">
                <option>Semua</option>
                <option>Tinggi</option>
                <option>Sedang</option>
                <option>Rendah</option>
              </select>
            </div>
          </div>
        </div>

        <div className="hidden overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm lg:block">
          <div className="grid grid-cols-[90px_1.8fr_1fr_1fr_1fr_80px] gap-4 border-b border-slate-100 px-8 py-5 text-sm font-semibold text-slate-700">
            <div>Status</div>
            <div>Nama Kegiatan</div>
            <div>Prioritas</div>
            <div>Tenggat</div>
            <div>Skor</div>
            <div>Aksi</div>
          </div>

          {!filteredActivities.length && <div className="flex items-center justify-center py-20 text-slate-500">Tidak ada kegiatan.</div>}

          {filteredActivities.map(activity => {
            const isDone = activity.status === 'Selesai'
            return (
              <div key={activity.id} className="grid grid-cols-[90px_1.8fr_1fr_1fr_1fr_80px] items-center gap-4 border-b border-slate-100 px-8 py-6 last:border-b-0">
                <button onClick={() => handleToggle(activity)} className="w-fit">
                  {isDone ? <CheckCircle2 className="h-6 w-6 text-emerald-500" /> : <Circle className="h-6 w-6 text-slate-300" />}
                </button>

                <div>
                  <h3 className={`text-lg font-semibold ${isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{activity.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{activity.jenis}</p>
                </div>

                <div>
                  <span className={`rounded-full px-4 py-2 text-sm font-semibold ${getPriorityColor(activity.priority_level)}`}>{activity.priority_level}</span>
                </div>
                <div className="text-slate-600">{activity.tenggat_waktu} hari</div>
                <div className="font-semibold text-slate-800">{Number(activity.score ?? 0).toFixed(1)}</div>
                <button onClick={() => handleDelete(activity.id)} className="flex h-10 w-10 items-center justify-center rounded-xl text-rose-500 hover:bg-rose-50">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            )
          })}
        </div>

        <div className="grid gap-4 lg:hidden">
          {!filteredActivities.length && <div className="rounded-[30px] border border-slate-200 bg-white p-8 text-center text-slate-500">Tidak ada kegiatan.</div>}
          {filteredActivities.map(activity => {
            const isDone = activity.status === 'Selesai'
            return (
              <div key={activity.id} className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className={`text-lg font-bold ${isDone ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{activity.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{activity.jenis}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${getPriorityColor(activity.priority_level)}`}>{activity.priority_level}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
                  <div className="rounded-2xl bg-slate-50 p-3">Tenggat: {activity.tenggat_waktu} hari</div>
                  <div className="rounded-2xl bg-slate-50 p-3">Skor: {Number(activity.score ?? 0).toFixed(1)}</div>
                </div>

                <div className="mt-4 flex gap-3">
                  <button onClick={() => handleToggle(activity)} className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-4 py-3 font-semibold text-white">
                    {isDone ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
                    {isDone ? 'Selesai' : 'Belum'}
                  </button>
                  <button onClick={() => handleDelete(activity.id)} className="flex items-center justify-center rounded-2xl bg-rose-50 px-4 py-3 text-rose-600">
                    <Trash2 className="h-5 w-5" />
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
