import { Routes, Route } from 'react-router-dom';
import PaginaBaseAdmin from './pages/Admin/PaginaBaseAdmin';
import AdministracaoPratos from './pages/Admin/Pratos/AdministraçãoPratos';
import FormularioPrato from './pages/Admin/Pratos/FormularioPrato';
import AdministracaoRestaurantes from './pages/Admin/Restaurantes/AdministracaoRestaurantes';
import FormularioRestaurante from './pages/Admin/Restaurantes/FormularioRestaurante';
import Home from './pages/Home';
import VitrineRestaurantes from './pages/VitrineRestaurantes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante />} />
        
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
        <Route path="pratos/:id" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
