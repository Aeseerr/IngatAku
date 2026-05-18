export default function StatCard({

  title,
  value,
  icon,
  color = 'from-indigo-500 to-indigo-600'

}) {

  return (

    <div className="
      glass-card
      hover-lift
      rounded-3xl
      p-6
      flex
      items-center
      gap-5
    ">

      {/* ICON */}
      <div className={`
        w-14
        h-14
        rounded-2xl
        bg-linear-to-br
        ${color}
        flex
        items-center
        justify-center
        text-white
        text-2xl
        shadow-lg
      `}>

        {icon}

      </div>

      {/* CONTENT */}
      <div>

        <p className="text-slate-500 text-sm">

          {title}

        </p>

        <h2 className="
          text-3xl
          font-black
          text-slate-900
          mt-1
        ">

          {value}

        </h2>

      </div>

    </div>
  )
}