import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

function ResultadoBusca() {
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const busca = searchParams.get('q') || 'produto'
  const estaNoDashboard = location.pathname.startsWith('/dashboard')

  const produtos = [
    { id: 1, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 2, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 3, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 4, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 5, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 6, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 7, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 8, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 9, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 10, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 11, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 12, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 13, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 14, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 15, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 16, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 17, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 18, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 19, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 20, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 21, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 22, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 23, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 24, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
  ]

  return (
    <section className="bg-[#f5f5f5] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-start justify-between gap-6">
          <div>
            <h1 className="mb-4 text-2xl font-semibold text-gray-700">
              Resultado de Busca
            </h1>

            <p className="text-sm text-gray-500">
              Resultado para:{' '}
              <span className="font-semibold text-[#0067A8]">
                {busca}
              </span>
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Listados por:{' '}
              <span className="font-semibold text-[#0067A8]">
                mais recentes
              </span>{' '}
              |{' '}
              <span className="font-semibold text-[#0067A8]">
                menor preço
              </span>
            </p>
          </div>

          <div className="relative w-72">
            <input
              type="text"
              placeholder="Estou buscando por..."
              defaultValue={busca}
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-600 shadow-sm outline-none focus:border-[#0067A8]"
            />

            <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <Link
              to={
                estaNoDashboard
                  ? `/dashboard/produtos/${produto.id}`
                  : `/produtos/${produto.id}`
              }
              key={produto.id}
              className="bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-[#0067A8]"
            >
              <h2 className="mb-5 text-sm font-bold text-gray-700">
                {produto.nome} (8ª Geração)
              </h2>

              <div className="mb-5 flex h-32 items-center justify-center">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="h-28 w-28 object-contain"
                />
              </div>

              <p className="text-sm text-gray-500">
                Amazon
              </p>

              <p className="text-xl font-semibold text-gray-600">
                {produto.preco}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ResultadoBusca