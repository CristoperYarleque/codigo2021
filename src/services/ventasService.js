//importaremos datos de mockapi
import axios from "axios";
//import { storage } from "../config/Firebase";


//variable que almacena la URL de mockapi
const URL = `${process.env.REACT_APP_API}ventasJuegos`;

//obtener las ventas de juegos
const obtenerVentas = async() =>{
    try {
        //creamos una variable q recibira la URL
        const {data} = await axios.get(URL)
        return data;
    } catch (error) {
        throw error;
    }
};

//obtener las ventas por Id y poder actualizar
//el estado de ventas
const obtenerVentaPorId = async(id) =>{
    try {
        //concatenamos la URL con el id para obtener
        //el producto
        const {data} = await axios.get(`${URL}/${id}`)
        return data
    } catch (error) {
        throw error;
    }
}

const editarVentaPorId = async (id, objVenta) =>{
    try {
        //para actualizar datos es necesario
        //usar las cabeceras
        const headers = {
            "Content-Type": "application/json",
        };     
        //envio la actualización a mockapi   
        await axios.put(`${URL}/${id}`, objVenta, {headers});
        return;//envia un revolve
    } catch (error) {        
        throw error;
    }
}

export {
    obtenerVentas,
    obtenerVentaPorId,
    editarVentaPorId
}