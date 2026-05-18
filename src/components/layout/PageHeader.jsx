// =======================================
// FILE:
// src/components/layout/PageHeader.jsx
// =======================================

export default function PageHeader({

  title,

  description,

  action

}) {

  return (

    <div className="
      flex
      flex-col
      lg:flex-row

      lg:items-center
      lg:justify-between

      gap-4

      mb-6
    ">

      <div>

        <h1 className="
          text-3xl
          lg:text-4xl

          font-black

          text-slate-900
        ">

          {title}

        </h1>

        {description && (

          <p className="
            mt-2
            text-slate-500
          ">

            {description}

          </p>

        )}

      </div>

      {action && (

        <div>

          {action}

        </div>

      )}

    </div>

  )
}