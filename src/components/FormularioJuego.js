//componente
import { useRef } from "react";
import imagen1 from "../assets/halo5.jpg"

export default function FormularioJuego({ 
    value, actualizarInput, manejarSubmit, manejarImagen, categorias, rutaImg, getRegresar}) {
    
    //es una referencia
    //va a ser como trabajar como un id interno de 
    //react 
    const inputFile = useRef();

    console.log(value);

    /*
        todo input debe estar amarrado a un estado
        pero se creara un objeto para manejar todos 
        los input
    */
    return (
        <div>
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
                    backgroundRepeat:"no-repeat"
                }}
            >
                <h2 className="fw-bold container " style={{color:"black"}}>
                    {/* si categoria existe, pregunta por la propiedad nombre */}
                                        {
                                            rutaImg?"Editar Juegos":"Registrar Juegos"
                                        }
                </h2>
            </div>
            {/**
             *  el evento que envia los datos
             */}
            <form onSubmit={(e) =>{
                manejarSubmit(e);
            }}>
                
                <div className="mb-3">
                    <label className="form-label">
                        Nombre del Juego: 
                    </label>
                    <input
                        type="text"
                        className="form-control" 
                        name="nom_juego" 
                        value={value.nom_juego}
                        onChange={
                            (e)=>{
                                actualizarInput(e);
                            }
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Descripción: 
                    </label>
                    <input
                        type="text"
                        className="form-control" 
                        name="desc_juego" 
                        value={value.desc_juego}
                        onChange={
                            (e)=>{
                                actualizarInput(e);
                            }
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Stock: 
                    </label>
                    <input
                        type="number"
                        className="form-control" 
                        name="qty_juego" 
                        value={value.qty_juego}
                        onChange={
                            (e)=>{
                                actualizarInput(e);
                            }
                        }
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Precio: 
                    </label>
                    <input
                        type="number"
                        className="form-control" 
                        name="precio_juego" 
                        value={value.precio_juego}
                        onChange={
                            (e)=>{
                                actualizarInput(e);
                            }
                        }
                    />
                </div>
                <div className="mb-1">
                    <label className="form-label">
                        Categoria:
                    </label>

                    <select
                        value={value.categoria_id}
                        className="form-select"
                        name="categoria_id"
                        onChange={(e)=>{
                            actualizarInput(e);
                        }}
                    >
                        {
                            categorias.map((cat, i)=>(
                                <option value={cat.id} key={i}>
                                    {cat.nombre}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/**
                 * para subir img
                 */}
                <div className="mb-1">
                    <label className="form-label">
                        Imagen:
                    </label>


                    {/*<input
                        type="file" 
                        className="form-control"
                        ref={inputFile}
                        onChange={(e)=>{
                            manejarImagen(e)
                        }}
                    />*/}


                    <input
                        type="file"
                        className="form-control"
                        ref={inputFile}
                        onChange={(e) => {
                            manejarImagen(e);
                        }}
                    />
                </div>
                <div className="card" >
                    {
                        rutaImg&&<div>
                        <h6 className="title-card">
                            Vista Previa:
                        </h6>
                        <img
                            src={rutaImg}
                            alt="Imagen previa"
                            className="img-fluid"
                        />
                    </div>
                    }
                </div>    
                <div className="d-flex justify-content-around">
                    <button 
                        className="btn btn-primary btn-lg"
                        type="submit"
                    >
                        Guardar
                    </button>
                    <button 
                        className="btn btn-dark btn-lg"
                        onClick={getRegresar}
                    >
                        Regresar
                    </button>
                </div>
                    
            </form>
        </div>
    )
}
