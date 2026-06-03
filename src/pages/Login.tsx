import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import * as yup from 'yup'

type LoginFormData = {
  email: string
  senha: string
}

const loginSchema = yup.object({
  email: yup
    .string()
    .required('O e-mail é obrigatório')
    .email('Digite um e-mail válido'),

  senha: yup
    .string()
    .required('A senha é obrigatória')
    .min(6, 'A senha deve ter pelo menos 6 caracteres'),
})

function Login() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  })

  function entrar(dados: LoginFormData) {
    console.log('Dados do login:', dados)

    toast.success('Login realizado com sucesso!')

    setTimeout(() => {
      navigate('/dashboard')
    }, 1200)
  }

  return (
    <section className="flex min-h-[650px] items-center justify-center bg-[#f5f5f5] px-6 py-16">
      <div className="w-full max-w-xl rounded-xl bg-white px-12 py-12 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0067A8]">
            Unybay
          </h1>

          <p className="mt-4 text-sm font-medium text-gray-600">
            Acesse a sua conta
          </p>
        </div>

        <form onSubmit={handleSubmit(entrar)} className="mx-auto max-w-sm">
          <div className="mb-4">
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

          <div className="mb-8">
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
            Entrar
          </button>

          <div className="mt-7 text-center">
            <Link
              to="/cadastro"
              className="text-sm font-medium text-gray-400 transition hover:text-[#0067A8]"
            >
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Login