// =======================================
// FILE:
// src/components/ui/EmptyState.jsx
// =======================================

export default function EmptyState({

  title,

  description

}) {

  return (

    <div className="
      py-16
      text-center
    ">

      <h3 className="
        text-xl
        font-bold
        text-slate-700
      ">

        {title}

      </h3>

      <p className="
        mt-2
        text-slate-500
      ">

        {description}

      </p>

    </div>

  )
}