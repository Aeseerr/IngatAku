// =======================================
// FILE:
// src/components/dashboard/
// UrgentActivities.jsx
// =======================================

export default function UrgentActivities({

  activities

}) {

  return (

    <div className="
      app-card
      overflow-hidden
    ">

      <div className="
        p-5
        border-b
      ">

        <h2 className="
          text-2xl
          font-bold
        ">

          Kegiatan Mendesak

        </h2>

      </div>

      <div>

        {activities.length === 0 && (

          <div className="
            p-10
            text-center
            text-slate-500
          ">

            Tidak ada kegiatan
            mendesak.

          </div>

        )}

        {activities.map(item => (

          <div

            key={item.id}

            className="
              p-4
              border-b
            "
          >

            <h3 className="
              font-bold
              text-lg
            ">

              {item.name}

            </h3>

            <p className="
              text-sm
              text-slate-500
              mt-1
            ">

              Skor:
              {item.score}

            </p>

          </div>

        ))}

      </div>

    </div>

  )
}