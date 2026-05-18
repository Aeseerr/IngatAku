// =======================================
// FILE:
// src/components/dashboard/
// SummaryCards.jsx
// =======================================

import {

  ClipboardList,
  AlertCircle,
  Clock3,
  CheckCircle2

}

from 'lucide-react'

import StatCard
from './StatCard'

export default function SummaryCards({

  activities

}) {

  const tinggi =
    activities.filter(

      a =>
        a.priority_level ===
        'Tinggi'

    ).length

  const normal =
    activities.filter(

      a =>
        a.priority_level ===
        'Normal'

    ).length

  const rendah =
    activities.filter(

      a =>
        a.priority_level ===
        'Rendah'

    ).length

  return (

    <div className="
      grid
      grid-cols-2
      xl:grid-cols-4
      gap-5
    ">

      <StatCard
        title="Total Kegiatan"
        value={activities.length}
        icon={ClipboardList}
      />

      <StatCard
        title="Tinggi"
        value={tinggi}
        icon={AlertCircle}
        variant="danger"
      />

      <StatCard
        title="Normal"
        value={normal}
        icon={Clock3}
        variant="warning"
      />

      <StatCard
        title="Rendah"
        value={rendah}
        icon={CheckCircle2}
        variant="success"
      />

    </div>

  )
}