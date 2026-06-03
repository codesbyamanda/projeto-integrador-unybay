import { Outlet } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'
import Footer from '../components/Footer'

function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <DashboardHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default DashboardLayout