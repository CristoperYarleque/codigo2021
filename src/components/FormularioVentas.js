//componente
//import { useRef } from "react";
import { useNavigate } from "react-router";
//import Swal from "sweetalert2";
//import {useForm} from "react-hook-form";//useForm es un hook personalizado para manejar formularios
//import EditarVentaJuegosView from "../views/EditarVentaJuegosView";

export default function FormularioVentas({value, actualizarInput, manejarSubmit, estadoP, estado, getRegresar}) {

   
    //
    const navigate = useNavigate();

    console.log(value);
    

    let total = 0;

    total = value["juegos"].reduce((acum, prod) => {
        return acum + prod.cantidad*prod.precio
    },0)



    return (
        <div className="container">

            <div>
                <h3>

                    Estado de Compra - <small style={{
                                            color:"red"
                                        }}
                                        >
                                            {
                                                estado
                                            }
                                        </small>
                </h3>
            </div>
        
            <form onSubmit={ (e) => {
                manejarSubmit(e)
            }}>
                <div className="container d-flex">
                    <div className="row row-cols-1"  style={{
                        width:"70%"
                    }}>    
                        <div className="d-flex flex-wrap ">
                            <div className="m-2 col-md-4 col-sm-4 col-xs-4 d-flex flex-column flex-wrap ">

                                    <label className="form-label">
                                        Cliente: 
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control" 
                                        name="nombreCompleto" 
                                        value={value.nombreCompleto}
                                        disabled
                                    />
                            </div>
                            <div className="m-2 col-md-4 col-sm-4 col-xs-4 d-flex flex-column flex-wrap ">
                                    <label className="form-label">
                                        Telf. Contacto: 
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control" 
                                        name="telefono" 
                                        value={value.telefono}
                                        disabled
                                    />
                            </div>
                            
                        </div>
                        <div className="d-flex flex-wrap">
                            <div className="m-2 col-md-4 col-sm-4 col-xs-4 d-flex flex-column flex-wrap">
                                <label className="form-label">
                                    Mail Contacto: 
                                </label>
                                <input
                                    type="text"
                                    className="form-control" 
                                    name="email" 
                                    value={value.email}
                                    disabled
                                />
                            </div>
                            <div className="m-2 col-md-4 col-sm-4 col-xs-4 d-flex flex-column flex-wrap">
                                <label className="form-label">
                                    Provincias: 
                                </label>
                                <input
                                    type="text"
                                    className="form-control" 
                                    name="departamento" 
                                    value={value.departamento}
                                    disabled
                                />
                            </div>                
                        </div>
                    <div className="d-flex flex-wrap">
                        <div className="m-2 col-md-4 col-sm-4 col-xs-4 d-flex flex-column flex-wrap">
                            <label className="form-label">
                                 Provincia: 
                            </label>
                            <input
                                type="text"
                                className="form-control" 
                                name="provincia" 
                                value={value.provincia}
                                disabled
                            />
                        </div>
                        <div className="m-2 col-md-4 col-sm-4 col-xs-4 d-flex flex-column flex-wrap">
                            <label className="form-label">
                                Direccion: 
                            </label>
                            <input
                                type="text"
                                className="form-control" 
                                name="direccion" 
                                value={value.direccion}
                                disabled
                            />
                        </div>                
                    </div> 
                </div>
                <div className="row " style={{
                        width:"30%"
                    }}>
                    
                <div className="d-flex flex-wrap">
                    <div className="m-2 col-md-4 col-sm-4 col-xs-4 d-flex flex-column flex-wrap"  style={{
                        width:"100%"
                    }}>
                            <label className="form-label">
                                Estado Compra: 
                            </label>
                            <select                            
                                className="form-select"
                                value={value.estado_id}
                                name="estado_id"
                                onChange={(e)=>{
                                    actualizarInput(e)
                                }}
                            >
                                
                                {
                                    estadoP.map((est,i)=>(
                                        <option value={est.id} key={i}>
                                            {est.nombre
                                            
                                            }
                                        </option>
                                    ))
                                }
                        

                            </select>
                        </div>
                    </div> 
                    <div className="d-flex flex-wrap">
                        <h4>
                            Referencia:
                        </h4>
                        {/**
                         <MapContainer 
                                center={coord}
                                zoom={15}
                                style={
                                   { height:'150px',
                                     width:'200px'
                                    }
                                }
                                scrollWheelZoom={true}
                        >
                                <TileLayer
                                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                    
                                <Marker position={coord}/>
                        </MapContainer>


                         
                         * */
                         
                        }
                    </div>
                    
                </div>
                    
                </div>                      
                
                
                
                <div >
                        
                        <buttom className="btn btn-dark mt-2 m-1" onClick={()=>{
                            navigate("/ventasJuegos")
                        }}>
                            Regresar
                        </buttom>
                        <buttom className="btn btn-primary mt-2 m-1" type="submit">
                            Actualizar Estado
                    </buttom>
                    </div>
            </form>

            <div>
                    <h4 className="m-2">
                        Listado de Juegos por Comprar
                    </h4>
                    {
                        //mostrar los juegos que ha seleccionado
                    }
                    <ul className="list-group">
                        {

                            value["juegos"].map((val, i) =>(
                                <li 
                                    className='list-group-item  d-flex justify-content-between col-6 m-2' 
                                    key={i} 
                                >
                                    <div>
                                        <h6 className='fw-bold'>
                                            {val.nombre}
                                        </h6>
                                        <small>
                                            Cantidad: {val.cantidad}
                                        </small>
                                    </div>
                                    <div className='badge bg-dark rounded-pill p-4'>
                                        S/. {(val.precio * val.cantidad).toFixed(2)}
                                    </div>
                                </li>        
                            ))
                                
                        }
                                <li className='list-group-item  d-flex justify-content-between col-6 m-2'>
                                    <span className='fw-bold'>
                                        TOTAL:
                                    </span>
                                    <span>
                                        S/.
                                        {
                                            total.toFixed(2)
                                        }
                                    </span>
                                </li>

                    </ul>

                </div>
        </div>
    )
}
