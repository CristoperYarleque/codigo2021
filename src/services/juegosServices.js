//importaremos datos de mockapi
import axios from "axios";
import { storage } from "../config/Firebase";


//variable que almacena la URL de mockapi
const URL = `${process.env.REACT_APP_API}juego`;

const obtenerJuegos = async() =>{
    try {
        //creamos una variable q recibira la URL
        const {data} = await axios.get(URL)
        return data;
    } catch (error) {
        throw error;
    }
};

//registrar un juego
const registrarJuego = async(nuevoProducto)=>{
    try {
        //creamos las cabeceras
        const headers = {
            "Content-Type": "application/json"
        }

        //axios siempre me va devolver la propiedad
        //data, donde esta la respuesta del
        //serviodor axios cuando hace POST, 
        //PUT necesita no solo la URL va necesitar
        //los headers y la data
        //axios.post(URL, objCrear, {headers})

        const {data} = await axios.post(URL, nuevoProducto, {headers});
        return data;
    } catch (error) {
        console.log(error);
    }
}

//obteniendo un juego por id
const obtenerJuegoPorId = async(id) =>{
    try {
        //concatenamos la URL con el id para obtener
        //el producto
        const {data} = await axios.get(`${URL}/${id}`)
        return data
    } catch (error) {
        throw error;
    }
}

//editarJuegos
const editarJuegosPorId = async (id, objJuego) =>{
    try {
        //para actualizar datos es necesario
        //usar las cabeceras
        const headers = {
            "Content-Type": "application/json",
        };     
        //envio la actualización a mockapi   
        await axios.put(`${URL}/${id}`, objJuego, {headers});
        return;//envia un revolve
    } catch (error) {        
        throw error;
    }
}

//subir una imagen
const subirImagen = (imagen) => {
    return new Promise((resolve, reject) => {
        //1, necesita la referencia para indicar donde vamos a guardar el archivo
        let refStorage = storage.ref(`fotos/${imagen.name}`);
        let tareaSubir = refStorage.put(imagen);

        tareaSubir.on(
            "state_changed",
            () => {}, //ver el progreso
            (error) => {
                reject(error);
            }, //ver si hay error
            () => {
                //tareaSubir finalizada
                tareaSubir.snapshot.ref.getDownloadURL().then((urlImagen) => {
                    resolve(urlImagen);
                });
            }
        ); 
    });
};

//función para eliminar juego
const eliminarJuego = async (id) =>{
    try {
        await axios.delete(`${URL}/${id}`)
        return "Producto Eliminado"
    } catch (error) {
        console.log(error);
    }
}

export {
    obtenerJuegos, subirImagen,obtenerJuegoPorId, editarJuegosPorId, registrarJuego, eliminarJuego
}