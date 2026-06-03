import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="w-full h-16 bg-[#0067A8] border-b-2 border-gray-300 shadow-md flex items-center justify-between">
      <div className="px-5">
        <Link to="/">
          <h1 className="text-white text-3xl font-bold">
            UnyBay
          </h1>
        </Link>
      </div>

      <nav className="h-full flex items-center gap-10 pr-5">
        <Link
          to="/"
          className="text-white font-semibold hover:text-orange-300 transition-colors"
        >
          Home
        </Link>

        <Link
          to="/quem-somos"
          className="text-white font-semibold hover:text-orange-300 transition-colors"
        >
          Quem somos
        </Link>

        <Link
          to="/login"
          className="bg-orange-500 text-white font-semibold px-8 py-3 rounded-full shadow-md hover:bg-orange-600 hover:shadow-lg transition-all"
        >
          Entrar
        </Link>
      </nav>
    </header>
  )
}

export default Header