import { BrowserRouter, Routes, Route } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'

import Home from './pages/Home'
import Produtos from './pages/Produtos'
import ProdutoDetalhes from './pages/ProdutoDetalhes'
import QuemSomos from './pages/QuemSomos'
import ResultadoBusca from './pages/ResultadoBusca'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import FaleConosco from './pages/FaleConosco'

import Dashboard from './pages/admin/Dashboard'
import MeusAnuncios from './pages/admin/MeusAnuncios'
import CadastrarProduto from './pages/admin/CadastrarProduto'

import ScrollToTop from './utils/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/resultado-busca" element={<ResultadoBusca />} />
          <Route path="/fale-conosco" element={<FaleConosco />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/quem-somos" element={<QuemSomos />} />
          <Route path="/dashboard/fale-conosco" element={<FaleConosco />} />

          <Route path="/dashboard/produtos" element={<Produtos />} />
          <Route path="/dashboard/produtos/:id" element={<ProdutoDetalhes />} />
          <Route path="/dashboard/resultado-busca" element={<ResultadoBusca />} />

          <Route path="/dashboard/anuncios" element={<MeusAnuncios />} />
          <Route
            path="/dashboard/anuncios/novo"
            element={<CadastrarProduto />}
          />
          <Route
            path="/dashboard/anuncios/editar/:id"
            element={<CadastrarProduto />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App