import { useState,useEffect } from "react"
import "../../style/anadidos.css"
import { obtenerProductosPorPagina } from "../../services/Services"

export default function Anadidos() {

    const [anadido,setAnadido] = useState([])
    const [pagina,setPagina] = useState(1)

    const getPage = async () => {
        try {
            const prodObtenidos = await obtenerProductosPorPagina(pagina)
            setAnadido([ ...anadido, ...prodObtenidos])
        } catch (error) {
            throw error
        }
    }

    useEffect(() => {
       getPage()
    },[pagina])

    return (
        <div className="container">
            <h3 className="ms-4 mt-2 text-primary d-flex tex_anad">Añadidos:</h3>
                {anadido.map((prod,i) => (
                    <div className="d-flex align-items-center m-4 bg-dark anad" key={i} style={{borderRadius:"10px",padding:"10px"}}>
                        <img className="img_anad" src={prod.img_juego} alt={prod.nom_juego} style={{width:"100px"}} />
                        <div className="m-2 text-white">
                            <h5 className="text-center text-primary"><u>{prod.nom_juego}</u></h5>
                            <p>{prod.desc_juego}</p>
                        </div>
                    </div>
                ))}
            <div className="d-flex justify-content-center">
                <button className="btn btn-secondary mb-4" onClick={() => {
                    setPagina(pagina + 1)
                }}>Siguiente</button>
            </div>
        </div>
    )
}
