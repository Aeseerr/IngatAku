// =======================================
// FILE:
// src/components/layout/ContentGrid.jsx
// =======================================

export default function ContentGrid({

  children,

  className = ''

}) {

  return (

    <div className={`
      grid
      gap-6

      ${className}
    `}>

      {children}

    </div>

  )
}