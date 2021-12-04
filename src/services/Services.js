import axios from "axios";

const obtenerProductos = async () => {
  const URL = "https://6195c89174c1bd00176c6e8e.mockapi.io/juego";
  try {
    let { data } = await axios.get(URL);
    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerCategorias = async () => {
  const URL = "https://6195c89174c1bd00176c6e8e.mockapi.io/categoria_juego";
  try {
    const { data } = await axios.get(URL);
    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerProductosPorPagina = async (pagina = 1, limite = 6) => {
  const URL = "https://6195c89174c1bd00176c6e8e.mockapi.io/juego";
  try {
    const { data } = await axios.get(`${URL}?page=${pagina}&limit=${limite}`);
    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerProductosPorId = async (id) => {
  const URL = "https://6195c89174c1bd00176c6e8e.mockapi.io/juego";
  try {
    const { data } = await axios.get(`${URL}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

const obtenerProductos1 = async (busqueda = "") => {
  const URL = "https://6195c89174c1bd00176c6e8e.mockapi.io/juego";
  try {
    const { data } = await axios.get(`${URL}?search=${busqueda}`);
    return data;
  } catch (error) {
    throw error;
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
  crearPedido,
};
