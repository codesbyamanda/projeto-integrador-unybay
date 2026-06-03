import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

type CadastroFormData = {
  nome: string
  email: string
  telefone: string
  cidade: string
  estado: string
  senha: string
}

const cadastroSchema = yup.object({
  nome: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'O nome deve ter pelo menos 3 caracteres'),

  email: yup
    .string()
    .required('O e-mail é obrigatório')
    .email('Digite um e-mail válido'),

  telefone: yup
    .string()
    .required('O telefone é obrigatório')
    .min(10, 'Digite um telefone válido'),

  cidade: yup
    .string()
    .required('A cidade é obrigatória'),

  estado: yup
    .string()
    .required('O estado é obrigatório')
    .min(2, 'Digite um estado válido'),

  senha: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve possuir pelo menos 6 caracteres'),
})

function Cadastro() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<CadastroFormData>({
    resolver: yupResolver(cadastroSchema),
  })

  function cadastrar(dados: CadastroFormData) {
    console.log('Dados do cadastro:', dados)

    alert('Cadastro realizado com sucesso!')
    navigate('/login')
  }

  const possuiErros = Object.keys(errors).length > 0

  return (
    <section className="flex min-h-[760px] items-center justify-center bg-[#f5f5f5] px-6 py-16">
      <div className="w-full max-w-2xl rounded-lg bg-white px-14 py-12 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0067A8]">
            Unybay
          </h1>

          <p className="mt-8 text-sm font-medium text-gray-500">
            Cadastre-se
          </p>
        </div>

        {isSubmitted && possuiErros && (
          <div className="mx-auto mb-6 max-w-md rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-500">
            Preencha corretamente todos os campos obrigatórios antes de continuar.
          </div>
        )}

        <form onSubmit={handleSubmit(cadastrar)} className="mx-auto max-w-md">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Nome"
              {...register('nome')}
              className={`w-full rounded-lg border px-5 py-3 text-sm text-gray-700 shadow-md outline-none transition focus:ring-2 ${
                errors.nome
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
              }`}
            />

            {errors.nome && (
              <p className="mt-1 pl-4 text-xs font-semibold text-red-400">
                {errors.nome.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <input
              type="email"
              placeholder="E-mail"
              {...register('email')}
              className={`w-full rounded-lg border px-5 py-3 text-sm text-gray-700 shadow-md outline-none transition focus:ring-2 ${
                errors.email
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
              }`}
            />

            {errors.email && (
              <p className="mt-1 pl-4 text-xs font-semibold text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Telefone"
              {...register('telefone')}
              className={`w-full rounded-lg border px-5 py-3 text-sm text-gray-700 shadow-md outline-none transition focus:ring-2 ${
                errors.telefone
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
              }`}
            />

            {errors.telefone && (
              <p className="mt-1 pl-4 text-xs font-semibold text-red-400">
                {errors.telefone.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Cidade"
              {...register('cidade')}
              className={`w-full rounded-lg border px-5 py-3 text-sm text-gray-700 shadow-md outline-none transition focus:ring-2 ${
                errors.cidade
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
              }`}
            />

            {errors.cidade && (
              <p className="mt-1 pl-4 text-xs font-semibold text-red-400">
                {errors.cidade.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Estado"
              {...register('estado')}
              className={`w-full rounded-lg border px-5 py-3 text-sm text-gray-700 shadow-md outline-none transition focus:ring-2 ${
                errors.estado
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
              }`}
            />

            {errors.estado && (
              <p className="mt-1 pl-4 text-xs font-semibold text-red-400">
                {errors.estado.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="password"
              placeholder="Senha"
              {...register('senha')}
              className={`w-full rounded-lg border px-5 py-3 text-sm text-gray-700 shadow-md outline-none transition focus:ring-2 ${
                errors.senha
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
              }`}
            />

            {errors.senha && (
              <p className="mt-1 pl-4 text-xs font-semibold text-red-400">
                {errors.senha.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#0067A8] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#00568c] hover:shadow-lg"
          >
            Cadastrar
          </button>

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-gray-400 transition hover:text-[#0067A8]"
            >
              Fazer login
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Cadastro