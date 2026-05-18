import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { Info, RefreshCcw, Save } from 'lucide-react'
import PageContainer from '../components/layout/PageContainer'
import { createActivity } from '../services/activityService'
import { getPriorityBreakdown, getPriorityColor, getPriorityLevel } from '../utils/priorityCalculator'

const initialForm = {
  name: '',
  jenis: 'Pekerjaan',
  dampak: 'Sedang',
  ketergantungan: 'Tidak',
  tenggatWaktu: 0,
  beban: 0,
  konsekuensi: 'Sedang',
}

const tenggatOptions = [
  { label: 'Tidak ada', value: 0 },
  ...Array.from({ length: 14 }, (_, i) => ({ label: `${i + 1} hari`, value: i + 1 })),
]

const bebanOptions = [
  { label: 'Tidak ada', value: 0 },
  { label: '1 jam', value: 1 },
  { label: '2 jam', value: 2 },
  { label: '3 jam', value: 3 },
]

export default function InputKegiatan({ user, addActivityLocal }) {
  const [formData, setFormData] = useState(initialForm)
  const [saving, setSaving] = useState(false)

  const breakdown = useMemo(
    () =>
      getPriorityBreakdown(
        formData.tenggatWaktu,
        formData.dampak,
        formData.ketergantungan,
        formData.konsekuensi,
        formData.beban,
        formData.jenis,
      ),
    [formData],
  )

  const currentScore = breakdown.score
  const currentLevel = getPriorityLevel(currentScore)

  function handleChange(e) {
    const { name, value } = e.target
    const numericFields = ['tenggatWaktu', 'beban']
    setFormData(prev => ({ ...prev, [name]: numericFields.includes(name) ? Number(value) : value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error('Nama kegiatan wajib diisi')
      return
    }

    try {
      setSaving(true)
      const saved = await createActivity(formData, user)
      addActivityLocal?.(saved)
      toast.success('Kegiatan berhasil disimpan')
      setFormData(initialForm)
    } catch (err) {
      console.error('Gagal menyimpan kegiatan:', err)
      toast.error(err.message || 'Gagal menyimpan kegiatan')
    } finally {
      setSaving(false)
    }
  }

  const previewRows = [
    { label: 'Tenggat (40%)', value: formatTenggat(formData.tenggatWaktu), point: breakdown.weighted.tenggat },
    { label: 'Konsekuensi (20%)', value: formData.konsekuensi, point: breakdown.weighted.konsekuensi },
    { label: 'Dampak (15%)', value: formData.dampak, point: breakdown.weighted.dampak },
    { label: 'Ketergantungan (15%)', value: formData.ketergantungan, point: breakdown.weighted.ketergantungan },
    { label: 'Beban (5%)', value: formatBeban(formData.beban), point: breakdown.weighted.beban },
    { label: 'Jenis (5%)', value: formData.jenis, point: breakdown.weighted.jenis },
  ]

  return (
    <PageContainer>
      <div className="mx-auto max-w-6xl space-y-7">
        <div>
          <h1 className="text-3xl font-black text-slate-900 lg:text-4xl">Input Kegiatan Baru</h1>
          <p className="mt-2 text-lg text-slate-500">Isi detail kegiatan untuk menghitung skor prioritas secara otomatis.</p>
        </div>

        <div className="grid grid-cols-1 items-start gap-7 xl:grid-cols-[1fr_340px]">
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Nama Kegiatan *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Contoh: Presentasi Proyek Akhir Semester"
                  className="app-input h-14 text-lg"
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <SelectField label="Jenis Kegiatan" name="jenis" value={formData.jenis} onChange={handleChange} options={['Pekerjaan', 'Kelompok', 'Individu', 'Hiburan']} />
                <SelectField label="Dampak Kegiatan" name="dampak" value={formData.dampak} onChange={handleChange} options={['Tinggi', 'Sedang', 'Rendah', 'Tidak ada']} />
                <SelectField label="Ketergantungan Tim" name="ketergantungan" value={formData.ketergantungan} onChange={handleChange} options={['Ya', 'Tidak']} />
                <SelectField label="Tenggat Waktu" name="tenggatWaktu" value={formData.tenggatWaktu} onChange={handleChange} options={tenggatOptions} />
                <SelectField label="Beban SKS/Jam Kerja" name="beban" value={formData.beban} onChange={handleChange} options={bebanOptions} />
                <SelectField label="Konsekuensi Telat" name="konsekuensi" value={formData.konsekuensi} onChange={handleChange} options={['Tinggi', 'Sedang', 'Rendah', 'Tidak ada']} />
              </div>

              <div className="border-t border-slate-100 pt-5">
                <button
                  type="submit"
                  disabled={saving}
                  className="ml-auto flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-6 font-bold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-60 sm:w-auto"
                >
                  <Save className="h-5 w-5" />
                  {saving ? 'Menyimpan...' : 'Simpan Kegiatan'}
                </button>
              </div>

              <button
                type="button"
                onClick={() => setFormData(initialForm)}
                className="hidden items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-bold text-slate-600 transition hover:bg-slate-50"
              >
                <RefreshCcw className="h-5 w-5" />
                Reset
              </button>
            </form>
          </div>

          <aside className="sticky top-6 rounded-[30px] bg-[#111827] p-6 text-white shadow-2xl shadow-slate-900/20">
            <div className="flex items-center gap-3 text-slate-300">
              <RefreshCcw className="h-5 w-5" />
              <h2 className="text-xl font-black">Pratinjau Prioritas</h2>
            </div>

            <div className="py-10 text-center">
              <div className="text-7xl font-black tracking-tight">{currentScore}</div>
              <span className={`mt-3 inline-flex rounded-full px-5 py-2 text-base font-black shadow-lg ${getPriorityColor(currentLevel)}`}>
                {currentLevel}
              </span>
            </div>

            <div className="space-y-4 border-t border-white/10 pt-6">
              {previewRows.map(row => (
                <div key={row.label} className="grid grid-cols-[1fr_auto] items-start gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">{row.label}</p>
                    <p className="mt-1 text-xs text-slate-500">+{row.point.toFixed(1)} poin</p>
                  </div>
                  <p className="max-w-30 text-right font-bold text-slate-100">{row.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3 rounded-2xl bg-slate-800 p-4 text-sm leading-relaxed text-slate-300">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-indigo-300" />
              <p>
                Skor dihitung otomatis berdasarkan pembobotan matriks prioritas. Makin tinggi skor, makin mendesak kegiatan tersebut.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </PageContainer>
  )
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">{label}</label>
      <select name={name} value={value} onChange={onChange} className="app-input h-14 cursor-pointer text-lg">
        {options.map(option => {
          const item = typeof option === 'object' ? option : { label: option, value: option }
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

function formatTenggat(value) {
  const days = Number(value ?? 0)
  return days > 0 ? `${days} hari` : 'Tidak ada'
}

function formatBeban(value) {
  const hours = Number(value ?? 0)
  return hours > 0 ? `${hours} jam` : 'Tidak ada'
}
