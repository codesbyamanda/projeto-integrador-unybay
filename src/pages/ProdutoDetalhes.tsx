import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { api } from '../services/api'
import { toast } from 'react-toastify'

type ProdutoDetalhe = {
  id: number
  title: string
  brand?: string
  category: string
  description: string
  price: number
  thumbnail: string
  images: string[]
}

function ProdutoDetalhes() {
  const { id } = useParams()
  const location = useLocation()

  const estaNoDashboard = location.pathname.startsWith('/dashboard')
  const rotaVoltar = estaNoDashboard ? '/dashboard/produtos' : '/produtos'

  const [produto, setProduto] = useState<ProdutoDetalhe | null>(null)
  const [imagemAtual, setImagemAtual] = useState(0)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    async function buscarProduto() {
      try {
        setCarregando(true)

        const resposta = await api.get(`/products/${id}`)

        setProduto(resposta.data)
        setImagemAtual(0)
      } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error)
        toast.error('Erro ao buscar detalhes do produto.')
      } finally {
        setCarregando(false)
      }
    }

    buscarProduto()
  }, [id])

  function proximaImagem() {
    if (!produto || produto.images.length === 0) {
      return
    }

    if (imagemAtual === produto.images.length - 1) {
      setImagemAtual(0)
    } else {
      setImagemAtual(imagemAtual + 1)
    }
  }

  function imagemAnterior() {
    if (!produto || produto.images.length === 0) {
      return
    }

    if (imagemAtual === 0) {
      setImagemAtual(produto.images.length - 1)
    } else {
      setImagemAtual(imagemAtual - 1)
    }
  }

  if (carregando) {
    return (
      <section className="bg-[#f5f5f5] px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 h-8 w-64 animate-pulse rounded bg-gray-200"></div>

          <div className="grid grid-cols-2 gap-10">
            <div className="h-[360px] animate-pulse rounded bg-gray-200"></div>
            <div className="h-[360px] animate-pulse rounded bg-gray-200"></div>
          </div>

          <div className="mt-12 h-40 animate-pulse rounded bg-gray-200"></div>
        </div>
      </section>
    )
  }

  if (!produto) {
    return (
      <section className="bg-[#f5f5f5] px-6 py-10">
        <div className="mx-auto max-w-5xl rounded-lg bg-white p-10 text-center shadow-md">
          <h1 className="text-2xl font-semibold text-gray-700">
            Produto não encontrado
          </h1>

          <Link
            to={rotaVoltar}
            className="mt-6 inline-block rounded-full bg-[#0067A8] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#00568c]"
          >
            Voltar para produtos
          </Link>
        </div>
      </section>
    )
  }

  const imagemProduto =
    produto.images && produto.images.length > 0
      ? produto.images[imagemAtual]
      : produto.thumbnail

  return (
    <section className="bg-[#f5f5f5] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-4 text-sm text-gray-500">
            Resultado de Busca
          </p>

          <h1 className="text-2xl font-semibold text-gray-800">
            {produto.title}
          </h1>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-10">
          <div className="relative flex min-h-[360px] items-center justify-center bg-white shadow-sm">
            <button
              type="button"
              onClick={imagemAnterior}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-orange-400 hover:text-orange-500"
              aria-label="Imagem anterior"
            >
              <FaChevronLeft />
            </button>

            <img
              src={imagemProduto}
              alt={produto.title}
              className="h-80 w-80 object-contain"
            />

            <button
              type="button"
              onClick={proximaImagem}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-orange-400 hover:text-orange-500"
              aria-label="Próxima imagem"
            >
              <FaChevronRight />
            </button>
          </div>

          <div className="flex items-start">
            <div className="w-full bg-white p-8 shadow-sm">
              <h2 className="mb-5 text-lg font-semibold text-gray-700">
                Informações do anúncio
              </h2>

              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-gray-700">
                    Produto:
                  </span>{' '}
                  {produto.title}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">
                    Marca:
                  </span>{' '}
                  {produto.brand || 'Marca não informada'}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">
                    Categoria:
                  </span>{' '}
                  {produto.category}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">
                    Vendedor:
                  </span>{' '}
                  Unybay Store
                </p>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500">
                  Valor
                </p>

                <p className="mt-1 text-3xl font-semibold text-gray-700">
                  R$ {produto.price}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            Descrição
          </h2>

          <div className="space-y-4 text-sm leading-7 text-gray-600">
            <p>
              {produto.description}
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>
                Produto disponível na categoria {produto.category}.
              </li>
              <li>
                Informações carregadas diretamente da API.
              </li>
              <li>
                Imagens e dados atualizados conforme o produto selecionado.
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <Link
              to={rotaVoltar}
              className="inline-block rounded-full bg-[#0067A8] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#00568c]"
            >
              Voltar para produtos
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProdutoDetalhes