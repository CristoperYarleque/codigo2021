
import imagen1 from "../assets/last_2.png"
import img1 from "../assets/ventas_gato.JPG"
import { obtenerEstado } from "../services/estadoServices";
import { obtenerVentas } from "../services/Services";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function VentasJuegosView() {

    //estado de ventas original
    const [ventasOri, setVentasOri] = useState([]);

    //estado de ventas
    const [ventas, setVentas] = useState([])

    //estado de categorias de juego
    const [estado1, setEstado1] = useState([
        { nombre: "ADMITIDO", value: "1" },
        { nombre: "EN PROCESO", value: "2" },
        { nombre: "EN CAMINO", value: "3" },
        { nombre: "ENTREGADO", value: "4" }
    ])

    const [estado, setEstado] = useState([])

    //
    const navigate = useNavigate()

    const getDatos = async () => {
        try {
            let ventasObt = await obtenerVentas();
            setVentasOri(ventasObt);
            setVentas(ventasObt);

            let estadoObt = await obtenerEstado();
            setEstado(estadoObt)

        } catch (error) {
            throw error
        }
    }

    //filtramos los juegos por categorias
    const filtrarPorEstado = (idEstado) => {
        const estadosFiltrados = ventasOri.filter((vent) =>
            vent.estado_id == idEstado
        )

        setVentas(estadosFiltrados);

    }



    //obtener detalle de Estado
    const getEstado = (idEstado) => {
        const estadoFil = estado.filter((estas) =>
            estas.id == parseInt(idEstado)
        )
        //console.log(estadoFil[0].nombre)

        //return estadoFil[0].nombre
    }

    //para cargarlos una vez que se inicialice la pagina

    useEffect(() => {
        getDatos();
    }, []);
    return (
        <div className="bg-dark bg-gradient">
            {
                /**
                 * para mostrar el banner de la pagina
                 */
            }
            <div


                className="title-md-product py-4 mb-3 text-center"
                style={{
                    backgroundImage: `url(${imagen1})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat"
                }}
            >
                <h2 className="fw-bold container" style={{ color: "white" }}>
                    {/* si categoria existe, pregunta por la propiedad nombre */}
                    Detalle de Ventas de Juegos
                </h2>
            </div>

            <div className="container bg-light">

                <div className="row">
                    <div className="col-xs-3 col-md-3 ">

                        <h3 className="text-center mt-2">
                            Estados de Compra
                        </h3>
                        <div className="d-flex  flex-wrap flex-sm-column justify-content-start">

                            <button className="btn btn-dark mt-2 mb-2" onClick={() => {
                                navigate("/admin")
                            }}>
                                Regresar
                            </button>


                            <button className="btn btn-outline-dark mt-1 mb-1" onClick={() => {
                                setVentas(ventasOri)
                            }}>
                                Todas
                            </button>
                            {

                                estado1.map((esta, i) => (
                                    <button
                                        className="btn btn-outline-dark my-1"
                                        key={i}
                                        onClick={() => {
                                            filtrarPorEstado(esta.value);
                                        }}
                                    >
                                        {
                                            esta.nombre
                                        }
                                    </button>
                                )
                                )
                            }

                        </div>



                    </div>
                    <div className="col-xs-9 col-md-9 d-flex flex-column flex-wrap">
                        <table className="table table-hover table-borderless">
                            <thead className="text-center">
                                <tr>
                                    <th>
                                        Comprador
                                    </th>
                                    <th>
                                        Departamento
                                    </th>
                                    <th>
                                        Monto Compra
                                    </th>
                                    <th>
                                        Detalle
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    ventas.map(
                                        (
                                            { nombreCompleto, departamento, estado_id, total, _id }, i) => (
                                            <tr key={i}>
                                                <td>
                                                    {nombreCompleto}
                                                </td>
                                                <td>
                                                    {
                                                        departamento
                                                    }
                                                </td>
                                                <td>
                                                    S/. {total}.00
                                                </td>
                                                <td
                                                    style={
                                                        { textAlign: "center" }
                                                    }
                                                >
                                                    <Link
                                                        className="btn btn-info me-2"
                                                        to={`/editarventas/${_id}`}
                                                    >
                                                        Detalle Compra
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                }



                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
