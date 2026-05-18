export default function ActivityTable({

  activities,
  onDelete,
  onToggle

}) {

  function getPriorityColor(level) {

    switch (level) {

      case 'Tinggi':
        return 'bg-rose-100 text-rose-700'

      case 'Sedang':
        return 'bg-amber-100 text-amber-700'

      case 'Rendah':
        return 'bg-emerald-100 text-emerald-700'

      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (

    <div className="
      bg-white
      border
      border-slate-200
      rounded-2xl
      shadow-sm
      overflow-hidden
    ">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="
            bg-slate-50
            border-b
            border-slate-200
          ">

            <tr className="text-left">

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Nama
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Prioritas
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Deadline
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Score
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {activities.map(activity => (

              <tr
                key={activity.id}
                className="
                  border-b
                  border-slate-100
                  hover:bg-slate-50
                  transition
                "
              >

                {/* NAME */}
                <td className="px-6 py-5">

                  <div>

                    <h3 className="
                      font-semibold
                      text-slate-900
                    ">

                      {activity.name}

                    </h3>

                    <p className="
                      text-sm
                      text-slate-500
                      mt-1
                    ">

                      {activity.jenis}

                    </p>

                  </div>

                </td>

                {/* PRIORITY */}
                <td className="px-6 py-5">

                  <span className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${getPriorityColor(activity.priority_level)}
                  `}>

                    {activity.priority_level}

                  </span>

                </td>

                {/* DEADLINE */}
                <td className="px-6 py-5 text-slate-700">

                  {activity.tenggat_waktu} hari

                </td>

                {/* SCORE */}
                <td className="px-6 py-5">

                  <span className="
                    font-bold
                    text-indigo-600
                  ">

                    {activity.score?.toFixed(1)}

                  </span>

                </td>

                {/* STATUS */}
                <td className="px-6 py-5">

                  <button
                    onClick={() =>
                      onToggle(activity)
                    }
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      transition

                      ${
                        activity.status === 'Selesai'

                          ? `
                            bg-emerald-100
                            text-emerald-700
                          `

                          : `
                            bg-amber-100
                            text-amber-700
                          `
                      }
                    `}
                  >

                    {activity.status}

                  </button>

                </td>

                {/* ACTION */}
                <td className="px-6 py-5">

                  <button
                    onClick={() =>
                      onDelete(activity.id)
                    }
                    className="
                      bg-rose-500
                      hover:bg-rose-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      text-sm
                      font-medium
                      transition
                    "
                  >

                    Hapus

                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}