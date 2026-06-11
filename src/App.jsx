import { useMemo, useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { supabase } from './lib/supabase'
import AppLayout from './layouts/AppLayout'
import Login from './views/Login'
import Register from './views/Register'
import Dashboard from './views/Dashboard'
import InputKegiatan from './views/InputKegiatan'
import SemuaKegiatan from './views/SemuaKegiatan'
import Notifikasi from './views/Notifikasi'
import Analitik from './views/Analitik'
import { useActivities } from './hooks/useActivities'
import { mapActivitiesWithLiveDeadline } from './utils/liveActivityMapper'

function FullPageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
        <p className="font-semibold">Memuat aplikasi...</p>
      </div>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loadingSession, setLoadingSession] = useState(true)

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setUser(data.session?.user ?? null)
      setLoadingSession(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoadingSession(false)
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const {
    activities,
    loading,
    error,
    refetch,
    updateActivityLocal,
    updateManyActivitiesLocal,
    removeActivityLocal,
    addActivityLocal,
  } = useActivities(user)

const [todayTick, setTodayTick] = useState(Date.now())

useEffect(() => {
  const interval = setInterval(() => {
    setTodayTick(Date.now())
  }, 60 * 1000)

  return () => clearInterval(interval)
}, [])

const liveActivities = useMemo(() => {
  todayTick
  return mapActivitiesWithLiveDeadline(activities)
}, [activities, todayTick])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loadingSession) return <FullPageLoading />

  return (
    <>
      <Toaster position="top-right" />

      {!user ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <AppLayout activities={liveActivities} onLogout={handleLogout}>
          <Routes>
            <Route path="/" element={<Dashboard activities={liveActivities} loading={loading} error={error} />} />

            <Route
              path="/input"
              element={<InputKegiatan user={user} refetch={refetch} addActivityLocal={addActivityLocal} />}
            />

            <Route
              path="/semua"
              element={
                <SemuaKegiatan
                  activities={liveActivities}
                  loading={loading}
                  refetch={refetch}
                  updateActivityLocal={updateActivityLocal}
                  removeActivityLocal={removeActivityLocal}
                />
              }
            />

            <Route
              path="/notifikasi"
              element={
                <Notifikasi
                  activities={liveActivities}
                  loading={loading}
                  updateActivityLocal={updateActivityLocal}
                  updateManyActivitiesLocal={updateManyActivitiesLocal}
                />
              }
            />

            <Route path="/analitik" element={<Analitik activities={liveActivities} />} />
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      )}
    </>
  )
}