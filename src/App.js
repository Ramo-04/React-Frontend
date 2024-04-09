import './App.css';
import AppBar from './components/appBar';
import Rutas from './components/Rutas'; // Importa el componente Routes
import { BrowserRouter,} from 'react-router-dom';
import './App.css';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <AppBar/>
     <Rutas/> 
    </div>
  </BrowserRouter>
  );
}

export default App;
