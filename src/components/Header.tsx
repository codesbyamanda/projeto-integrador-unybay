import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="w-full border-b-2 border-gray-300 bg-[#0067A8] shadow-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-between sm:px-6">
        <Link to="/">
          <h1 className="text-3xl font-bold text-white sm:text-3xl">
            UnyBay
          </h1>
        </Link>

        <nav className="flex w-full flex-wrap items-center justify-center gap-3 sm:w-auto sm:justify-end sm:gap-8">
          <Link
            to="/"
            className="text-sm font-semibold text-white transition-colors hover:text-orange-300 sm:text-base"
          >
            Home
          </Link>

          <Link
            to="/quem-somos"
            className="text-sm font-semibold text-white transition-colors hover:text-orange-300 sm:text-base"
          >
            Quem somos
          </Link>

          <Link
            to="/login"
            className="rounded-full bg-orange-500 px-6 py-2 text-sm font-semibold text-white shadow-md transition-all hover:bg-orange-600 hover:shadow-lg sm:px-8 sm:py-3 sm:text-base"
          >
            Entrar
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header