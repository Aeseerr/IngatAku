// =======================================
// FILE:
// src/components/dashboard/
// ProgressCard.jsx
// =======================================

import {

  PieChart,
  Pie,
  Cell,
  ResponsiveContainer

}

from 'recharts'

export default function ProgressCard({

  completed,

  pending,

  completionRate

}) {

  const data = [

    {
      name: 'Selesai',
      value: completed
    },

    {
      name: 'Pending',
      value: pending
    }

  ]

  return (

    <div className="
      app-card
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
      ">

        Statistik Penyelesaian

      </h2>

      <div className="
        h-75
        mt-6
      ">

        <ResponsiveContainer>

          <PieChart>

            <Pie

              data={data}

              innerRadius={80}

              outerRadius={100}

              dataKey="value"

            >

              <Cell fill="#4f46e5" />

              <Cell fill="#e2e8f0" />

            </Pie>

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="
        flex
        items-center
        justify-between
      ">

        <span>
          Progress
        </span>

        <span className="
          font-bold
        ">

          {completionRate}%

        </span>

      </div>

    </div>

  )
}