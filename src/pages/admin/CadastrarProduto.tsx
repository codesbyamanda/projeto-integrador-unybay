import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import * as yup from 'yup'

type ProdutoFormData = {
  nome: string
  fabricante: string
  categoria: string
  preco: string
  imagemPrincipal: string
  imagemSecundaria: string
  descricao: string
}

const produtoSchema = yup.object({
  nome: yup.string().required('O nome do produto é obrigatório'),

  fabricante: yup.string().required('O nome do fabricante é obrigatório'),

  categoria: yup.string().required('Selecione uma categoria'),

  preco: yup.string().required('O preço é obrigatório'),

  imagemPrincipal: yup
    .string()
    .required('A URL da imagem principal é obrigatória'),

  imagemSecundaria: yup
    .string()
    .required('A URL da imagem secundária é obrigatória'),

  descricao: yup
    .string()
    .required('A descrição é obrigatória')
    .min(10, 'A descrição deve ter pelo menos 10 caracteres'),
})

const anunciosMockados = [
  {
    id: 1,
    nome: 'Echo Dot',
    fabricante: 'Amazon',
    categoria: 'Eletrônicos',
    preco: '700,99',
    imagemPrincipal: '/echo-dot.jpg',
    imagemSecundaria: '/echo-dot.jpg',
    descricao:
      '<p>Echo Dot de 8ª geração com assistente virtual Alexa, ideal para ouvir músicas, controlar dispositivos inteligentes e facilitar tarefas do dia a dia.</p>',
  },
  {
    id: 2,
    nome: 'Echo Dot',
    fabricante: 'Amazon',
    categoria: 'Eletrônicos',
    preco: '700,99',
    imagemPrincipal: '/echo-dot.jpg',
    imagemSecundaria: '/echo-dot.jpg',
    descricao:
      '<p>Produto compacto, moderno e funcional, indicado para ambientes como sala, quarto ou escritório.</p>',
  },
  {
    id: 3,
    nome: 'Echo Dot',
    fabricante: 'Amazon',
    categoria: 'Eletrônicos',
    preco: '700,99',
    imagemPrincipal: '/echo-dot.jpg',
    imagemSecundaria: '/echo-dot.jpg',
    descricao:
      '<p>Caixa de som inteligente com boa qualidade sonora e integração com comandos de voz.</p>',
  },
  {
    id: 4,
    nome: 'Echo Dot',
    fabricante: 'Amazon',
    categoria: 'Eletrônicos',
    preco: '700,99',
    imagemPrincipal: '/echo-dot.jpg',
    imagemSecundaria: '/echo-dot.jpg',
    descricao:
      '<p>Produto anunciado na plataforma UnyBay, com foco em praticidade, tecnologia e conectividade.</p>',
  },
]

function CadastrarProduto() {
  const navigate = useNavigate()
  const { id } = useParams()

  const estaEditando = Boolean(id)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<ProdutoFormData>({
    resolver: yupResolver(produtoSchema),
    defaultValues: {
      nome: '',
      fabricante: '',
      categoria: '',
      preco: '',
      imagemPrincipal: '',
      imagemSecundaria: '',
      descricao: '',
    },
  })

  useEffect(() => {
    if (estaEditando && id) {
      const anuncioEncontrado = anunciosMockados.find(
        (anuncio) => anuncio.id === Number(id),
      )

      if (anuncioEncontrado) {
        reset({
          nome: anuncioEncontrado.nome,
          fabricante: anuncioEncontrado.fabricante,
          categoria: anuncioEncontrado.categoria,
          preco: anuncioEncontrado.preco,
          imagemPrincipal: anuncioEncontrado.imagemPrincipal,
          imagemSecundaria: anuncioEncontrado.imagemSecundaria,
          descricao: anuncioEncontrado.descricao,
        })
      }
    }
  }, [estaEditando, id, reset])

  function salvarProduto(dados: ProdutoFormData) {
    console.log('Dados do produto:', dados)

    if (estaEditando) {
      toast.success('Anúncio atualizado com sucesso!')
    } else {
      toast.success('Produto cadastrado com sucesso!')
    }

    setTimeout(() => {
      navigate('/dashboard/anuncios')
    }, 1200)
  }

  const possuiErros = Object.keys(errors).length > 0

  return (
    <section className="min-h-[650px] bg-[#f5f5f5] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-gray-700">
            {estaEditando ? 'Editar anúncio' : 'Cadastrar anúncio'}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            {estaEditando
              ? 'Altere as informações do produto selecionado.'
              : 'Preencha as informações abaixo para criar um novo anúncio.'}
          </p>
        </div>

        {isSubmitted && possuiErros && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-500">
            Preencha corretamente todos os campos obrigatórios antes de salvar.
          </div>
        )}

        <form onSubmit={handleSubmit(salvarProduto)}>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                placeholder="Nome do Produto"
                {...register('nome')}
                className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:ring-2 ${
                  errors.nome
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
                }`}
              />

              {errors.nome && (
                <p className="mt-1 text-xs font-semibold text-red-400">
                  {errors.nome.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Nome do Fabricante"
                {...register('fabricante')}
                className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:ring-2 ${
                  errors.fabricante
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
                }`}
              />

              {errors.fabricante && (
                <p className="mt-1 text-xs font-semibold text-red-400">
                  {errors.fabricante.message}
                </p>
              )}
            </div>

            <div>
              <select
                {...register('categoria')}
                className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:ring-2 ${
                  errors.categoria
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
                }`}
              >
                <option value="">Selecione uma categoria</option>
                <option value="Jogos">Jogos</option>
                <option value="Roupas">Roupas</option>
                <option value="Veículos">Veículos</option>
                <option value="Ferramentas">Ferramentas</option>
                <option value="Comida">Comida</option>
                <option value="Presentes">Presentes</option>
                <option value="Outros">Outros</option>
                <option value="Eletrônicos">Eletrônicos</option>
              </select>

              {errors.categoria && (
                <p className="mt-1 text-xs font-semibold text-red-400">
                  {errors.categoria.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Preço"
                {...register('preco')}
                className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:ring-2 ${
                  errors.preco
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
                }`}
              />

              {errors.preco && (
                <p className="mt-1 text-xs font-semibold text-red-400">
                  {errors.preco.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="URL da imagem"
                {...register('imagemPrincipal')}
                className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:ring-2 ${
                  errors.imagemPrincipal
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
                }`}
              />

              {errors.imagemPrincipal && (
                <p className="mt-1 text-xs font-semibold text-red-400">
                  {errors.imagemPrincipal.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="URL da imagem"
                {...register('imagemSecundaria')}
                className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:ring-2 ${
                  errors.imagemSecundaria
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
                }`}
              />

              {errors.imagemSecundaria && (
                <p className="mt-1 text-xs font-semibold text-red-400">
                  {errors.imagemSecundaria.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-3">
            <Controller
              name="descricao"
              control={control}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Digite a descrição do produto..."
                  className="bg-white"
                />
              )}
            />

            {errors.descricao && (
              <p className="mt-1 text-xs font-semibold text-red-400">
                {errors.descricao.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="mt-8 w-full rounded-sm bg-[#0067A8] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#00568c]"
          >
            {estaEditando ? 'Salvar alterações' : 'Salvar'}
          </button>
        </form>
      </div>
    </section>
  )
}

export default CadastrarProduto