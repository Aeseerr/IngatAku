export default function ActivityItem({

  activity,
  onDelete,
  onToggle

}) {

  return (

    <div className="
      glass-card
      hover-lift
      rounded-3xl
      p-6
      flex
      items-start
      justify-between
      gap-6
    ">

      {/* LEFT */}
      <div className="flex items-start gap-4">

        {/* CHECK */}
        <button
          onClick={() => onToggle(activity)}
          className={`
            w-7
            h-7
            rounded-full
            border-2
            mt-1
            transition

            ${
              activity.status === 'Selesai'

                ? `
                  bg-emerald-500
                  border-emerald-500
                `

                : `
                  border-slate-300
                  hover:border-indigo-500
                `
            }
          `}
        />

        {/* CONTENT */}
        <div>

          <h2 className={`
            text-xl
            font-bold

            ${
              activity.status === 'Selesai'

                ? `
                  line-through
                  text-slate-400
                `

                : `
                  text-slate-900
                `
            }
          `}>

            {activity.name}

          </h2>

          <div className="
            flex
            flex-wrap
            gap-3
            mt-4
          ">

            <Badge>

              {activity.jenis}

            </Badge>

            <Badge color="
              bg-indigo-100
              text-indigo-700
            ">

              {activity.priority_level}

            </Badge>

            <Badge color="
              bg-amber-100
              text-amber-700
            ">

              Score:
              {' '}
              {activity.score?.toFixed(1)}

            </Badge>

            <Badge color="
              bg-rose-100
              text-rose-700
            ">

              Deadline:
              {' '}
              {activity.tenggat_waktu}
              {' '}
              hari

            </Badge>

          </div>

        </div>

      </div>

      {/* DELETE */}
      <button
        onClick={() =>
          onDelete(activity.id)
        }
        className="
          bg-linear-to-r
          from-rose-500
          to-rose-600
          hover:scale-105
          transition
          text-white
          px-5
          py-3
          rounded-2xl
          font-semibold
          shadow-lg
        "
      >

        Hapus

      </button>

    </div>
  )
}

// ======================
// BADGE
// ======================
function Badge({

  children,
  color = 'bg-slate-100'

}) {

  return (

    <span className={`
      ${color}
      px-3
      py-1
      rounded-full
      text-sm
      font-medium
    `}>

      {children}

    </span>
  )
}