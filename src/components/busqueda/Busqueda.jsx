import { useParams,Link } from "react-router-dom"
import { useEffect, useState} from "react"
import { obtenerProductos1 } from "../../services/Services"

export default function Busqueda() {
    const [productos,setProductos] = useState([])
    
    const {busqueda} = useParams()

    const getData = async () => {
        try {
            const prodObtenidos = await obtenerProductos1(busqueda)
            setProductos(prodObtenidos)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getData()
    },[busqueda])

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
            <h4 className="mt-2 text-primary text-center mt-3">Resultado de busqueda:</h4> 
            {productos.length > 0? productos.map((prod,i) => (
                <Link to={`/detalle/${prod._id}`} style={{textDecoration:"none"}} className ="col-sm-10 col-md-6 col-lg-4" key={i}>
                    <div className="card text-center bg-dark ">
                        <img src={prod.imagen} alt={prod.nombre} className="img-titulo"/>
                        <div className="card-body text-light card-cont">
                        <h4 className="card-title">
                        {prod.nombre}
                        </h4>
                        <p className="card-text text-secondary">
                        {prod.descripcion}
                        </p>
                        <div className="d-flex justify-content-center">
                        <h3 className="ms-4 text-secondary">S/ {prod.precio}.00</h3>
                        </div>
                        </div>
                    </div>
                </Link>
            )) : <div className="mt-2" style={{width:"100vw",height:"50vh"}}>
                <h2 className="text-center text-secondary fw-bold">No hay resultado</h2>
            </div>
        }
            </div>
        </div>
    )
}
