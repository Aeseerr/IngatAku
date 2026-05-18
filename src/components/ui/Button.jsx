// =======================================
// FILE:
// src/components/ui/Button.jsx
// =======================================

export default function Button({

  children,

  className = '',

  variant = 'primary',

  ...props

}) {

  const variants = {

    primary: `
      bg-indigo-600
      hover:bg-indigo-700
      text-white
    `,

    secondary: `
      bg-slate-100
      hover:bg-slate-200
      text-slate-900
    `,

    danger: `
      bg-rose-500
      hover:bg-rose-600
      text-white
    `

  }

  return (

    <button

      {...props}

      className={`
        h-11
        px-5

        rounded-2xl

        font-semibold

        transition-all

        flex
        items-center
        justify-center
        gap-2

        disabled:opacity-50

        ${variants[variant]}

        ${className}
      `}
    >

      {children}

    </button>

  )
}