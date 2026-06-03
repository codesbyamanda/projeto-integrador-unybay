import {
  FaBookOpen,
  FaUsers,
  FaShieldAlt,
  FaHandshake,
  FaShoppingBag,
  FaLightbulb,
  FaHeart,
} from 'react-icons/fa'

function QuemSomos() {
  return (
    <section className="bg-[#f5f5f5] px-6 py-12">
      <div className="mx-auto w-full max-w-5xl">
        {/* Hero */}
        <div className="mb-14 overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col justify-center p-10">
              <span className="mb-4 w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-[#0067A8]">
                Sobre a UnyBay
              </span>

              <h1 className="mb-5 text-4xl font-bold leading-tight text-gray-800">
                Conectando pessoas a produtos de forma simples.
              </h1>

              <p className="mb-6 text-sm leading-7 text-gray-600">
                A UnyBay é uma plataforma fictícia criada para simular uma
                experiência de marketplace, permitindo que os usuários naveguem
                por anúncios, visualizem detalhes dos produtos e encontrem itens
                de diferentes categorias.
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-[#0067A8] px-4 py-2 text-xs font-semibold text-white">
                  Marketplace
                </span>

                <span className="rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white">
                  Projeto Integrador
                </span>

                <span className="rounded-full bg-gray-200 px-4 py-2 text-xs font-semibold text-gray-700">
                  React + Tailwind
                </span>
              </div>
            </div>

            <div className="relative min-h-[320px]">
              <img
                src="/quem-somos.jpg"
                alt="Equipe trabalhando em projeto digital"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-[#0067A8]/20"></div>

              <div className="absolute bottom-6 left-6 rounded-xl bg-white/90 p-5 shadow-lg backdrop-blur-sm">
                <p className="text-sm font-semibold text-gray-700">
                  Projeto acadêmico
                </p>

                <p className="mt-1 text-2xl font-bold text-[#0067A8]">
                  UnyBay
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nossa história */}
        <div className="mb-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-[#0067A8] p-8 text-white shadow-lg md:col-span-1">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl text-[#0067A8]">
              <FaShoppingBag />
            </div>

            <h2 className="mb-4 text-2xl font-bold">
              Nossa história
            </h2>

            <p className="text-sm leading-7 text-white/90">
              A UnyBay nasceu como uma proposta acadêmica para aplicar, na
              prática, os conhecimentos de desenvolvimento front-end com React.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-md md:col-span-2">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Como surgiu a ideia?
            </h2>

            <p className="mb-4 text-sm leading-7 text-gray-600">
              A ideia do projeto é representar uma plataforma de compra, venda e
              consulta de produtos. O usuário consegue acessar uma página
              inicial com anúncios, pesquisar itens, visualizar listas de
              produtos e abrir uma tela de detalhes com mais informações.
            </p>

            <p className="text-sm leading-7 text-gray-600">
              Mesmo sendo uma aplicação fictícia, a UnyBay foi pensada com foco
              em organização visual, navegação simples e uso de componentes
              reutilizáveis, como cabeçalho, rodapé, cards de produto e layout
              principal.
            </p>
          </div>
        </div>

        {/* Missão, visão e valores */}
        <div className="mb-14">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              O que nos guia
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-600">
              A plataforma foi criada com alguns princípios simples, mas
              importantes para entregar uma navegação mais clara e agradável.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-7 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl text-[#0067A8]">
                <FaLightbulb />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">
                Missão
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Facilitar a visualização de produtos e tornar a busca por
                anúncios mais simples, rápida e organizada.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl text-orange-500">
                <FaBookOpen />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">
                Visão
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Ser uma aplicação acadêmica com aparência profissional,
                demonstrando boas práticas de componentização e navegação.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-7 text-center shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl text-[#0067A8]">
                <FaHeart />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-800">
                Valores
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Clareza, simplicidade, organização, acessibilidade e cuidado com
                a experiência de quem utiliza a plataforma.
              </p>
            </div>
          </div>
        </div>

        {/* Faixa azul */}
        <div className="mb-14 overflow-hidden rounded-2xl bg-[#0067A8] shadow-lg">
          <div className="grid grid-cols-1 gap-8 p-8 text-white md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold">
                Uma experiência simples e funcional
              </h2>

              <p className="text-sm leading-7 text-white/90">
                A UnyBay foi desenvolvida pensando em uma navegação intuitiva:
                o usuário entra na página inicial, busca produtos, acessa a
                listagem completa e visualiza os detalhes de cada anúncio.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-white/10 p-5">
                <p className="text-3xl font-bold">
                  4+
                </p>

                <p className="mt-2 text-sm text-white/90">
                  páginas principais
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-5">
                <p className="text-3xl font-bold">
                  20+
                </p>

                <p className="mt-2 text-sm text-white/90">
                  cards de produtos
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-5">
                <p className="text-3xl font-bold">
                  7
                </p>

                <p className="mt-2 text-sm text-white/90">
                  categorias
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-5">
                <p className="text-3xl font-bold">
                  1
                </p>

                <p className="mt-2 text-sm text-white/90">
                  layout reutilizável
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Diferenciais */}
        <div className="mb-14">
          <h2 className="mb-8 text-3xl font-bold text-gray-800">
            Por que a UnyBay?
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0067A8] text-xl text-white">
                <FaBookOpen />
              </div>

              <h3 className="mb-2 font-bold text-gray-800">
                Projeto acadêmico
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Criado para aplicar conceitos estudados durante o curso.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0067A8] text-xl text-white">
                <FaUsers />
              </div>

              <h3 className="mb-2 font-bold text-gray-800">
                Foco no usuário
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Telas pensadas para facilitar a navegação e leitura.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0067A8] text-xl text-white">
                <FaShieldAlt />
              </div>

              <h3 className="mb-2 font-bold text-gray-800">
                Organização
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Estrutura separada em páginas, componentes e layout.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0067A8] text-xl text-white">
                <FaHandshake />
              </div>

              <h3 className="mb-2 font-bold text-gray-800">
                Simplicidade
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                Interface objetiva, clara e agradável para o usuário.
              </p>
            </div>
          </div>
        </div>

        {/* Fechamento */}
        <div className="rounded-2xl bg-white p-8 text-center shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            UnyBay: uma plataforma fictícia, mas feita com dedicação.
          </h2>

          <p className="mx-auto max-w-3xl text-sm leading-7 text-gray-600">
            Esta página faz parte do projeto integrador e apresenta informações
            fictícias sobre a empresa. O objetivo é demonstrar a construção de
            uma página institucional com React, Tailwind CSS, componentes,
            rotas e uma identidade visual própria.
          </p>
        </div>
      </div>
    </section>
  )
}

export default QuemSomos