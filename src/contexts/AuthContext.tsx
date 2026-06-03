import { createContext, useContext, useEffect, useState } from 'react'

type Usuario = {
  nome?: string
  email: string
}

type AuthContextData = {
  usuario: Usuario | null
  login: (usuario: Usuario) => void
  logout: () => void
}

const AuthContext = createContext({} as AuthContextData)

type AuthProviderProps = {
  children: React.ReactNode
}

function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem('@unybay:usuario')

    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    }
  }, [])

  function login(usuario: Usuario) {
    localStorage.setItem('@unybay:usuario', JSON.stringify(usuario))
    setUsuario(usuario)

    console.log('Usuário logado:', usuario)
  }

  function logout() {
    localStorage.removeItem('@unybay:usuario')
    setUsuario(null)

    console.log('Usuário saiu da conta')
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }