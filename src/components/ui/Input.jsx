// =======================================
// FILE:
// src/components/ui/Input.jsx
// =======================================

export default function Input({

  className = '',

  ...props

}) {

  return (

    <input

      {...props}

      className={`
        w-full

        h-12

        rounded-2xl

        border
        border-slate-200

        bg-white

        px-4

        outline-none

        focus:ring-2
        focus:ring-indigo-500

        ${className}
      `}
    />

  )
}