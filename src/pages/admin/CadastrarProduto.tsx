import { useEffect } from 'react'
import type { ChangeEvent } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import * as yup from 'yup'
import { useAuth } from '../../contexts/AuthContext'

type ProdutoFormData = {
  nome: string
  fabricante: string
  categoria: string
  preco: string
  imagemPrincipal: string
  imagemSecundaria: string
  descricao: string
}

type ProdutoCadastrado = ProdutoFormData & {
  id: number
  usuarioEmail: string
}

const produtoSchema = yup.object({
  nome: yup.string().required('O nome do produto é obrigatório'),

  fabricante: yup.string().required('O nome do fabricante é obrigatório'),

  categoria: yup.string().required('Selecione uma categoria'),

  preco: yup.string().required('O preço é obrigatório'),

  imagemPrincipal: yup
    .string()
    .required('A imagem principal é obrigatória'),

  imagemSecundaria: yup
    .string()
    .required('A imagem secundária é obrigatória'),

  descricao: yup
    .string()
    .required('A descrição é obrigatória')
    .min(10, 'A descrição deve ter pelo menos 10 caracteres'),
})

function CadastrarProduto() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { usuario } = useAuth()

  const estaEditando = Boolean(id)

  const chaveProdutos = usuario
    ? `@unybay:produtos:${usuario.email}`
    : '@unybay:produtos:sem-usuario'

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
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

  const imagemPrincipalPreview = watch('imagemPrincipal')
  const imagemSecundariaPreview = watch('imagemSecundaria')

  useEffect(() => {
    if (!usuario) {
      toast.error('Você precisa estar logado para acessar esta página.')
      navigate('/login')
      return
    }

    if (estaEditando && id) {
      const produtosSalvos = localStorage.getItem(chaveProdutos)
      const produtos: ProdutoCadastrado[] = produtosSalvos
        ? JSON.parse(produtosSalvos)
        : []

      const produtoEncontrado = produtos.find(
        (produto) => produto.id === Number(id),
      )

      if (produtoEncontrado) {
        reset({
          nome: produtoEncontrado.nome,
          fabricante: produtoEncontrado.fabricante,
          categoria: produtoEncontrado.categoria,
          preco: produtoEncontrado.preco,
          imagemPrincipal: produtoEncontrado.imagemPrincipal,
          imagemSecundaria: produtoEncontrado.imagemSecundaria,
          descricao: produtoEncontrado.descricao,
        })
      }
    }
  }, [usuario, estaEditando, id, reset, navigate, chaveProdutos])

  function buscarProdutosDoUsuario() {
    const produtosSalvos = localStorage.getItem(chaveProdutos)

    if (!produtosSalvos) {
      return []
    }

    return JSON.parse(produtosSalvos) as ProdutoCadastrado[]
  }

  function salvarProdutosDoUsuario(produtos: ProdutoCadastrado[]) {
    try {
      localStorage.setItem(chaveProdutos, JSON.stringify(produtos))
    } catch (error) {
      console.error('Erro ao salvar produtos no localStorage:', error)

      toast.error(
        'Não foi possível salvar o anúncio. Tente usar imagens menores.',
      )

      throw error
    }
  }

  function converterImagemParaBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const img = new Image()

        img.onload = () => {
          const canvas = document.createElement('canvas')
          const maxWidth = 600
          const maxHeight = 600

          let width = img.width
          let height = img.height

          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width)
              width = maxWidth
            }
          } else if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height)
            height = maxHeight
          }

          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')

          if (!ctx) {
            reject(new Error('Erro ao processar imagem'))
            return
          }

          ctx.drawImage(img, 0, 0, width, height)

          const imagemComprimida = canvas.toDataURL('image/jpeg', 0.7)

          resolve(imagemComprimida)
        }

        img.onerror = () => {
          reject(new Error('Erro ao carregar imagem'))
        }

        img.src = reader.result as string
      }

      reader.onerror = () => {
        reject(new Error('Erro ao ler arquivo'))
      }

      reader.readAsDataURL(file)
    })
  }

  async function selecionarImagemPrincipal(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      const imagemBase64 = await converterImagemParaBase64(file)

      setValue('imagemPrincipal', imagemBase64, {
        shouldValidate: true,
      })
    } catch (error) {
      console.error('Erro ao selecionar imagem principal:', error)
      toast.error('Erro ao carregar imagem principal.')
    }
  }

  async function selecionarImagemSecundaria(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    try {
      const imagemBase64 = await converterImagemParaBase64(file)

      setValue('imagemSecundaria', imagemBase64, {
        shouldValidate: true,
      })
    } catch (error) {
      console.error('Erro ao selecionar imagem secundária:', error)
      toast.error('Erro ao carregar imagem secundária.')
    }
  }

  function salvarProduto(dados: ProdutoFormData) {
    if (!usuario) {
      toast.error('Você precisa estar logado para cadastrar um produto.')
      return
    }

    try {
      const produtosAtuais = buscarProdutosDoUsuario()

      if (estaEditando && id) {
        const produtosAtualizados = produtosAtuais.map((produto) => {
          if (produto.id === Number(id)) {
            return {
              ...produto,
              ...dados,
            }
          }

          return produto
        })

        salvarProdutosDoUsuario(produtosAtualizados)

        console.log(
          'JSON do produto editado:',
          JSON.stringify(
            {
              id: Number(id),
              usuarioEmail: usuario.email,
              ...dados,
            },
            null,
            2,
          ),
        )

        toast.success('Anúncio atualizado com sucesso!')
      } else {
        const novoProduto: ProdutoCadastrado = {
          id: Date.now(),
          usuarioEmail: usuario.email,
          ...dados,
        }

        const produtosAtualizados = [...produtosAtuais, novoProduto]

        salvarProdutosDoUsuario(produtosAtualizados)

        console.log(
          'JSON do produto cadastrado:',
          JSON.stringify(novoProduto, null, 2),
        )

        toast.success('Produto cadastrado com sucesso!')
      }

      setTimeout(() => {
        navigate('/dashboard/anuncios')
      }, 1200)
    } catch (error) {
      console.error('Erro ao salvar produto:', error)
    }
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
              <label className="mb-2 block text-sm font-semibold text-gray-600">
                Imagem principal
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={selecionarImagemPrincipal}
                className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:ring-2 ${
                  errors.imagemPrincipal
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
                }`}
              />

              {imagemPrincipalPreview && (
                <div className="mt-3 flex h-32 items-center justify-center rounded-md bg-white shadow-sm">
                  <img
                    src={imagemPrincipalPreview}
                    alt="Prévia da imagem principal"
                    className="h-28 w-28 object-contain"
                  />
                </div>
              )}

              {errors.imagemPrincipal && (
                <p className="mt-1 text-xs font-semibold text-red-400">
                  {errors.imagemPrincipal.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-600">
                Imagem secundária
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={selecionarImagemSecundaria}
                className={`w-full rounded-md border bg-white px-4 py-3 text-sm text-gray-700 shadow-sm outline-none transition focus:ring-2 ${
                  errors.imagemSecundaria
                    ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                    : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
                }`}
              />

              {imagemSecundariaPreview && (
                <div className="mt-3 flex h-32 items-center justify-center rounded-md bg-white shadow-sm">
                  <img
                    src={imagemSecundariaPreview}
                    alt="Prévia da imagem secundária"
                    className="h-28 w-28 object-contain"
                  />
                </div>
              )}

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