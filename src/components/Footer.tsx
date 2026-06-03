function Footer() {
  return (
    <footer className="w-full bg-[#0067A8] border-t-2 border-gray-300 text-white">
      <div className="h-64 px-12 py-9 relative">
        <h2 className="text-lg font-bold">
          Unybay
        </h2>

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