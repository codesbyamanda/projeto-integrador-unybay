import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { api } from '../services/api'
import ProductCard from '../components/ProductCard'
import ProductCardSkeleton from '../components/ProductCardSkeleton'
import { toast } from 'react-toastify'

type ProdutoApi = {
  id: number
  title: string
  brand?: string
  price: number
  thumbnail: string
}

type Ordenacao = 'recentes' | 'menor-preco'

function ResultadoBusca() {
  const [searchParams] = useSearchParams()
  const location = useLocation()

  const busca = searchParams.get('q') || ''
  const estaNoDashboard = location.pathname.startsWith('/dashboard')
  const linkPrefix = estaNoDashboard ? '/dashboard/produtos' : '/produtos'

  const [produtos, setProdutos] = useState<ProdutoApi[]>([])
  const [termoBusca, setTermoBusca] = useState(busca)
  const [ordenacao, setOrdenacao] = useState<Ordenacao>('recentes')
  const [carregandoProdutos, setCarregandoProdutos] = useState(true)

  useEffect(() => {
    async function buscarProdutos() {
      try {
        setCarregandoProdutos(true)

        const resposta = await api.get(`/products/search?q=${busca}`)

        setProdutos(resposta.data.products)
      } catch (error) {
        console.error('Erro ao buscar produtos:', error)
        toast.error('Erro ao buscar resultado da busca.')
      } finally {
        setCarregandoProdutos(false)
      }
    }

    buscarProdutos()
  }, [busca])

  function pesquisarProduto(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (termoBusca.trim() === '') {
      return
    }

    const rotaBusca = estaNoDashboard
      ? `/dashboard/resultado-busca?q=${termoBusca}`
      : `/resultado-busca?q=${termoBusca}`

    window.location.href = rotaBusca
  }

  function ordenarProdutos(lista: ProdutoApi[]) {
    const produtosOrdenados = [...lista]

    if (ordenacao === 'recentes') {
      return produtosOrdenados.sort((a, b) => b.id - a.id)
    }

    if (ordenacao === 'menor-preco') {
      return produtosOrdenados.sort((a, b) => a.price - b.price)
    }

    return produtosOrdenados
  }

  const produtosExibidos = ordenarProdutos(produtos)

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
              <button
                type="button"
                onClick={() => setOrdenacao('recentes')}
                className={`font-semibold ${
                  ordenacao === 'recentes'
                    ? 'text-[#0067A8]'
                    : 'text-gray-500 hover:text-[#0067A8]'
                }`}
              >
                mais recentes
              </button>{' '}
              |{' '}
              <button
                type="button"
                onClick={() => setOrdenacao('menor-preco')}
                className={`font-semibold ${
                  ordenacao === 'menor-preco'
                    ? 'text-[#0067A8]'
                    : 'text-gray-500 hover:text-[#0067A8]'
                }`}
              >
                menor preço
              </button>
            </p>
          </div>

          <form onSubmit={pesquisarProduto} className="relative w-72">
            <input
              type="text"
              placeholder="Estou buscando por..."
              value={termoBusca}
              onChange={(event) => setTermoBusca(event.target.value)}
              className="w-full rounded-md border border-gray-200 bg-white px-4 py-3 pr-10 text-sm text-gray-600 shadow-sm outline-none focus:border-[#0067A8]"
            />

            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#0067A8]"
              aria-label="Pesquisar"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {carregandoProdutos ? (
          <div className="grid grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : produtosExibidos.length > 0 ? (
          <div className="grid grid-cols-4 gap-6">
            {produtosExibidos.map((produto) => (
              <ProductCard
                key={produto.id}
                id={produto.id}
                title={produto.title}
                brand={produto.brand}
                price={produto.price}
                thumbnail={produto.thumbnail}
                linkPrefix={linkPrefix}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-white p-10 text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Nenhum produto encontrado
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Tente pesquisar por outro termo.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default ResultadoBusca