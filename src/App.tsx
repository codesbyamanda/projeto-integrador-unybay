import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Produtos from './pages/Produtos'
import ProdutoDetalhes from './pages/ProdutoDetalhes'
import QuemSomos from './pages/QuemSomos'
import ResultadoBusca from './pages/ResultadoBusca'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/resultado-busca" element={<ResultadoBusca />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App