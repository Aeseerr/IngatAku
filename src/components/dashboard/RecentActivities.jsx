// =======================================
// FILE:
// src/components/dashboard/
// RecentActivities.jsx
// =======================================

export default function RecentActivities({

  activities

}) {

  return (

    <div className="
      app-card
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-6
      ">

        Aktivitas Terbaru

      </h2>

      <div className="
        space-y-4
      ">

        {activities.map(item => (

          <div

            key={item.id}

            className="
              flex
              items-center
              justify-between

              p-4

              rounded-2xl

              bg-slate-50
            "
          >

            <div>

              <h3 className="
                font-semibold
              ">

                {item.name}

              </h3>

              <p className="
                text-sm
                text-slate-500
              ">

                {item.jenis}

              </p>

            </div>

            <div className="
              text-sm
              font-bold
            ">

              {item.priority_level}

            </div>

          </div>

        ))}

      </div>

    </div>

  )
}