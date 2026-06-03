import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'

type Anuncio = {
  id: number
  nome: string
  preco: string
  marca: string
  imagem: string
}

function MeusAnuncios() {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([
    {
      id: 1,
      nome: 'Echo Dot',
      preco: 'R$ 700,99',
      marca: 'Amazon',
      imagem: '/echo-dot.jpg',
    },
    {
      id: 2,
      nome: 'Echo Dot',
      preco: 'R$ 700,99',
      marca: 'Amazon',
      imagem: '/echo-dot.jpg',
    },
    {
      id: 3,
      nome: 'Echo Dot',
      preco: 'R$ 700,99',
      marca: 'Amazon',
      imagem: '/echo-dot.jpg',
    },
    {
      id: 4,
      nome: 'Echo Dot',
      preco: 'R$ 700,99',
      marca: 'Amazon',
      imagem: '/echo-dot.jpg',
    },
  ])

  const [modalAberto, setModalAberto] = useState(false)
  const [anuncioSelecionado, setAnuncioSelecionado] = useState<Anuncio | null>(
    null,
  )

  function abrirModalExclusao(anuncio: Anuncio) {
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

    setAnuncios((anunciosAtuais) =>
      anunciosAtuais.filter((anuncio) => anuncio.id !== anuncioSelecionado.id),
    )

    toast.success('Anúncio excluído com sucesso!')
    fecharModal()
  }

  return (
    <section className="relative min-h-[650px] bg-[#f5f5f5] px-6 py-16">
      <div className="mx-auto max-w-5xl">
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
              Clique em adicionar para cadastrar um novo produto.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-6">
              {anuncios.map((anuncio) => (
                <div
                  key={anuncio.id}
                  className="relative bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-lg hover:ring-2 hover:ring-[#1E9BDE]"
                >
                  <h2 className="mb-5 text-sm font-bold text-gray-700">
                    {anuncio.nome} (8ª Geração)
                  </h2>

                  <div className="mb-5 flex h-32 items-center justify-center">
                    <img
                      src={anuncio.imagem}
                      alt={anuncio.nome}
                      className="h-28 w-28 object-contain"
                    />
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-sm text-gray-500">
                        {anuncio.marca}
                      </p>

                      <p className="text-xl font-semibold text-gray-600">
                        {anuncio.preco}
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
                {anuncioSelecionado.nome} (8ª Geração)
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