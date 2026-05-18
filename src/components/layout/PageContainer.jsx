// =======================================
// FILE: src/components/layout/PageContainer.jsx
// =======================================

export default function PageContainer({

  children,

  className = ''

}) {

  return (

    <div className={`
      w-full

      max-w-375

      mx-auto

      px-4
      sm:px-6
      lg:px-8

      py-5
      lg:py-7

      ${className}
    `}>

      {children}

    </div>

  )
}