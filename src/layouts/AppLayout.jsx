import Sidebar from '../components/Sidebar'
import MobileNavbar from '../components/MobileNavbar'
import { isUnreadNotification } from '../utils/notificationEngine'

export default function AppLayout({ activities = [], onLogout, children }) {
  const notificationCount = activities.filter(isUnreadNotification).length

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar notificationCount={notificationCount} onLogout={onLogout} />
      <main className="flex-1 min-w-0 pb-24 lg:pb-0">{children}</main>
      <MobileNavbar notificationCount={notificationCount} />
    </div>
  )
}