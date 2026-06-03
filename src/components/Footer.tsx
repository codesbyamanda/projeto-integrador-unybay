import { Link, useLocation } from 'react-router-dom'

function Footer() {
  const location = useLocation()

  const estaNoDashboard = location.pathname.startsWith('/dashboard')
  const linkFaleConosco = estaNoDashboard
    ? '/dashboard/fale-conosco'
    : '/fale-conosco'

  return (
    <footer className="w-full bg-[#0067A8] border-t-2 border-gray-300 text-white">
      <div className="relative h-64 px-12 py-9">
        <h2 className="text-lg font-bold">
          Unybay
        </h2>

        <Link
          to={linkFaleConosco}
          className="absolute right-12 top-9 text-sm font-semibold text-white transition hover:text-orange-300"
        >
          Fale conosco
        </Link>

        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-[11px] font-semibold mb-7">
            Unybay Educacional | Todos os direitos reservados
          </p>

          <div className="flex items-center justify-center gap-5">
            <a
              href="#"
              className="w-8 h-8 bg-white text-[#0067A8] flex items-center justify-center font-bold text-xl hover:scale-110 transition-transform"
              aria-label="LinkedIn"
            >
              in
            </a>

            <a
              href="#"
              className="w-8 h-8 bg-white text-[#0067A8] rounded-full flex items-center justify-center font-bold text-xl hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              f
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer