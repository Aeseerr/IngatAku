import { useState } from 'react'

import { createActivity }
from '../services/activityService'

export function useInputKegiatan(user) {

  // ======================
  // STATE
  // ======================
  const [loading, setLoading] =
    useState(false)

  const [form, setForm] =
    useState({

      name: '',

      jenis: 'Kelompok',

      tenggatWaktu: '',

      dampak: 'Sedang',

      ketergantungan: 'Tidak',

      konsekuensi: 'Sedang',

      beban: '0'

    })

  // ======================
  // CHANGE
  // ======================
  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    })
  }

  // ======================
  // RESET
  // ======================
  function resetForm() {

    setForm({

      name: '',

      jenis: 'Kelompok',

      tenggatWaktu: '',

      dampak: 'Sedang',

      ketergantungan: 'Tidak',

      konsekuensi: 'Sedang',

      beban: '0'

    })
  }

  // ======================
  // VALIDATION
  // ======================
  function validate() {

    if (!form.name.trim()) {

      throw new Error(
        'Nama kegiatan wajib diisi'
      )
    }

    if (!form.tenggatWaktu) {

      throw new Error(
        'Deadline wajib diisi'
      )
    }

    const deadline =
      Number(form.tenggatWaktu)

    if (deadline <= 0) {

      throw new Error(
        'Deadline tidak valid'
      )
    }
  }

  // ======================
  // SUBMIT
  // ======================
  async function handleSubmit(e) {

    e.preventDefault()

    try {

      setLoading(true)

      validate()

      await createActivity(

        form,
        user

      )

      alert(
        'Kegiatan berhasil ditambahkan'
      )

      resetForm()

    } catch (err) {

      console.error(err)

      alert(err.message)

    } finally {

      setLoading(false)
    }
  }

  return {

    form,

    loading,

    handleChange,

    handleSubmit

  }
}