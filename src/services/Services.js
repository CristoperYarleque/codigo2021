import axios from "axios";

const Url = process.env.REACT_APP_URL;

const obtenerProductos = async () => {
  const URL = `${Url}productos`;
  try {
    let { data } = await axios.get(URL);
    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerCategorias = async () => {
  const URL = `${Url}categorias`;
  try {
    const { data } = await axios.get(URL);
    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerProductosPorPagina = async (pagina = 0, limite = 6) => {
  const URL = `${Url}productos`;
  try {
    const { data } = await axios.get(`${URL}?page=${pagina}&limit=${limite}`);
    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerProductosPorId = async (id) => {
  const URL = `${Url}producto`;
  try {
    const { data } = await axios.get(`${URL}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerProductos1 = async (busqueda = "") => {
  const URL = `${Url}busqueda`;
  try {
    const { data } = await axios.get(`${URL}?search=${busqueda}`);
    return data;
  } catch (error) {
    throw error;
  }
};

const eliminarProducto = async (id) => {
  try {
    await axios.delete(`${Url}/${id}`);
    return "Producto Eliminado";
  } catch (error) {
    console.log(error);
  }
};

const crearCategoriaProducto = async (nuevaCategoriaProducto) => {
  const URL = `${Url}categoria-producto`;
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const { data } = await axios.post(URL, nuevaCategoriaProducto, { headers });
    return data;
  } catch (error) {
    throw error;
  }
};

const registrarProducto = async (nuevoProducto) => {
  try {
    //creamos las cabeceras
    const headers = {
      "Content-Type": "application/json",
    };

    //axios siempre me va devolver la propiedad
    //data, donde esta la respuesta del
    //serviodor axios cuando hace POST,
    //PUT necesita no solo la URL va necesitar
    //los headers y la data
    //axios.post(URL, objCrear, {headers})

    const { data } = await axios.post(`${Url}producto`, nuevoProducto, {
      headers,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const crearPedido = async (datosFormulario) => {
  const URL = "https://6195c89174c1bd00176c6e8e.mockapi.io/ventasJuegos";
  try {
    const { data } = await axios.post(URL, {
      ...datosFormulario,
    });

    return true;
  } catch (error) {
    return false;
  }
};

export {
  obtenerProductos,
  obtenerCategorias,
  obtenerProductosPorPagina,
  obtenerProductosPorId,
  obtenerProductos1,
  eliminarProducto,
  registrarProducto,
  crearCategoriaProducto,
  crearPedido,
};
