// =======================================
// FILE:
// src/components/ui/Badge.jsx
// =======================================

export default function Badge({

  children,

  variant = 'default'

}) {

  const variants = {

    danger: `
      bg-rose-500
      text-white
    `,

    warning: `
      bg-amber-400
      text-slate-900
    `,

    success: `
      bg-emerald-500
      text-white
    `,

    default: `
      bg-slate-200
      text-slate-700
    `

  }

  return (

    <span className={`
      inline-flex
      items-center
      justify-center

      px-3
      h-8

      rounded-full

      text-sm
      font-bold

      ${variants[variant]}
    `}>

      {children}

    </span>

  )
}