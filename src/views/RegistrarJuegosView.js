import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import { registrarJuego, subirImagen } from "../services/juegosServices";
import { obtenerCategorias } from "../services/categoriaServices";
import FormularioJuego from "../components/FormularioJuego";
import Swal from "sweetalert2"

//basicamente es una ariable global que no
//esta definida
let imagen;
let ruta, ruta1;

export default function RegistrarJuegosView() {

    /**
     * creamos un estado para manejar n inputs
     */

    const [value, setValue] = useState({
        nom_juego:"",
        desc_juego:"",
        qty_juego:0,
        precio_juego:0,
        categoria_id:"1"
    });

    //estado de categoria
    const [categorias, setCategorias] = useState([])

    //creado un estado para la imagen
    const [rutaImg, setRutaImg] = useState(null);

    //instanciamos useNavigate
    const navigate = useNavigate();

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

    //creamos una función para grabar
    const manejarSubmit = async (e) =>{
        //evitamos que la pagina se recarge
        e.preventDefault();

        //siempre intenten indicar al usuario que 
        //esta pasando o que ha ocurrido
        try {
            
            //subimos primero la imagen, y obtengo la
            //url
            const urlImagenSubida = await subirImagen(imagen);
            console.log(urlImagenSubida)

            //y le agrego al array
            await registrarJuego({...value, img_juego:urlImagenSubida});
            console.log("Nuevo Juego Registrado");

            //creando un mensaje de exito
            //es un await
            await Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Éxito',
                text: 'En Juego ha sido Registrado¡¡¡¡',
                //es para que no me muestre un boton de cierre
                showConfirmButton: false,
                timer:2000
              })

           

        } catch (error) {
            console.log(error);
        }

    };

    //funcion que maneja la imgane
    const manejarImagen = (e) =>{
        e.preventDefault();
        console.log(e.target.name);
        imagen = e.target.files[0];
        //console.log(imagen.files);
        //ruta1 = imagen.name
        ruta = URL.createObjectURL(e.target.files[0])
        setRutaImg(URL.createObjectURL(e.target.files[0]))
        console.log(ruta)
    }


    const getRegresar = ()=>{
        //despues de crear el producto se hace
        //un navigate a la ListaProductoView
        //home
        navigate("/admin");
    }

    //cargamos las categorias al cargar la pagina
    //y obtener las categorias, a su vez actualizo
    //el estado de categorias
    useEffect(() => {
        const getCategorias = async () =>{
            try {
                const catObtenidas = await obtenerCategorias();
                setCategorias(catObtenidas)
            } catch (error) {
                throw error
            }
        };
        getCategorias();
    }, [])


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
    )
}
