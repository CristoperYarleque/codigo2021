import axios from "axios";

const Url = process.env.REACT_APP_URL;
const token = `Bearer ${localStorage.getItem("token")}`;

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
  const URL = `${Url}producto/${id}`;
  try {
    await axios.delete(URL, { headers: { authorization: token } });
    return "Producto Eliminado";
  } catch (error) {
    console.log(error);
  }
};

const actualizarProducto = async (id, productoActualizado) => {
  const URL = `${Url}producto/${id}`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": token,
  };
  try {
    const { data } = await axios.put(URL, productoActualizado, { headers });
    return data;
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

const login = async (usuario) => {
  const URL = `${Url}login`;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const { data } = await axios.post(URL, usuario, { headers });
    return data;
  } catch (error) {
    throw error;
  }
};

const validarCorreo = async (correo) => {
  const URL = `${Url}validar-correo`;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const { data } = await axios.post(URL, correo, { headers });
    return data;
  } catch (error) {
    throw error;
  }
};

const registro = async (usuario) => {
  const URL = `${Url}registro`;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const { data } = await axios.post(URL, usuario, { headers });
    return data;
  } catch (error) {
    throw error;
  }
};

const eliminarCategoriaProducto = async (datosEliminados) => {
  const URL = `${Url}categoria-producto`;
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    await axios.delete(URL, { data: datosEliminados }, { headers });
  } catch (error) {
    throw error;
  }
};

const registrarProducto = async (nuevoProducto) => {
  const URL = `${Url}producto`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": token
  };
  try {
    const { data } = await axios.post(URL, nuevoProducto, {
      headers
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const subirImagen = async (imagen) => {
  const URL = `${Url}archivo`;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": token
  };
  try {
    const { data } = await axios.post(URL, imagen, { headers });
    return data;
  } catch (error) { }
};

const subirS3 = async (urlImagen1, img, headers) => {
  try {
    const { data } = await axios.put(urlImagen1, img, { headers });
    return data;
  } catch (error) { }
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
  eliminarCategoriaProducto,
  subirImagen,
  actualizarProducto,
  subirS3,
  login,
  validarCorreo,
  registro,
  crearPedido,
};
