import { useRef, useContext, useState } from "react"
import "../../style/header.css"
import logo from "../../assets/img/logo.png"
import { Link,useNavigate } from "react-router-dom"

import { CarritoContext } from "../../context/carrito";

export default function Header() {

	const { carrito } = useContext(CarritoContext);
	const [input,setInput] = useState("")
	const buscar = useRef()
	const navigate = useNavigate()

	const eventoClick = () => {
		navigate(`/search/${buscar.current.value}`)
		setInput("")
	}

	const eventoEnter = (e) => {
		if(e.key === "Enter"){
		navigate(`/search/${buscar.current.value}`)
		setInput("")
	}
	}

	const totalCarrito = carrito.reduce((total, prod) => {
        return total + prod.cantidad;
    }, 0);

	const cambios = () => {
		setInput(buscar.current.value)
	}

return (
    <header className="sticky-top">
        <nav className="navbar navbar-expand-md navbar-dark nav">
            <div className="container-fluid justify-content-center row">
                <img className="col-xs-6 col-sm-7 col-md-3 col-lg-3 ms-2" src={logo} alt="logo"/>
			    <button 
				className="navbar-toggler ms-3"
				data-bs-toggle="collapse"
				data-bs-target="#links"
			    >
				    <span className="navbar-toggler-icon" />
			    </button>
			    <div className="mt-2 col-xs-8 col-sm-8 col-md-4 col-lg-4 collapse navbar-collapse" id="links">
				    <ul className="navbar-nav text-center">
					    <Link to="/" className="navbar-item ms-3 Link">
						INICIO
					    </Link>
					    <Link to="/tienda" className="navbar-item ms-3 Link">
						TIENDA
					    </Link>
					    <Link to="/noticias" className="navbar-item ms-3 Link">
						NOTICIAS
					    </Link>
                        <Link to="/acercade" className="navbar-item ms-3 Link">
						ACERCA DE
					    </Link>
				    </ul>
					<div id="buscar" className="col-xs-8 col-sm-12 col-md-4 col-lg-4 mt-2 move">
				    <input type="text" onKeyUp={eventoEnter} value={input} onChange={cambios} ref={buscar} className="form-control ms-2" placeholder="Buscar juego..."/>
					<i onClick={eventoClick} className="bi bi-search lupa mt-2 ml-3"/>
                </div>
				<div className="d-flex col-xs-8 col-sm-12 col-md-1 col-lg-1 justify-content-center ms-2">
					<Link to="/carrito" className="navbar-item ms-3 Link position-relative">
						<i className="bi bi-cart3 text-white ms-3" style={{fontSize:"30px"}}/>
						<span className="cantidad-carrito-header bg-info d-flex justify-content-center align-items-center">
						{ carrito.length }
						</span>
					</Link>
                </div>
			    </div>
			</div>
        </nav>
    </header>
    )
}
