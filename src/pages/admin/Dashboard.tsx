import { useState } from 'react'
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

function Dashboard() {
  const [bannerAtual, setBannerAtual] = useState(0)
  const [busca, setBusca] = useState('')

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

  const produtosRecentes = [
    { id: 1, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 2, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 3, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 4, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
  ]

  const anuncios = [
    { id: 5, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 6, nome: 'Home Pod', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 7, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 8, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 9, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 10, nome: 'Home Pod', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 11, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
    { id: 12, nome: 'Echo Dot', preco: 'R$ 700,99', imagem: '/echo-dot.jpg' },
  ]

  const categorias = [
    { nome: 'Jogos', icone: <FaGamepad /> },
    { nome: 'Roupas', icone: <FaTshirt /> },
    { nome: 'Veículos', icone: <FaCar /> },
    { nome: 'Ferramentas', icone: <FaWrench /> },
    { nome: 'Comida', icone: <FaMugHot /> },
    { nome: 'Presentes', icone: <FaGift /> },
    { nome: 'Outros', icone: <FaSearch /> },
  ]

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
          <div className="relative h-72">
            <img
              src={banners[bannerAtual].imagem}
              alt={banners[bannerAtual].titulo}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-blue-900/10"></div>

            <button
              onClick={bannerAnterior}
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-orange-500 shadow-md transition hover:bg-white"
              aria-label="Banner anterior"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={proximoBanner}
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-orange-500 shadow-md transition hover:bg-white"
              aria-label="Próximo banner"
            >
              <FaChevronRight />
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
              {banners.map((banner, index) => (
                <button
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

          <div className="grid grid-cols-4 gap-6">
            {produtosRecentes.map((produto) => (
              <Link
                to={`/dashboard/produtos/${produto.id}`}
                key={produto.id}
                className="bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="mb-5 text-sm font-bold text-gray-700">
                  {produto.nome} (8ª Geração)
                </h3>

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
              <div
                key={categoria.nome}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg text-gray-500 shadow-sm">
                  {categoria.icone}
                </div>

                <p className="text-xs font-semibold text-white">
                  {categoria.nome}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Anúncios */}
        <div>
          <h2 className="mb-8 text-2xl font-semibold text-gray-700">
            Anúncios
          </h2>

          <div className="grid grid-cols-4 gap-6">
            {anuncios.map((produto) => (
              <Link
                to={`/dashboard/produtos/${produto.id}`}
                key={produto.id}
                className="bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="mb-5 text-sm font-bold text-gray-700">
                  {produto.nome} (8ª Geração)
                </h3>

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