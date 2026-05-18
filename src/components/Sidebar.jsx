// =======================================
// FILE: src/components/layout/Sidebar.jsx
// =======================================

import {

  LayoutDashboard,
  PlusSquare,
  ListTodo,
  Bell,
  BarChart3,
  LogOut

}

from 'lucide-react'

import {

  NavLink

}

from 'react-router-dom'

export default function Sidebar({

  notificationCount,

  onLogout

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
      label: 'Input Kegiatan',
      icon: PlusSquare
    },

    {
      path: '/semua',
      label: 'Semua Kegiatan',
      icon: ListTodo
    },

    {
      path: '/notifikasi',
      label: 'Notifikasi',
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
      hidden
      lg:flex

      flex-col
      justify-between

      w-70
      h-screen

      sticky
      top-0

      bg-white
      border-r
      border-slate-200

      px-5
      py-6
    ">

      {/* =======================================
          TOP
      ======================================= */}
      <div>

        {/* LOGO */}
        <div className="mb-10">

          <h1 className="
            text-3xl
            font-black
            text-indigo-600
          ">

            IngatAku

          </h1>

          <p className="
            text-slate-500
            text-sm
            mt-2
          ">

            Smart Productivity System

          </p>

        </div>

        {/* NAVIGATION */}
        <div className="
          flex
          flex-col
          gap-2
        ">

          {navItems.map(item => {

            const Icon = item.icon

            return (

              <NavLink

                key={item.path}

                to={item.path}

                className={({ isActive }) => `
                  flex
                  items-center
                  justify-between

                  w-full

                  px-4
                  py-4

                  rounded-2xl

                  transition-all

                  ${isActive

                    ? `
                      bg-indigo-600
                      text-white
                      shadow-lg
                    `

                    : `
                      text-slate-600
                      hover:bg-slate-100
                    `
                  }
                `}
              >

                {/* LEFT */}
                <div className="
                  flex
                  items-center
                  gap-3
                ">

                  <Icon className="
                    w-5
                    h-5
                  " />

                  <span className="
                    font-semibold
                  ">

                    {item.label}

                  </span>

                </div>

                {/* NOTIFICATION */}
                {item.path === '/notifikasi'
                  &&
                  notificationCount > 0 && (

                    <div className="
                      min-w-6
                      h-6

                      px-2

                      rounded-full

                      flex
                      items-center
                      justify-center

                      text-xs
                      font-bold

                      bg-rose-500
                      text-white
                    ">

                      {notificationCount}

                    </div>

                  )}

              </NavLink>

            )
          })}

        </div>

      </div>

      {/* =======================================
          BOTTOM
      ======================================= */}
      <button

        onClick={onLogout}

        className="
          flex
          items-center
          gap-3

          px-4
          py-4

          rounded-2xl

          text-slate-600

          hover:bg-rose-50
          hover:text-rose-500

          transition
        "
      >

        <LogOut className="
          w-5
          h-5
        " />

        <span className="
          font-semibold
        ">

          Logout

        </span>

      </button>

    </div>

  )
}