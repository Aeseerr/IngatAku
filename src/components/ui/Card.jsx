// =======================================
// FILE:
// src/components/ui/Card.jsx
// =======================================

export default function Card({

  children,

  className = ''

}) {

  return (

    <div className={`
      bg-white

      border
      border-slate-200

      rounded-3xl

      shadow-sm

      ${className}
    `}>

      {children}

    </div>

  )
}