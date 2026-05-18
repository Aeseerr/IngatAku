// ===========================================
// FILE: src/views/Analitik.jsx
// ===========================================

import PageContainer
from '../components/layout/PageContainer'

import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid

} from 'recharts'

export default function Analitik({

  activities = []

}) {

  // ===========================================
  // SAFE DATA
  // ===========================================
  const safeActivities =

    Array.isArray(activities)
      ? activities
      : []

  // ===========================================
  // STATS
  // ===========================================
  const total =
    safeActivities.length

  const selesai =
    safeActivities.filter(

      item =>

        item?.status === 'Selesai'

    ).length

  const belum =
    safeActivities.filter(

      item =>

        item?.status !== 'Selesai'

    ).length

  const tinggi =
    safeActivities.filter(

      item =>

        item?.priority_level === 'Tinggi'

    ).length

  const normal =
    safeActivities.filter(

      item =>

        item?.priority_level === 'Normal'

    ).length

  const rendah =
    safeActivities.filter(

      item =>

        item?.priority_level === 'Rendah'

    ).length

  // ===========================================
  // SAFE SCORES
  // ===========================================
  const scores =

    safeActivities.map(

      item =>

        Number(item?.score || 0)

    )

  const mean =

    scores.length

      ? (

          scores.reduce(

            (a, b) => a + b,

            0

          ) / scores.length

        ).toFixed(1)

      : '0'

  const sortedScores =
    [...scores].sort((a, b) => a - b)

  const median =

    sortedScores.length

      ? sortedScores[
          Math.floor(
            sortedScores.length / 2
          )
        ]

      : 0

  const variance =

    scores.length

      ? (

          scores.reduce(

            (acc, score) => {

              return (
                acc +
                Math.pow(
                  score - mean,
                  2
                )
              )

            },

            0

          ) / scores.length

        ).toFixed(1)

      : '0'

  // ===========================================
  // PIE DATA
  // ===========================================
  const pieData = [

    {
      name: 'Selesai',
      value: selesai
    },

    {
      name: 'Belum',
      value: belum
    }

  ]

  // ===========================================
  // PRIORITY DATA
  // ===========================================
  const priorityData = [

    {
      name: 'Tinggi',
      value: tinggi
    },

    {
      name: 'Normal',
      value: normal
    },

    {
      name: 'Rendah',
      value: rendah
    }

  ]

  // ===========================================
  // BAR CHART DATA
  // ===========================================
  const jenisData = [

    {
      jenis: 'Pekerjaan',

      selesai:
        safeActivities.filter(

          item =>

            item?.jenis === 'Pekerjaan'

            &&

            item?.status === 'Selesai'

        ).length,

      belum:
        safeActivities.filter(

          item =>

            item?.jenis === 'Pekerjaan'

            &&

            item?.status !== 'Selesai'

        ).length
    },

    {
      jenis: 'Kelompok',

      selesai:
        safeActivities.filter(

          item =>

            item?.jenis === 'Kelompok'

            &&

            item?.status === 'Selesai'

        ).length,

      belum:
        safeActivities.filter(

          item =>

            item?.jenis === 'Kelompok'

            &&

            item?.status !== 'Selesai'

        ).length
    },

    {
      jenis: 'Individu',

      selesai:
        safeActivities.filter(

          item =>

            item?.jenis === 'Individu'

            &&

            item?.status === 'Selesai'

        ).length,

      belum:
        safeActivities.filter(

          item =>

            item?.jenis === 'Individu'

            &&

            item?.status !== 'Selesai'

        ).length
    },

    {
      jenis: 'Hiburan',

      selesai:
        safeActivities.filter(

          item =>

            item?.jenis === 'Hiburan'

            &&

            item?.status === 'Selesai'

        ).length,

      belum:
        safeActivities.filter(

          item =>

            item?.jenis === 'Hiburan'

            &&

            item?.status !== 'Selesai'

        ).length
    }

  ]

  // ===========================================
  // COLORS
  // ===========================================
  const STATUS_COLORS = [

    '#10B981',
    '#CBD5E1'

  ]

  const PRIORITY_COLORS = [

    '#F43F5E',
    '#F59E0B',
    '#10B981'

  ]

  // ===========================================
  // UI
  // ===========================================
  return (

    <PageContainer className="
      space-y-6
    ">
      {/* ===========================================
          HEADER
      =========================================== */}
      <div>

        <h1 className="
          text-5xl
          font-black
          text-slate-900
        ">

          Dashboard Analitik

        </h1>

        <p className="
          text-slate-500
          text-lg
          mt-3
        ">

          Statistik visual kegiatan
          dan prioritas.

        </p>

      </div>

      {/* ===========================================
          STATS
      =========================================== */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">

        <div className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-7
        ">

          <p className="text-slate-500">
            Mean
          </p>

          <h2 className="
            text-5xl
            font-black
            mt-4
          ">

            {mean}

          </h2>

        </div>

        <div className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-7
        ">

          <p className="text-slate-500">
            Median
          </p>

          <h2 className="
            text-5xl
            font-black
            mt-4
          ">

            {median}

          </h2>

        </div>

        <div className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-7
        ">

          <p className="text-slate-500">
            Variance
          </p>

          <h2 className="
            text-5xl
            font-black
            mt-4
          ">

            {variance}

          </h2>

        </div>

        <div className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-7
        ">

          <p className="text-slate-500">
            Total Kegiatan
          </p>

          <h2 className="
            text-5xl
            font-black
            mt-4
          ">

            {total}

          </h2>

        </div>

      </div>

      {/* ===========================================
          PIE CHARTS
      =========================================== */}
      <div className="
        grid
        grid-cols-1
        xl:grid-cols-2
        gap-6
      ">

        {/* STATUS */}
        <div className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-8
        ">

          <h2 className="
            text-3xl
            font-bold
            mb-8
          ">

            Status Kegiatan

          </h2>

          <div className="
            w-full
            h-95
          ">

            <ResponsiveContainer>

              <PieChart>

                <Pie

                  data={pieData}

                  dataKey="value"

                  nameKey="name"

                  innerRadius={80}

                  outerRadius={130}

                  paddingAngle={5}

                >

                  {pieData.map(

                    (_entry, index) => (

                      <Cell

                        key={index}

                        fill={
                          STATUS_COLORS[index]
                        }

                      />

                    )

                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* PRIORITY */}
        <div className="
          bg-white
          rounded-3xl
          border
          border-slate-200
          p-8
        ">

          <h2 className="
            text-3xl
            font-bold
            mb-8
          ">

            Distribusi Prioritas

          </h2>

          <div className="
            w-full
            h-95
          ">

            <ResponsiveContainer>

              <PieChart>

                <Pie

                  data={priorityData}

                  dataKey="value"

                  nameKey="name"

                  innerRadius={80}

                  outerRadius={130}

                  paddingAngle={5}

                >

                  {priorityData.map(

                    (_entry, index) => (

                      <Cell

                        key={index}

                        fill={
                          PRIORITY_COLORS[index]
                        }

                      />

                    )

                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* ===========================================
          BAR CHART
      =========================================== */}
      <div className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-8
      ">

        <h2 className="
          text-3xl
          font-bold
          mb-8
        ">

          Status Kegiatan Berdasarkan Jenis

        </h2>

        <div className="
          w-full
          h-112.5
        ">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={jenisData}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="jenis"
              />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar
                dataKey="selesai"
                name="Selesai"
                fill="#10B981"
                radius={[10, 10, 0, 0]}
              />

              <Bar
                dataKey="belum"
                name="Belum"
                fill="#CBD5E1"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </PageContainer>
  )
}