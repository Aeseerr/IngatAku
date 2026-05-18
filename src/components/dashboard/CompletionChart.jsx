// =======================================
// FILE: src/components/dashboard/CompletionChart.jsx
// =======================================

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer
} from 'recharts'

export default function CompletionChart({

  completed = 0,

  pending = 0,

  percentage = 0

}) {

  // ======================================
  // DATA
  // ======================================
  const data = [

    {
      name: 'Selesai',
      value: completed,
      color: '#4F46E5'
    },

    {
      name: 'Belum',
      value: pending,
      color: '#E2E8F0'
    }

  ]

  return (

    <div className="
      flex
      flex-col
      items-center
    ">

      {/* ================================== */}
      {/* CHART */}
      {/* ================================== */}
      <div className="
        relative

        w-60
        h-60
      ">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie

              data={data}

              dataKey="value"

              innerRadius={78}

              outerRadius={98}

              startAngle={90}

              endAngle={-270}

              paddingAngle={2}

              stroke="none"

            >

              {data.map(

                (entry, index) => (

                  <Cell

                    key={index}

                    fill={entry.color}

                  />

                )

              )}

            </Pie>

          </PieChart>

        </ResponsiveContainer>

        {/* ================================== */}
        {/* CENTER INFO */}
        {/* ================================== */}
        <div className="
          absolute
          inset-0

          flex
          flex-col
          items-center
          justify-center
        ">

          <h2 className="
            text-5xl
            font-black
            text-slate-900
          ">

            {percentage}%

          </h2>

          <p className="
            mt-2

            text-slate-500
            font-medium
          ">

            Selesai

          </p>

        </div>

      </div>

      {/* ================================== */}
      {/* LEGEND */}
      {/* ================================== */}
      <div className="
        mt-8

        w-full

        space-y-4
      ">

        {/* COMPLETE */}
        <div className="
          flex
          items-center
          justify-between
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              w-4
              h-4

              rounded-full

              bg-indigo-600
            " />

            <span className="
              text-slate-700
              font-medium
            ">

              Selesai

            </span>

          </div>

          <span className="
            text-lg
            font-bold
            text-slate-900
          ">

            {completed}

          </span>

        </div>

        {/* PENDING */}
        <div className="
          flex
          items-center
          justify-between
        ">

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              w-4
              h-4

              rounded-full

              bg-slate-200
            " />

            <span className="
              text-slate-700
              font-medium
            ">

              Belum Selesai

            </span>

          </div>

          <span className="
            text-lg
            font-bold
            text-slate-900
          ">

            {pending}

          </span>

        </div>

      </div>

    </div>

  )
}