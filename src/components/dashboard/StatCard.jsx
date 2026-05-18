import {

  AlertTriangle,
  CheckCircle2,
  Clock3,
  ListTodo

}

from 'lucide-react'

export default function StatCard({

  title,

  value,

  color = 'slate',

  icon = 'total'

}) {

  // ======================================
  // COLOR MAP
  // ======================================
  const colorMap = {

    slate: {

      bg: 'bg-slate-50',

      border:
        'border-slate-200',

      iconBg:
        'bg-slate-100',

      iconColor:
        'text-slate-600'

    },

    red: {

      bg: 'bg-red-50',

      border:
        'border-red-100',

      iconBg:
        'bg-red-100',

      iconColor:
        'text-red-500'

    },

    yellow: {

      bg: 'bg-yellow-50',

      border:
        'border-yellow-100',

      iconBg:
        'bg-yellow-100',

      iconColor:
        'text-yellow-600'

    },

    green: {

      bg: 'bg-emerald-50',

      border:
        'border-emerald-100',

      iconBg:
        'bg-emerald-100',

      iconColor:
        'text-emerald-600'

    }

  }

  // ======================================
  // ICON MAP
  // ======================================
  const iconMap = {

    total:
      <ListTodo className="
        w-6
        h-6
      " />,

    high:
      <AlertTriangle className="
        w-6
        h-6
      " />,

    medium:
      <Clock3 className="
        w-6
        h-6
      " />,

    low:
      <CheckCircle2 className="
        w-6
        h-6
      " />

  }

  const style =
    colorMap[color]

  return (

    <div className={`
      relative

      overflow-hidden

      rounded-[28px]

      border

      p-5

      shadow-sm

      transition-all
      duration-300

      hover:-translate-y-1
      hover:shadow-md

      ${style.bg}
      ${style.border}
    `}>

      {/* DECOR */}
      <div className="
        absolute
        -top-10
        -right-10

        w-36
        h-36

        rounded-full

        bg-white/40
      " />

      {/* CONTENT */}
      <div className="
        relative
        z-10
      ">

        {/* ICON */}
        <div className={`
          w-12
          h-12

          rounded-2xl

          flex
          items-center
          justify-center

          ${style.iconBg}
          ${style.iconColor}
        `}>

          {iconMap[icon]}

        </div>

        {/* TITLE */}
        <p className="
          mt-6

          text-slate-600
          font-medium
        ">

          {title}

        </p>

        {/* VALUE */}
        <h2 className="
          mt-2

          text-4xl
          font-black

          tracking-tight

          text-slate-900
        ">

          {value}

        </h2>

      </div>

    </div>

  )
}