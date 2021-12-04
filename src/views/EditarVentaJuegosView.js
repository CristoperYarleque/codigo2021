import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerVentaPorId, editarVentaPorId } from "../services/ventasService";
import {obtenerEstado, obtenerEstadoPorId} from "../services/estadoServices";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import FormularioVentas from "../components/FormularioVentas";

export default function EditarVentaJuegosView() {

    //se crea un estado donde se almacenara los datos de venta
    const [value, setValue] = useState({
        nombreCompleto: "",
        telefono: "",
        email: "",
        provincia: "",
        distrito: "",
        direccion: "",
        coordenadas: [],
        juegos: [],
        total: 0,
        estado_id: ""
    })
    
    //estado actual de venta del pedido
    const [estado, setEstado] = useState("");

    //estados de venta
    const [estadoP, setEstadoP] = useState([]);    

    //usamos useParams para obtener el id de la 
    //venta a consultar
    const {id} = useParams();

    //coordenadas
    let coord=[0,0]

    //
    const navigate = useNavigate()

    //manejando formulario    
    //const {register, handleSubmit} = useForm();
    
    //consultadmos la venta por id
    const getVentas = async() =>{
        try {
            const ventaObt = await obtenerVentaPorId(id);
            setValue(ventaObt);
            //console.log(ventaObt.estado_id)
            //todos los estados
            const estadoObt = await obtenerEstado();
            setEstadoP(estadoObt);
            //coord = Array.from(ventaObt.coordenadas)
            //el estado de la venta
            const { nombre} = await obtenerEstadoPorId(ventaObt.estado_id);   
            setEstado(nombre)
        } catch (error) {
            console.log("error")
        }
        
    }

    const manejarSubmit = async (e) => {
            e.preventDefault();
            try {
                await editarVentaPorId(id, {value});
                await Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Producto Editado Exitosamente",
                });
            } catch (error) {
                console.log(error);
            }
        };
        
    //actualizar el estado de la compra
    const actualizarInput = (e)=>{
        //console.log(e, e.target.name, e.target.value);
        //usando el setValue para actualizar
        //pasamos un objeto y spread de value que
        //es un objeto
        setValue({
            ...value,
            //pasamos el nombre y el valor
            [e.target.name]: e.target.value,
        });
    }

    
    
    //función que nos permite regresar
    const getRegresar = ()=>{
        //despues de crear el producto se hace
        //un navigate a la ListaProductoView
        //home
        navigate("/ventasJuegos");
    }

    useEffect(()=>{
        getVentas()
    },[])

    return (
        <div className="bg-dark">
            <div className="container col-md-11 bg-light">
                <FormularioVentas 
                            value={value} 
                            actualizarInput={actualizarInput}
                            manejarSubmit={manejarSubmit} 
                            estadoP={estadoP}
                            estado={estado}
                            getRegresar={getRegresar}
                />  
            </div>          
    </div>
    )
}
