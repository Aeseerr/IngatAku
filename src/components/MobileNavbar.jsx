// =======================================
// FILE: src/components/MobileNavbar.jsx
// =======================================

import {

  LayoutDashboard,
  PlusSquare,
  ListTodo,
  Bell,
  BarChart3

}

from 'lucide-react'

import {

  NavLink

}

from 'react-router-dom'

export default function MobileNavbar({

  notificationCount = 0

}) {

  // =======================================
  // NAVIGATION
  // =======================================
  const navItems = [

    {
      path: '/',
      label: 'Dashboard',
      icon: LayoutDashboard
    },

    {
      path: '/input',
      label: 'Input',
      icon: PlusSquare
    },

    {
      path: '/semua',
      label: 'Kegiatan',
      icon: ListTodo
    },

    {
      path: '/notifikasi',
      label: 'Notif',
      icon: Bell
    },

    {
      path: '/analitik',
      label: 'Analitik',
      icon: BarChart3
    }

  ]

  // =======================================
  // UI
  // =======================================
  return (

    <div className="
      lg:hidden

      fixed
      bottom-0
      left-0
      right-0

      z-50

      border-t
      border-slate-200

      bg-white/95
      backdrop-blur-xl

      px-2
      py-2
    ">

      <div className="
        grid
        grid-cols-5
        gap-1
      ">

        {navItems.map(item => {

          const Icon = item.icon

          return (

            <NavLink

              key={item.path}

              to={item.path}

              className={({ isActive }) => `
                relative

                flex
                flex-col
                items-center
                justify-center

                gap-1

                py-3
                px-2

                rounded-2xl

                transition-all

                ${isActive

                  ? `
                    bg-indigo-600
                    text-white
                  `

                  : `
                    text-slate-500
                  `
                }
              `}
            >

              <div className="
                relative
              ">

                <Icon className="
                  w-5
                  h-5
                " />

                {/* NOTIF */}
                {item.path === '/notifikasi'
                  &&
                  notificationCount > 0 && (

                    <div className="
                      absolute
                      -top-2
                      -right-2

                      min-w-5
                      h-5

                      px-1

                      rounded-full

                      flex
                      items-center
                      justify-center

                      bg-rose-500
                      text-white

                      text-[10px]
                      font-bold
                    ">

                      {notificationCount}

                    </div>

                  )}

              </div>

              <span className="
                text-[11px]
                font-semibold
              ">

                {item.label}

              </span>

            </NavLink>

          )
        })}

      </div>

    </div>

  )
}