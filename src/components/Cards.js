import { useEffect, useState } from "react";
import { obtenerProductosPorPagina } from "../services/Services";

import Producto from "./producto";



export default function Cards() {

  const [anadido,setAnadido] = useState([])
  const [pagina,setPagina] = useState(1)

  const getData = async () => {
    try {
      const prodObtenidos = await obtenerProductosPorPagina(pagina)
            setAnadido([ ...anadido, ...prodObtenidos])
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getData()
  },[pagina])

  return (
    <div className="container d-flex justify-content-center flex-column align-items-center">
      <div className="row">
        {anadido.map((prod, i) => (
          <div className="col-sm-10 col-md-6 col-lg-4" key={i}>
            <Producto prod={prod} />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
                <button className="btn btn-secondary mb-4" onClick={() => {
                    setPagina(pagina + 1)
                }}>Siguiente</button>
            </div>
    </div>
  );
}
