import { Outlet } from 'react-router-dom'
import AuthHeader from '../components/AuthHeader'
import Footer from '../components/Footer'

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <AuthHeader />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default AuthLayout