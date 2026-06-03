import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import * as yup from 'yup'

type FaleConoscoFormData = {
  nome: string
  email: string
  mensagem: string
}

const faleConoscoSchema = yup.object({
  nome: yup
    .string()
    .required('O nome é obrigatório')
    .min(3, 'Digite pelo menos 3 caracteres'),

  email: yup
    .string()
    .required('O e-mail é obrigatório')
    .email('Digite um e-mail válido'),

  mensagem: yup
    .string()
    .required('A mensagem é obrigatória')
    .min(10, 'Digite uma mensagem com pelo menos 10 caracteres'),
})

function FaleConosco() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<FaleConoscoFormData>({
    resolver: yupResolver(faleConoscoSchema),
  })

  function enviarMensagem(dados: FaleConoscoFormData) {
    console.log('Mensagem enviada:', dados)

    toast.success('Mensagem enviada com sucesso!')
    reset()
  }

  const possuiErros = Object.keys(errors).length > 0

  return (
    <section className="flex min-h-[650px] items-center justify-center bg-[#f5f5f5] px-6 py-16">
      <div className="w-full max-w-xl rounded-lg bg-white px-12 py-12 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0067A8]">
            Unybay
          </h1>

          <p className="mt-5 text-sm font-semibold text-gray-600">
            Fale Conosco através do formulário abaixo
          </p>
        </div>

        {isSubmitted && possuiErros && (
          <div className="mb-6 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-500">
            Preencha corretamente todos os campos antes de enviar.
          </div>
        )}

        <form onSubmit={handleSubmit(enviarMensagem)} className="mx-auto max-w-sm">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Nome completo"
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

          <div className="mb-6">
            <textarea
              placeholder="Escreva sua mensagem..."
              rows={6}
              {...register('mensagem')}
              className={`w-full resize-none rounded-lg border px-5 py-3 text-sm text-gray-700 shadow-md outline-none transition focus:ring-2 ${
                errors.mensagem
                  ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                  : 'border-gray-200 focus:border-[#0067A8] focus:ring-blue-100'
              }`}
            />

            {errors.mensagem && (
              <p className="mt-1 pl-4 text-xs font-semibold text-red-400">
                {errors.mensagem.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-[#0067A8] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#00568c] hover:shadow-lg"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  )
}

export default FaleConosco