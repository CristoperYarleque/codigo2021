import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioJuego from "../components/FormularioJuego";
import { subirImagen, editarJuegosPorId, obtenerJuegoPorId } from "../services/juegosServices";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { obtenerCategorias } from "../services/categoriaServices";

let imagen;//por defecto es undefined

export default function EditarProductoView() {

    //creamos un estado
    const [value, setValue] = useState({
        nom_juego:"",
        desc_juego:"",
        qty_juego:0,
        precio_juego:0
    })

    //estado de categoria
    const [categorias, setCategorias] = useState([])

    //creado un estado para la imagen
    const [rutaImg, setRutaImg] = useState(null);

    //usrParams es un objeto que va a contener todos
    //los parametros que se pase por la URL
    //obtenemos el parametro (id) que pasemos por
    //la URL, como es un obj se puede desestructurar
    const {id} = useParams();

    console.log({id});

    const navigate = useNavigate();

    //obtenemos el producto por medio del id
    const getProducto = async () => {
        try {
            //obtener el juego por id
            const juegoObtenido = await obtenerJuegoPorId(id);
            setValue(juegoObtenido);
            console.log(juegoObtenido);

            //obtener las categorias id
            const categoriaObtenida = await obtenerCategorias();
            setCategorias(categoriaObtenida);
            console.log(categoriaObtenida);

            setRutaImg(juegoObtenido.img_juego);
            console.log(juegoObtenido.img_juego)
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * 
     * 
     */

     const manejarSubmit = async (e) => {
        e.preventDefault();
        try {
            //verificamos el valor de imagen
            if(typeof imagen !== "undefined"){
                
                //xq imagen no seria undefined
                const urlImagenSubida = await subirImagen(imagen);
                //actualiz el objeto value y a la
                //vez se actualiza la imagen
                await editarJuegosPorId(id, {...value, img_juego:urlImagenSubida});

            }else{

                //actualizo pero sin subir ninguna imagen
                await editarJuegosPorId(id, value);
            }
            

            await Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "Juego Editado Exitosamente",
            });
        } catch (error) {
            console.log(error);
        }
    };

    /**
     * creamos una función para poder modificar 
     * el estado value
     */

     const actualizarInput = (e)=>{
        console.log(e, e.target.name, e.target.value);
        //usando el setValue para actualizar
        //pasamos un objeto y spread de value que
        //es un objeto
        setValue({
            ...value,
            //pasamos el nombre y el valor
            [e.target.name]: e.target.value,
        });
    }

    //funcion que maneja la imgane
    const manejarImagen = (e) =>{
        e.preventDefault();
        console.log(e.target.files);
        imagen = e.target.files[0];
        console.log(imagen);        
        setRutaImg(URL.createObjectURL(e.target.files[0]))
    }

    //función que nos permite regresar
    const getRegresar = ()=>{
        //despues de crear el producto se hace
        //un navigate a la ListaProductoView
        //home
        navigate("/listajuegos");
    }


    //se ejecuta solamente en el montaje
    useEffect(()=>{
        getProducto();
    }, []);

    return (
        <div className="bg-dark">
            <div className="container col-md-6 bg-light">
                <FormularioJuego 
                            value={value} 
                            actualizarInput={actualizarInput}
                            manejarSubmit={manejarSubmit} 
                            manejarImagen={manejarImagen}
                            categorias={categorias}
                            rutaImg={rutaImg}
                            getRegresar={getRegresar}
                />  
            </div>          
        </div>
    );
}
