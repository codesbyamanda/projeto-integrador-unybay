import { Link, useParams } from 'react-router-dom'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

function ProdutoDetalhes() {
  const { id } = useParams()

  const produto = {
    id,
    nome: 'Echo Dot',
    geracao: '8ª Geração',
    marca: 'Amazon',
    modelo: 'Echo Dot com Alexa',
    categoria: 'Eletrônicos',
    vendedor: 'Unybay Store',
    preco: 'R$ 799,00',
    imagem: '/echo-dot.jpg',
  }

  return (
    <section className="bg-[#f5f5f5] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-4 text-sm text-gray-500">
            Resultado de Busca
          </p>

          <h1 className="text-2xl font-semibold text-gray-800">
            {produto.nome} ({produto.geracao})
          </h1>
        </div>

        <div className="mb-12 grid grid-cols-2 gap-10">
          {/* Imagem do produto */}
          <div className="relative flex min-h-[360px] items-center justify-center bg-white shadow-sm">
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-orange-400 hover:text-orange-500"
              aria-label="Imagem anterior"
            >
              <FaChevronLeft />
            </button>

            <img
              src={produto.imagem}
              alt={produto.nome}
              className="h-80 w-80 object-contain"
            />

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-orange-400 hover:text-orange-500"
              aria-label="Próxima imagem"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Informações do produto */}
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
                  {produto.nome}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">
                    Modelo:
                  </span>{' '}
                  {produto.modelo}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">
                    Marca:
                  </span>{' '}
                  {produto.marca}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">
                    Categoria:
                  </span>{' '}
                  {produto.categoria}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">
                    Vendedor:
                  </span>{' '}
                  {produto.vendedor}
                </p>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-500">
                  Valor
                </p>

                <p className="mt-1 text-3xl font-semibold text-gray-700">
                  {produto.preco}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="max-w-4xl">
          <h2 className="mb-5 text-xl font-semibold text-gray-800">
            Descrição
          </h2>

          <div className="space-y-4 text-sm leading-7 text-gray-600">
            <p>
              Com design moderno e compacto, o Echo Dot é ideal para quem
              deseja praticidade no dia a dia. Ele permite ouvir músicas,
              acompanhar notícias, controlar dispositivos inteligentes e
              utilizar comandos de voz com a assistente Alexa.
            </p>

            <p>
              O produto conta com boa qualidade de som, conectividade simples e
              integração com diferentes serviços. É uma opção prática para
              ambientes como quarto, sala, escritório ou cozinha.
            </p>

            <ul className="list-disc space-y-2 pl-6">
              <li>
                Ideal para ouvir músicas, podcasts e notícias.
              </li>
              <li>
                Compatível com comandos de voz por meio da Alexa.
              </li>
              <li>
                Design compacto, moderno e fácil de instalar.
              </li>
              <li>
                Pode auxiliar no controle de dispositivos inteligentes.
              </li>
            </ul>
          </div>

          <div className="mt-10">
            <Link
              to="/produtos"
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