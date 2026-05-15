import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formulario from "./components/Formulario"; // seu arquivo atual
import Perfil from "./components/Perfil";     // o arquivo que criamos acima

function App() {
    return (
        <BrowserRouter>
            <Routes>
   
                <Route path="/" element={<Formulario />} />
                
                
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;