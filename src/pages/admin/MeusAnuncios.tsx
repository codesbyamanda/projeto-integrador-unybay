import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
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

function MeusAnuncios() {
  const navigate = useNavigate()
  const { usuario } = useAuth()

  const [anuncios, setAnuncios] = useState<ProdutoCadastrado[]>([])
  const [modalAberto, setModalAberto] = useState(false)
  const [anuncioSelecionado, setAnuncioSelecionado] =
    useState<ProdutoCadastrado | null>(null)

  const chaveProdutos = usuario
    ? `@unybay:produtos:${usuario.email}`
    : '@unybay:produtos:sem-usuario'

  useEffect(() => {
    if (!usuario) {
      toast.error('Você precisa estar logado para acessar seus anúncios.')

      setTimeout(() => {
        navigate('/login')
      }, 1200)

      return
    }

    const produtosSalvos = localStorage.getItem(chaveProdutos)

    if (produtosSalvos) {
      const produtos: ProdutoCadastrado[] = JSON.parse(produtosSalvos)
      setAnuncios(produtos)
    } else {
      setAnuncios([])
    }
  }, [usuario, chaveProdutos, navigate])

  function abrirModalExclusao(anuncio: ProdutoCadastrado) {
    setAnuncioSelecionado(anuncio)
    setModalAberto(true)
  }

  function fecharModal() {
    setModalAberto(false)
    setAnuncioSelecionado(null)
  }

  function confirmarExclusao() {
    if (!anuncioSelecionado) {
      return
    }

    const anunciosAtualizados = anuncios.filter(
      (anuncio) => anuncio.id !== anuncioSelecionado.id,
    )

    setAnuncios(anunciosAtualizados)
    localStorage.setItem(chaveProdutos, JSON.stringify(anunciosAtualizados))

    console.log(
      'JSON do produto excluído:',
      JSON.stringify(anuncioSelecionado, null, 2),
    )

    toast.success('Anúncio excluído com sucesso!')
    fecharModal()
  }

  return (
    <section className="relative min-h-[650px] bg-[#f5f5f5] px-6 py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-700">
            Anúncios
          </h1>

          <Link
            to="/dashboard/anuncios/novo"
            className="rounded-lg bg-orange-500 px-10 py-3 text-sm font-bold text-white shadow-md transition hover:bg-orange-600 hover:shadow-lg"
          >
            Adicionar
          </Link>
        </div>

        {anuncios.length === 0 ? (
          <div className="rounded-lg bg-white p-10 text-center shadow-md">
            <h2 className="text-xl font-semibold text-gray-700">
              Nenhum anúncio cadastrado
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Clique em adicionar para cadastrar um novo produto no seu perfil.
            </p>

            <Link
              to="/dashboard/anuncios/novo"
              className="mt-6 inline-block rounded-lg bg-[#0067A8] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#00568c]"
            >
              Cadastrar anúncio
            </Link>
          </div>
        ) : (
          <>
            <div className="mx-auto w-full max-w-5xl">
              {anuncios.map((anuncio) => (
                <div
                  key={anuncio.id}
                  className="relative bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-[#1E9BDE]"
                >
                  <h2 className="mb-5 text-sm font-bold text-gray-700">
                    {anuncio.nome}
                  </h2>

                  <div className="mb-5 flex h-32 items-center justify-center">
                    <img
                      src={anuncio.imagemPrincipal}
                      alt={anuncio.nome}
                      className="h-28 w-28 object-contain"
                    />
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        {anuncio.fabricante}
                      </p>

                      <p className="text-xl font-semibold text-gray-600">
                        R$ {anuncio.preco}
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 text-gray-600">
                      <Link
                        to={`/dashboard/anuncios/editar/${anuncio.id}`}
                        className="transition hover:text-[#0067A8]"
                        aria-label="Editar anúncio"
                        title="Editar anúncio"
                      >
                        <FaEdit />
                      </Link>

                      <button
                        type="button"
                        onClick={() => abrirModalExclusao(anuncio)}
                        className="transition hover:text-red-500"
                        aria-label="Excluir anúncio"
                        title="Excluir anúncio"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <p className="text-sm font-medium text-gray-600">
                {anuncios.length} {anuncios.length === 1 ? 'item' : 'itens'}
              </p>
            </div>
          </>
        )}
      </div>

      {modalAberto && anuncioSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-2xl">
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Excluir anúncio
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Essa ação não poderá ser desfeita.
                </p>
              </div>

              <button
                type="button"
                onClick={fecharModal}
                className="text-gray-400 transition hover:text-gray-700"
                aria-label="Fechar modal"
              >
                <FaTimes />
              </button>
            </div>

            <div className="mb-8 rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-600">
                Você tem certeza que deseja excluir o anúncio:
              </p>

              <p className="mt-2 font-bold text-gray-800">
                {anuncioSelecionado.nome}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {anuncioSelecionado.fabricante} - R$ {anuncioSelecionado.preco}
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={fecharModal}
                className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={confirmarExclusao}
                className="rounded-lg bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-red-600 hover:shadow-lg"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default MeusAnuncios