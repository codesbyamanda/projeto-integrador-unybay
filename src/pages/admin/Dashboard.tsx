import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaGamepad,
  FaTshirt,
  FaCar,
  FaWrench,
  FaMugHot,
  FaGift,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa'
import { toast } from 'react-toastify'
import { api } from '../../services/api'
import ProductCard from '../../components/ProductCard'
import ProductCardSkeleton from '../../components/ProductCardSkeleton'

type ProdutoApi = {
  id: number
  title: string
  brand?: string
  price: number
  thumbnail: string
}

type Categoria = {
  nome: string
  icone: ReactNode
  apiCategoria: string
}

type AnuncioLocal = {
  id: number
  nome: string
  preco: string
  imagem: string
}

function Dashboard() {
  const [bannerAtual, setBannerAtual] = useState(0)
  const [busca, setBusca] = useState('')
  const [produtosRecentes, setProdutosRecentes] = useState<ProdutoApi[]>([])
  const [produtosRecomendados, setProdutosRecomendados] = useState<
    ProdutoApi[]
  >([])
  const [carregandoRecentes, setCarregandoRecentes] = useState(true)
  const [carregandoRecomendados, setCarregandoRecomendados] = useState(true)
  const [tituloRecomendados, setTituloRecomendados] = useState(
    'Produtos Recomendados',
  )
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('')

  const navigate = useNavigate()

  const banners = [
    {
      id: 1,
      imagem: '/banner-sale-1.jpg',
      titulo: 'BIG SALE',
      subtitulo: 'LIMITED TIME OFFER',
      desconto: '50% OFF',
    },
    {
      id: 2,
      imagem: '/banner-sale-2.jpg',
      titulo: 'MEGA OFERTAS',
      subtitulo: 'PRODUTOS SELECIONADOS',
      desconto: '30% OFF',
    },
    {
      id: 3,
      imagem: '/banner-sale-3.jpg',
      titulo: 'SUPER PROMOÇÃO',
      subtitulo: 'APROVEITE AGORA',
      desconto: '70% OFF',
    },
  ]

  const categorias: Categoria[] = [
    {
      nome: 'Jogos',
      icone: <FaGamepad />,
      apiCategoria: 'mobile-accessories',
    },
    {
      nome: 'Roupas',
      icone: <FaTshirt />,
      apiCategoria: 'womens-dresses',
    },
    {
      nome: 'Veículos',
      icone: <FaCar />,
      apiCategoria: 'vehicle',
    },
    {
      nome: 'Ferramentas',
      icone: <FaWrench />,
      apiCategoria: 'home-decoration',
    },
    {
      nome: 'Comida',
      icone: <FaMugHot />,
      apiCategoria: 'groceries',
    },
    {
      nome: 'Presentes',
      icone: <FaGift />,
      apiCategoria: 'womens-jewellery',
    },
    {
      nome: 'Outros',
      icone: <FaSearch />,
      apiCategoria: 'fragrances',
    },
  ]

  const anuncios: AnuncioLocal[] = [
    { id: 1, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 2, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 3, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 4, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
  ]

  useEffect(() => {
    async function buscarProdutosRecentes() {
      try {
        setCarregandoRecentes(true)

        const resposta = await api.get('/products?limit=4')

        setProdutosRecentes(resposta.data.products)
      } catch (error) {
        console.error('Erro ao buscar produtos recentes:', error)
        toast.error('Erro ao buscar produtos recentes.')
      } finally {
        setCarregandoRecentes(false)
      }
    }

    async function buscarProdutosRecomendados() {
      try {
        setCarregandoRecomendados(true)

        const resposta = await api.get('/products?limit=8&skip=4')

        setProdutosRecomendados(resposta.data.products)
      } catch (error) {
        console.error('Erro ao buscar produtos recomendados:', error)
        toast.error('Erro ao buscar produtos recomendados.')
      } finally {
        setCarregandoRecomendados(false)
      }
    }

    buscarProdutosRecentes()
    buscarProdutosRecomendados()
  }, [])

  async function buscarProdutosPorCategoria(categoria: Categoria) {
    try {
      setCarregandoRecomendados(true)
      setCategoriaSelecionada(categoria.nome)
      setTituloRecomendados(`Produtos de ${categoria.nome}`)

      const resposta = await api.get(
        `/products/category/${categoria.apiCategoria}`,
      )

      setProdutosRecomendados(resposta.data.products)
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error)
      toast.error('Erro ao buscar produtos da categoria.')
    } finally {
      setCarregandoRecomendados(false)
    }
  }

  function proximoBanner() {
    if (bannerAtual === banners.length - 1) {
      setBannerAtual(0)
    } else {
      setBannerAtual(bannerAtual + 1)
    }
  }

  function bannerAnterior() {
    if (bannerAtual === 0) {
      setBannerAtual(banners.length - 1)
    } else {
      setBannerAtual(bannerAtual - 1)
    }
  }

  function pesquisarProduto(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (busca.trim() === '') {
      return
    }

    navigate(`/dashboard/resultado-busca?q=${busca}`)
  }

  return (
    <section className="bg-[#f5f5f5] px-6 py-12">
      <div className="mx-auto max-w-5xl">
        {/* Carrossel de banners */}
        <div className="mb-8 overflow-hidden rounded-md shadow-md">
          <div className="relative h-56">
            <img
              src={banners[bannerAtual].imagem}
              alt={banners[bannerAtual].titulo}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-blue-900/20"></div>

            <div className="absolute left-10 top-1/2 -translate-y-1/2 text-white">
              <h1 className="text-5xl font-extrabold leading-none tracking-wide drop-shadow-md">
                {banners[bannerAtual].titulo}
              </h1>

              <p className="mt-2 text-lg font-bold italic tracking-wide drop-shadow-md">
                {banners[bannerAtual].subtitulo}
              </p>

              <button className="mt-5 rounded-full bg-yellow-400 px-8 py-2 text-xs font-bold text-blue-900 shadow-md transition hover:bg-yellow-300">
                SHOP NOW
              </button>
            </div>

            <div className="absolute right-10 top-1/2 flex h-24 w-24 -translate-y-1/2 items-center justify-center rounded-full bg-sky-200 shadow-lg">
              <span className="text-center text-2xl font-extrabold text-[#0067A8]">
                {banners[bannerAtual].desconto}
              </span>
            </div>

            <button
              type="button"
              onClick={bannerAnterior}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#0067A8] shadow-md transition hover:bg-white"
              aria-label="Banner anterior"
            >
              <FaChevronLeft />
            </button>

            <button
              type="button"
              onClick={proximoBanner}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#0067A8] shadow-md transition hover:bg-white"
              aria-label="Próximo banner"
            >
              <FaChevronRight />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {banners.map((banner, index) => (
                <button
                  type="button"
                  key={banner.id}
                  onClick={() => setBannerAtual(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    bannerAtual === index ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Ir para o banner ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>

        {/* Campo de busca */}
        <form onSubmit={pesquisarProduto} className="relative mb-12">
          <input
            type="text"
            placeholder="Estou buscando por..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            className="w-full rounded-md border border-gray-200 bg-white px-5 py-3 pr-12 text-sm text-gray-600 shadow-md outline-none focus:border-[#0067A8]"
          />

          <button
            type="submit"
            className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0067A8]"
            aria-label="Pesquisar"
          >
            <FaSearch />
          </button>
        </form>

        {/* Itens recentes */}
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-semibold text-gray-700">
            Itens Recentes
          </h2>

          {carregandoRecentes ? (
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <ProductCardSkeleton key={item} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-6">
              {produtosRecentes.map((produto) => (
                <ProductCard
                  key={produto.id}
                  id={produto.id}
                  title={produto.title}
                  brand={produto.brand}
                  price={produto.price}
                  thumbnail={produto.thumbnail}
                  linkPrefix="/dashboard/produtos"
                />
              ))}
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <Link
              to="/dashboard/produtos"
              className="text-lg font-medium text-gray-700 hover:text-[#0067A8]"
            >
              ver mais
            </Link>
          </div>
        </div>

        {/* Categorias */}
        <div className="mb-16 rounded-lg bg-[#0067A8] px-10 py-7 text-white shadow-lg">
          <h2 className="mb-7 text-xl font-semibold">
            Categorias
          </h2>

          <div className="flex items-center justify-between">
            {categorias.map((categoria) => (
              <button
                type="button"
                key={categoria.nome}
                onClick={() => buscarProdutosPorCategoria(categoria)}
                className="flex flex-col items-center gap-2 transition hover:-translate-y-1"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full text-lg shadow-sm transition ${
                    categoriaSelecionada === categoria.nome
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-500'
                  }`}
                >
                  {categoria.icone}
                </div>

                <p className="text-xs font-semibold text-white">
                  {categoria.nome}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Produtos recomendados */}
        <div className="mb-16">
          <h2 className="mb-8 text-2xl font-semibold text-gray-700">
            {tituloRecomendados}
          </h2>

          {carregandoRecomendados ? (
            <div className="grid grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <ProductCardSkeleton key={item} />
              ))}
            </div>
          ) : produtosRecomendados.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {produtosRecomendados.map((produto) => (
                <ProductCard
                  key={produto.id}
                  id={produto.id}
                  title={produto.title}
                  brand={produto.brand}
                  price={produto.price}
                  thumbnail={produto.thumbnail}
                  linkPrefix="/dashboard/produtos"
                />
              ))}
            </div>
          ) : (
            <div className="rounded-lg bg-white p-10 text-center shadow-md">
              <h3 className="text-xl font-semibold text-gray-700">
                Nenhum produto encontrado
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Tente selecionar outra categoria.
              </p>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <Link
              to="/dashboard/produtos"
              className="text-lg font-medium text-gray-700 hover:text-[#0067A8]"
            >
              ver todos
            </Link>
          </div>
        </div>

        {/* Anúncios */}
        <div>
          <h2 className="mb-8 text-2xl font-semibold text-gray-700">
            Anúncios
          </h2>

          <div className="grid grid-cols-4 gap-6">
            {anuncios.map((anuncio) => (
              <Link
                to={`/dashboard/produtos/${anuncio.id}`}
                key={anuncio.id}
                className="bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="mb-5 text-sm font-bold text-gray-700">
                  {anuncio.nome} (8ª Geração)
                </h3>

                <div className="mb-5 flex h-32 items-center justify-center">
                  <img
                    src={anuncio.imagem}
                    alt={anuncio.nome}
                    className="h-28 w-28 object-contain"
                  />
                </div>

                <p className="text-sm text-gray-500">
                  Amazon
                </p>

                <p className="text-xl font-semibold text-gray-600">
                  {anuncio.preco}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <Link
              to="/dashboard/anuncios"
              className="text-lg font-medium text-gray-700 hover:text-[#0067A8]"
            >
              ver todos
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard