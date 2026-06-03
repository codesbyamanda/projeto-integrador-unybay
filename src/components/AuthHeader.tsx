import { Link } from 'react-router-dom'

function AuthHeader() {
  return (
    <header className="w-full border-b-2 border-gray-300 bg-[#0067A8] shadow-md">
      <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-center px-4 py-4 sm:justify-start sm:px-6">
        <Link to="/">
          <h1 className="text-3xl font-bold text-white">
            UnyBay
          </h1>
        </Link>
      </div>
    </header>
  )
}

export default AuthHeader