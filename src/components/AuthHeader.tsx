import { Link } from 'react-router-dom'

function AuthHeader() {
  return (
    <header className="w-full h-16 bg-[#0067A8] border-b-2 border-gray-300 shadow-md flex items-center">
      <div className="px-5">
        <Link to="/">
          <h1 className="text-white text-3xl font-bold">
            UnyBay
          </h1>
        </Link>
      </div>
    </header>
  )
}

export default AuthHeader