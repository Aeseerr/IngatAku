export default function EmptyState({

  title,
  description

}) {

  return (

    <div className="
      bg-white
      border
      border-slate-200
      rounded-3xl
      p-12
      text-center
    ">

      <h2 className="text-2xl font-bold text-slate-800">

        {title}

      </h2>

      <p className="text-slate-500 mt-3">

        {description}

      </p>

    </div>
  )
}