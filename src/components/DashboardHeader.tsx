import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'

function DashboardHeader() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function sair() {
    logout()
    toast.info('Você saiu da conta.')

    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <header className="w-full border-b-2 border-gray-300 bg-[#0067A8] shadow-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-between sm:px-6 lg:px-12">
        <Link to="/dashboard">
          <h1 className="text-3xl font-bold text-white">
            Unybay
          </h1>
        </Link>

        <nav className="flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto sm:justify-end sm:gap-8">
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-white transition-colors hover:text-orange-300 sm:text-base"
          >
            Home
          </Link>

          <Link
            to="/dashboard/quem-somos"
            className="text-sm font-semibold text-white transition-colors hover:text-orange-300 sm:text-base"
          >
            Quem Somos
          </Link>

          <button
            type="button"
            onClick={sair}
            className="text-sm font-semibold text-white transition-colors hover:text-orange-300 sm:text-base"
          >
            Sair
          </button>

          <Link
            to="/dashboard/anuncios/novo"
            className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-orange-500 shadow-md transition hover:bg-orange-50 hover:shadow-lg sm:px-9 sm:py-3 sm:text-base"
          >
            Anunciar
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default DashboardHeader