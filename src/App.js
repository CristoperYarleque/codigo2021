import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CarritoContextProvider from "./context/carrito";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductoId from "./components/detalledeProducto/ProductoId";
import Busqueda from "./components/busqueda/Busqueda";

import Header from "./components/Header/Header";
import Inicio from "./views/Inicio";
import Tienda from "./views/Tienda";
import Noticias from "./views/Noticias";
import AcercaDe from "./views/AcercaDe";
import Carrito from "./views/carrito";
import FinalizarCompra from "./views/finalizar-compra/index.jsx";
import Footer from "./components/footer";
import NotFound from "./views/NotFound";

import VentasJuegosView from "./views/VentasJuegosView";
import ListaJuegosView from "./views/ListaJuegosView";
import Login from "./components/Login";
import AdminView from "./views/AdminView";
// import FormularioVentas from "./components/FormularioVentas";
import RegistrarJuegosView from "./views/RegistrarJuegosView";
import EditarJuegosView from "./views/EditarJuegosView";
import EditarVentaJuegosView from "./views/EditarVentaJuegosView";

export default function App() {
  return (
    <CarritoContextProvider>
      <Router>
        <Header />

        <div className="app">
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/acercade" element={<AcercaDe />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/finalizar-compra" element={<FinalizarCompra />} />
            <Route path="/detalle/:id" element={<ProductoId />} />
            <Route path="/search/:busqueda" element={<Busqueda />} />
            
            <Route path="/login" element={<Login/>}/>     
            <Route path="/admin" element={<AdminView/>}/> 
            <Route path="/registrarJuego" element={<RegistrarJuegosView/>} />        
            <Route path="/editarJuego/:id" element={<EditarJuegosView/>}/>      
            <Route path="/listajuegos" element={<ListaJuegosView/>}/>            
            <Route path="/ventasJuegos" element={<VentasJuegosView/>}/>       
            <Route path="/editarventas/:id" element={<EditarVentaJuegosView/>}/>
            

          </Routes>
        </div>
        <Footer />

        <ToastContainer />
      </Router>
    </CarritoContextProvider>
  );
}
