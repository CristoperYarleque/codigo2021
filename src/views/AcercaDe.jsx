import { useEffect, useState } from "react"
import developers from "../data/data_developers"
import { obtenerProductosPorPagina } from "../services/Services"

export default function AcercaDe() {
    const [productos,setProductos] = useState([])

    const getData = async () => {
        try {
            const prodObtenidos = await obtenerProductosPorPagina(1,4)
            setProductos(prodObtenidos)
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
        getData()
    },[])

    return (
        <>
        <div className="row mt-3 d-flex justify-content-center" style={{width:"100vw"}}>
            <h1 className="text-primary text-center fw-bold">PALACE GAMES</h1>
            <h2 className="text-secondary text-center mt-2 fw-bold">Accede a los juegos al instante</h2>
            <h4 className="text-center text-dark">Disfruta de ofertas exclusivas, actualizaciones automáticas y otras grandes ventajas. Desde grandes compañías hasta estudios independientes pasando por todo lo intermedio.</h4>
            {productos.map(({img_juego,nom_juego},i) => (
                <div className="col-sm-10 col-md-6 col-lg-3 d-flex justify-content-center mt-4">
                    <img id="imagen-acercade" src={img_juego} alt={nom_juego} style={{width:"200px",borderRadius:"10%"}}/>
                </div>
            ))}
            <hr className="mt-4" />
            <h2 className="text-center fw-bold mt-2">Nuestro Equipo</h2>
            <hr className="mt-4" />
            {developers.map(({imagen,nombre,descripcion},i) => (
            <div className="d-flex justify-content-center my-2 ms-4 col-sm-10 col-md-6 col-lg-5" key={i} style={{border:"1px solid black",borderRadius:"10px"}}>
                <img id="imagen-acercade" className="my-4 me-5" src={imagen} alt={nombre} style={{width:"150px",borderRadius:"100%"}} />
                <div className="d-flex flex-column my-4 justify-content-center">
                <h5 className="fw-bold">{nombre}</h5>
                <h5 className="text-secondary">{descripcion}</h5>
                <li style={{listStyle:"none"}}>
                <i className="bi bi-facebook me-3" style={{fontSize: "25px",cursor: "pointer"}}/>
                <i className="bi bi-instagram me-3" style={{fontSize: "25px",cursor: "pointer"}}/>
                <i className="bi bi-twitter me-4" style={{fontSize: "25px",cursor: "pointer"}}/>
                </li>
                </div>
            </div>
            ))}
        </div>
        </>
    )
}
