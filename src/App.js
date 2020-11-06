// Importar bootstrap

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Importar estilos generales

import './App.css';

// Importar componentes

import RouterPage from './Componentes/RouterPage';

// Importar contexto

import { UserProvider } from './Context/UserContext';

function App() {
  return (
    <UserProvider>
      <RouterPage />
    </UserProvider>
  );
}

export default App;
