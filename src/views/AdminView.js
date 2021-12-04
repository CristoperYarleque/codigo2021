import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminView() {

    const navigate = useNavigate()

    //para ir al listado de juegos
    const listadoJuego = ()=>{
        navigate("/listajuegos")
    }

    //para ir al seguimiento de ventas
    const listadoVentas = ()=>{
        navigate("/ventasJuegos")
    }

    //para ir a registrar un nuevo juego
    const registrojuego = ()=>{
        navigate("/registrarJuego")
    }

    const salirAdmin = () =>{
        
            Swal.fire({
                icon: "info",
                title: "Saliendo de Administrador",
                text: "Regrese pronto",
                timer:1000
            });
            navigate("/login")
        
    }

    return (
        <div className="d-flex align-items-center admin" style={{
            height: "100vh",
            color:"white"
        }}>
            <div className="d-flex flex-column align-items-center" 
                style={{
                    width:"100vw"
                }}
            >
                <h3>
                    Administrador
                </h3>
                <div className='d-flex flex-column justify-content-start '>
                    <div className='row my-2'>
                        <div className='col-sm-6'>
                            <button className='btn-lg' 
                                style={{
                                    width:"200px"
                                }}
                                onClick={
                                    listadoJuego
                                }
                            >
                                Listado de Juegos
                            </button>
                        </div>
                        
                        <div className='col-sm-6'>
                            <button 
                                className='btn-lg' 
                                style={{
                                    width:"200px"
                                }}
                                 
                                onClick={
                                    registrojuego
                                }
                            >
                                Registrar Juegos
                            </button>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-sm-6'>
                            <button 
                                className='btn-lg'
                                style={{
                                    width:"200px"
                                }}
                                 
                                onClick={
                                    listadoVentas
                                }
                            >
                                Venta Juegos
                            </button>
                        </div>
                        
                        <div className='col-sm-6'>
                            <button 
                                className='btn-lg btn-dark'
                                style={{
                                    width:"200px"
                                }}
                                 
                                onClick={
                                    salirAdmin
                                }
                            >
                                Salir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
