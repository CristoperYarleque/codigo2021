import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FormularioJuego from "../components/FormularioJuego";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  obtenerProductosPorId,
  obtenerCategorias,
  actualizarProducto,
  subirImagen,
  subirS3,
  crearCategoriaProducto,
  eliminarCategoriaProducto,
} from "../services/Services";

let imagen; //por defecto es undefined

export default function EditarProductoView() {
  //creamos un estado
  const [value, setValue] = useState({
    nombre: "",
    descripcion: "",
    cantidad: 0,
    precio: 0,
    categoriaId: "",
  });
  const [image, setImage] = useState({
    contentType: "",
    filename: "",
    ext: "",
    productoId: "",
  });
  const [img, setimg] = useState();

  //estado de categoria
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState();

  //creado un estado para la imagen
  const [rutaImg, setRutaImg] = useState(null);

  //usrParams es un objeto que va a contener todos
  //los parametros que se pase por la URL
  //obtenemos el parametro (id) que pasemos por
  //la URL, como es un obj se puede desestructurar
  const { id } = useParams();

  const navigate = useNavigate();

  //obtenemos el producto por medio del id
  const getProducto = async () => {
    try {
      //obtener el juego por id
      const juegoObtenido = await obtenerProductosPorId(id);
      setValue(juegoObtenido);

      //obtener las categorias id
      const categoriaObtenida = await obtenerCategorias();
      setCategorias(categoriaObtenida);

      const result = categoriaObtenida.filter((cat) => {
        const idCategoria = cat.categoriaProducto.filter((id) => {
          if (id == juegoObtenido.categoriaProducto[0]) {
            return id;
          }
        });
        if (idCategoria == juegoObtenido.categoriaProducto[0]) {
          return cat;
        }
      });
      setCategoriaActual(result[0]._id);
      setValue({
        categoriaId: result[0]._id,
      });
      setRutaImg(juegoObtenido.imagen);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   *
   *
   */
  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log({
        categoriaId: categoriaActual,
        productoId: id,
      });
      await eliminarCategoriaProducto({
        categoriaId: categoriaActual,
        productoId: id,
      });

      const result = await actualizarProducto(id, value);
      await crearCategoriaProducto({
        categoriaId: value.categoriaId,
        productoId: id,
      });
      const URL = {
        ...image,
        productoId: id,
      };
      if (result) {
        await Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Juego Editado Exitosamente",
        });
      }
      let urlImagen1;
      setTimeout(async function () {
        const urlImagen = await subirImagen(URL);
        urlImagen1 = urlImagen.url;
        setValue({
          nombre: "",
          descripcion: "",
          cantidad: 0,
          precio: 0,
          categoriaId: "",
        });
        setRutaImg(null);
      }, 1000);

      setTimeout(async function () {
        const headers = {
          "Content-Type": image.contentType,
        };
        await subirS3(urlImagen1, img, headers);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * creamos una función para poder modificar
   * el estado value
   */

  const actualizarInput = (e) => {
    setValue({
      ...value,
      //pasamos el nombre y el valor
      [e.target.name]: e.target.value,
    });
  };

  //funcion que maneja la imgane
  const manejarImagen = (e) => {
    e.preventDefault();
    setimg(e.target.files[0]);
    setImage({
      contentType: e.target.files[0].type,
      filename: e.target.files[0].name.split(".")[0],
      ext: e.target.files[0].name.split(".")[1],
      productoId: "",
    });
    imagen = e.target.files[0];
    setRutaImg(URL.createObjectURL(e.target.files[0]));
  };

  //función que nos permite regresar
  const getRegresar = () => {
    //despues de crear el producto se hace
    //un navigate a la ListaProductoView
    //home
    navigate("/listajuegos");
  };

  //se ejecuta solamente en el montaje
  useEffect(() => {
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
