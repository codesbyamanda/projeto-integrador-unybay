import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useAuth } from '../../contexts/AuthContext'

type ProdutoCadastrado = {
  id: number
  usuarioEmail: string
  nome: string
  fabricante: string
  categoria: string
  preco: string
  imagemPrincipal: string
  imagemSecundaria: string
  descricao: string
}

function AnuncioDetalhes() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { usuario } = useAuth()

  const [anuncio, setAnuncio] = useState<ProdutoCadastrado | null>(null)
  const [imagemAtual, setImagemAtual] = useState(0)

  useEffect(() => {
    if (!usuario) {
      toast.error('Você precisa estar logado para acessar este anúncio.')
      navigate('/login')
      return
    }

    const chaveProdutos = `@unybay:produtos:${usuario.email}`
    const produtosSalvos = localStorage.getItem(chaveProdutos)

    if (!produtosSalvos) {
      setAnuncio(null)
      return
    }

    const produtos: ProdutoCadastrado[] = JSON.parse(produtosSalvos)

    const produtoEncontrado = produtos.find(
      (produto) => produto.id === Number(id),
    )

    if (produtoEncontrado) {
      setAnuncio(produtoEncontrado)
    } else {
      setAnuncio(null)
    }
  }, [id, usuario, navigate])

  if (!anuncio) {
    return (
      <section className="bg-[#f5f5f5] px-4 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-5xl rounded-lg bg-white p-6 text-center shadow-md sm:p-10">
          <h1 className="text-xl font-semibold text-gray-700 sm:text-2xl">
            Anúncio não encontrado
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Esse anúncio não existe ou não pertence ao usuário logado.
          </p>

          <Link
            to="/dashboard/anuncios"
            className="mt-6 inline-block rounded-lg bg-[#0067A8] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#00568c]"
          >
            Voltar para meus anúncios
          </Link>
        </div>
      </section>
    )
  }

  const imagens = [anuncio.imagemPrincipal, anuncio.imagemSecundaria].filter(
    Boolean,
  )

  const imagemExibida = imagens[imagemAtual] || anuncio.imagemPrincipal

  function proximaImagem() {
    if (imagens.length <= 1) {
      return
    }

    if (imagemAtual === imagens.length - 1) {
      setImagemAtual(0)
    } else {
      setImagemAtual(imagemAtual + 1)
    }
  }

  function imagemAnterior() {
    if (imagens.length <= 1) {
      return
    }

    if (imagemAtual === 0) {
      setImagemAtual(imagens.length - 1)
    } else {
      setImagemAtual(imagemAtual - 1)
    }
  }

  return (
    <section className="overflow-x-hidden bg-[#f5f5f5] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8">
          <p className="mb-3 text-sm text-gray-500">
            Meus anúncios
          </p>

          <h1 className="break-words text-2xl font-semibold text-gray-800 sm:text-3xl">
            {anuncio.nome}
          </h1>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="relative flex min-h-[280px] items-center justify-center rounded-lg bg-white p-6 shadow-sm sm:min-h-[360px]">
            {imagens.length > 1 && (
              <button
                type="button"
                onClick={imagemAnterior}
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-orange-400 shadow-md transition hover:text-orange-500 sm:left-4 sm:text-2xl"
                aria-label="Imagem anterior"
              >
                <FaChevronLeft />
              </button>
            )}

            <img
              src={imagemExibida}
              alt={anuncio.nome}
              className="max-h-64 w-full max-w-[260px] object-contain sm:max-h-80 sm:max-w-[320px]"
            />

            {imagens.length > 1 && (
              <button
                type="button"
                onClick={proximaImagem}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-orange-400 shadow-md transition hover:text-orange-500 sm:right-4 sm:text-2xl"
                aria-label="Próxima imagem"
              >
                <FaChevronRight />
              </button>
            )}
          </div>

          <div className="flex items-start">
            <div className="w-full rounded-lg bg-white p-6 shadow-sm sm:p-8">
              <h2 className="mb-5 text-lg font-semibold text-gray-700">
                Informações do anúncio
              </h2>

              <div className="space-y-3 text-sm text-gray-600">
                <p className="break-words">
                  <span className="font-semibold text-gray-700">
                    Produto:
                  </span>{' '}
                  {anuncio.nome}
                </p>

                <p className="break-words">
                  <span className="font-semibold text-gray-700">
                    Fabricante:
                  </span>{' '}
                  {anuncio.fabricante}
                </p>

                <p className="break-words">
                  <span className="font-semibold text-gray-700">
                    Categoria:
                  </span>{' '}
                  {anuncio.categoria}
                </p>

                <p className="break-words">
                  <span className="font-semibold text-gray-700">
                    Vendedor:
                  </span>{' '}
                  {usuario?.nome || usuario?.email}
                </p>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500">
                  Valor
                </p>

                <p className="mt-1 break-words text-2xl font-semibold text-gray-700 sm:text-3xl">
                  R$ {anuncio.preco}
                </p>
              </div>

              <Link
                to={`/dashboard/anuncios/editar/${anuncio.id}`}
                className="mt-8 inline-block w-full rounded-lg bg-orange-500 px-6 py-3 text-center text-sm font-bold text-white shadow-md transition hover:bg-orange-600 sm:w-auto"
              >
                Editar anúncio
              </Link>
            </div>
          </div>
        </div>

        <div className="max-w-4xl">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            Descrição
          </h2>

          <div
            className="prose prose-sm max-w-none break-words rounded-lg bg-white p-6 leading-7 text-gray-600 shadow-sm"
            dangerouslySetInnerHTML={{ __html: anuncio.descricao }}
          ></div>

          <div className="mt-10">
            <Link
              to="/dashboard/anuncios"
              className="inline-block w-full rounded-full bg-[#0067A8] px-6 py-3 text-center text-sm font-semibold text-white shadow-md transition hover:bg-[#00568c] sm:w-auto"
            >
              Voltar para meus anúncios
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AnuncioDetalhes