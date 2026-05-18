import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { UserPlus } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Konfirmasi password tidak sama')
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email: formData.email.trim(),
      password: formData.password,
    })

    setLoading(false)

    if (error) {
      toast.error(error.message)
      return
    }

    toast.success('Akun berhasil dibuat. Silakan cek email jika konfirmasi email aktif.')
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-sky-50 p-5">
      <div className="w-full max-w-md bg-white rounded-[30px] shadow-xl shadow-indigo-100/70 border border-slate-200 p-8">
        <div className="mb-8">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white">
            <UserPlus className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Daftar</h1>
          <p className="text-slate-500 mt-2">Buat akun baru untuk mulai memakai IngatAku.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="app-input mt-2"
              placeholder="nama@email.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="app-input mt-2"
              placeholder="Minimal 6 karakter"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Konfirmasi Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.confirmPassword}
              onChange={e => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="app-input mt-2"
              placeholder="Ulangi password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-13 rounded-2xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-bold text-indigo-600 hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  )
}
