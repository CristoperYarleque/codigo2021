import { obtenerProductos,obtenerCategorias } from "../../services/Services"
import { useEffect, useState } from "react"
import "../../style/productos.css"

import Producto from '../producto'

export default function Productos() {
    const [productoReal,setProductoReal] = useState([])
    const [productos,setProductos] = useState([])
    const [categorias,setCategorias] = useState([])
    const [titulo,setTitulo] = useState("Todos los juegos")

    const getData = async () => {
        try {
            const prodObtenidos = await obtenerProductos()
            const catObtenidas = await obtenerCategorias()
            setProductos(prodObtenidos)
            setProductoReal(prodObtenidos)
            setCategorias(catObtenidas)
        } catch (error) {
            throw error
        }
    }

    const filtroCat = (idCat) => {
        const productoFiltrado = productoReal.filter((prod) => prod.categoria_id == idCat)
        setProductos(productoFiltrado)
    }

    useEffect(() => {
        getData()
    },[])

    return (
    <div className="container-fluid text-center cat">
        <div>
            <div>
            <h4 className="text-primary">Categorias:</h4>
            </div>
            <div className="navbar navbar-expand-md navbar-dark justify-content-center">
            <button 
				className="navbar-toggler bg-dark"
				data-bs-toggle="collapse"
				data-bs-target="#cdk"
                >
                    <i className="bi bi-list-task" />
			    </button>
                <div className="collapse navbar-collapse mt-3 cdk" id="cdk">
                <h5 className="cats" onClick={() => {
                setProductos(productoReal)
                setTitulo("Todos los juegos")
            }}>Todos</h5>
            {categorias.map((cat,i) => (
                <h5 className="mt-1 cats" key={i} onClick={() => {
                    filtroCat(cat.id)
                    setTitulo(cat.nombre)
                }}>{cat.nombre}</h5>
            ))}
            </div>
            </div>
           
        </div>
        <div className="row d-flex justify-content-center">
            <h4 className="text-primary">{titulo}</h4>
            {productos.map((prod,i) => (
                <div className ="col-sm-10 col-md-6 col-lg-4" key={i}>
                   <Producto prod={prod} />
                </div>
            ))}
        </div>
    </div>
    )
}

