import axios from "axios";

//url de categorias
const URL = `${process.env.REACT_APP_API}categoria_juego`;

//para obtener todas las categorias
const obtenerCategorias = async () => {
    try {
        const { data } = await axios.get(URL);
        return data;
    } catch (error) {
        throw error;
    }
};

export { 
    obtenerCategorias
}