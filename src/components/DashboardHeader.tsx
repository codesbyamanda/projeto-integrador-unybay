import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function DashboardHeader() {
  const navigate = useNavigate()

  function sair() {
    toast.info('Você saiu da conta.')

    setTimeout(() => {
      navigate('/')
    }, 1000)
  }

  return (
    <header className="w-full h-20 bg-[#0067A8] border-b-2 border-gray-300 shadow-md flex items-center justify-between">
      <div className="px-12">
        <Link to="/dashboard">
          <h1 className="text-white text-3xl font-bold">
            Unybay
          </h1>
        </Link>
      </div>

      <nav className="h-full flex items-center gap-8 pr-14">
        <Link
          to="/dashboard"
          className="text-white font-semibold hover:text-orange-300 transition-colors"
        >
          Home
        </Link>

        <Link
          to="/dashboard/quem-somos"
          className="text-white font-semibold hover:text-orange-300 transition-colors"
        >
          Quem Somos
        </Link>

        <button
          type="button"
          onClick={sair}
          className="text-white font-semibold hover:text-orange-300 transition-colors"
        >
          Sair
        </button>

        <Link
          to="/dashboard/anuncios/novo"
          className="rounded-lg bg-white px-9 py-3 font-semibold text-orange-500 shadow-md transition hover:bg-orange-50 hover:shadow-lg"
        >
          Anunciar
        </Link>
      </nav>
    </header>
  )
}

export default DashboardHeader