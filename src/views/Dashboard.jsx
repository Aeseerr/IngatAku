import { AlertTriangle, ArrowRight, CalendarDays, CheckCircle2, Clock3, ListTodo } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'
import StatCard from '../components/dashboard/StatCard'
import CompletionChart from '../components/dashboard/CompletionChart'
import { getPriorityColor } from '../utils/priorityCalculator'

export default function Dashboard({ activities = [], loading = false, error = null }) {
  const navigate = useNavigate()

  const activeActivities = activities.filter(item => item.status !== 'Selesai')
  const highPriority = activities.filter(item => item.priority_level === 'Tinggi')
  const normalPriority = activities.filter(item => item.priority_level === 'Sedang')
  const lowPriority = activities.filter(item => item.priority_level === 'Rendah')
  const completed = activities.filter(item => item.status === 'Selesai')

  const urgentTasks = [...activeActivities]
    .sort((a, b) => {
      const scoreDiff = Number(b.score ?? 0) - Number(a.score ?? 0)
      if (scoreDiff !== 0) return scoreDiff
      return Number(a.tenggat_waktu ?? 999) - Number(b.tenggat_waktu ?? 999)
    })
    .slice(0, 5)

  const completionRate = activities.length > 0 ? Math.round((completed.length / activities.length) * 100) : 0

  return (
    <PageContainer>
      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-[28px] bg-linear-to-br from-[#111827] via-[#1E1B4B] to-[#312E81] p-6 text-white lg:p-7">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10">
            <p className="text-sm font-medium text-indigo-200">PRIORITY SYSTEM</p>
            <h1 className="mt-3 text-3xl font-black leading-tight lg:text-4xl">Fokus pada prioritas terpentingmu.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-indigo-100/90 lg:text-xl">
              Kamu memiliki <span className="font-bold text-white">{highPriority.length} kegiatan prioritas tinggi</span> dan{' '}
              <span className="font-bold text-white">{activities.length} total kegiatan</span> yang perlu dipantau hari ini.
            </p>
            <div className="mt-8 flex items-center gap-3 text-indigo-200">
              <div className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
              <p className="text-sm font-medium">Prioritas tinggi membutuhkan perhatian segera.</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Kegiatan" value={activities.length} color="slate" icon="total" />
          <StatCard title="Prioritas Tinggi" value={highPriority.length} color="red" icon="high" />
          <StatCard title="Prioritas Sedang" value={normalPriority.length} color="yellow" icon="medium" />
          <StatCard title="Prioritas Rendah" value={lowPriority.length} color="green" icon="low" />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.3fr_0.7fr]">
          <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <div>
                <h2 className="text-xl font-black text-slate-900">Fokus Prioritas</h2>
                <p className="mt-1 text-slate-500">Kegiatan paling mendesak berdasarkan skor spreadsheet.</p>
              </div>

              <button
                onClick={() => navigate('/semua')}
                className="flex items-center gap-2 font-semibold text-indigo-600 transition-colors hover:text-indigo-800"
              >
                Lihat semua
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {loading ? (
              <div className="space-y-4 p-5">
                {[1, 2, 3].map(item => (
                  <div key={item} className="h-24 animate-pulse rounded-3xl bg-slate-100" />
                ))}
              </div>
            ) : error ? (
              <div className="m-5 rounded-3xl border border-red-100 bg-red-50 p-5 text-red-600">{error}</div>
            ) : urgentTasks.length ? (
              <div className="divide-y divide-slate-100">
                {urgentTasks.map((task, index) => (
                  <PriorityItem key={task.id} task={task} index={index} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <ListTodo className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-black text-slate-900">Belum ada kegiatan aktif</h3>
                <p className="mt-2 max-w-sm text-slate-500">Tambahkan kegiatan baru agar dashboard bisa menampilkan fokus prioritas.</p>
                <button
                  onClick={() => navigate('/input')}
                  className="mt-5 rounded-2xl bg-indigo-600 px-5 py-3 font-bold text-white transition hover:bg-indigo-700"
                >
                  Tambah Kegiatan
                </button>
              </div>
            )}
          </section>

          <section className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-xl font-black text-slate-900">Statistik Penyelesaian</h2>
            <div className="mt-8">
              <CompletionChart completed={completed.length} pending={activities.length - completed.length} percentage={completionRate} />
            </div>
          </section>
        </div>
      </div>
    </PageContainer>
  )
}

function PriorityItem({ task, index }) {
  const isHigh = task.priority_level === 'Tinggi'
  const isDeadline = Number(task.tenggat_waktu ?? 0) > 0 && Number(task.tenggat_waktu ?? 0) <= 2

  return (
    <div className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl font-black ${isHigh ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
          #{index + 1}
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-black text-slate-900">{task.name}</h3>
            {isDeadline && (
              <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
                <AlertTriangle className="h-3.5 w-3.5" />
                Deadline dekat
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-500">
            <Meta icon={<CalendarDays className="h-4 w-4" />}>{formatTenggat(task.tenggat_waktu)}</Meta>
            <Meta icon={<Clock3 className="h-4 w-4" />}>{task.jenis}</Meta>
            <Meta icon={<CheckCircle2 className="h-4 w-4" />}>{task.status || 'Belum'}</Meta>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 md:justify-end">
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Skor</p>
          <p className="text-2xl font-black text-slate-900">{Number(task.score ?? 0).toFixed(1)}</p>
        </div>
        <span className={`rounded-full px-4 py-2 text-sm font-bold ${getPriorityColor(task.priority_level)}`}>{task.priority_level}</span>
      </div>
    </div>
  )
}

function Meta({ children, icon }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-2 font-medium text-slate-600">
      {icon}
      {children}
    </span>
  )
}

function formatTenggat(value) {
  const days = Number(value ?? 0)
  return days > 0 ? `${days} hari` : 'Tidak ada tenggat'
}
