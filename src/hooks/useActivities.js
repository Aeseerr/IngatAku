import { useCallback, useEffect, useState } from 'react'
import { getActivities } from '../services/activityService'

export function useActivities(user) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchActivities = useCallback(async () => {
    if (!user?.id) {
      setActivities([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const rows = await getActivities(user.id)
      setActivities(rows)
    } catch (err) {
      console.error('Gagal mengambil kegiatan:', err)
      setError(err.message || 'Gagal mengambil kegiatan')
      setActivities([])
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    fetchActivities()
  }, [fetchActivities])

  function updateActivityLocal(idOrActivity, updater) {
    if (typeof idOrActivity === 'object' && idOrActivity !== null) {
      setActivities(prev => prev.map(item => (item.id === idOrActivity.id ? idOrActivity : item)))
      return
    }

    setActivities(prev =>
      prev.map(item => {
        if (item.id !== idOrActivity) return item
        const patch = typeof updater === 'function' ? updater(item) : updater
        return { ...item, ...patch }
      }),
    )
  }

  function updateManyActivitiesLocal(updatedRows = []) {
    const map = new Map(updatedRows.map(row => [row.id, row]))
    setActivities(prev => prev.map(item => map.get(item.id) ?? item))
  }

  function removeActivityLocal(id) {
    setActivities(prev => prev.filter(item => item.id !== id))
  }

  function addActivityLocal(activity) {
    setActivities(prev => [activity, ...prev])
  }

  return {
    activities,
    loading,
    error,
    refetch: fetchActivities,
    updateActivityLocal,
    updateManyActivitiesLocal,
    removeActivityLocal,
    addActivityLocal,
  }
}
