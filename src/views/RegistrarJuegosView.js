import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { registrarJuego, subirImagen } from "../services/juegosServices";
// import { obtenerCategorias } from "../services/categoriaServices";
import {
  crearCategoriaProducto,
  obtenerCategorias,
  registrarProducto,
  subirImagen,
  subirS3,
} from "../services/Services";
import FormularioJuego from "../components/FormularioJuego";
import Swal from "sweetalert2";
import axios from "axios";

//basicamente es una ariable global que no
//esta definida
let imagen;
let ruta, ruta1;
let result;

export default function RegistrarJuegosView() {
  /**
   * creamos un estado para manejar n inputs
   */

  const [value, setValue] = useState({
    nombre: "",
    descripcion: "",
    cantidad: 0,
    precio: 0,
    categoriaId: "6226b7e8a03f3bc4a8ad4e8d",
  });
  const [image, setImage] = useState({
    contentType: "",
    filename: "",
    ext: "",
    productoId: "",
  });
  const [urlImg, setUrlImagen] = useState();
  const [img, setimg] = useState();

  //estado de categoria
  const [categorias, setCategorias] = useState([]);

  //creado un estado para la imagen
  const [rutaImg, setRutaImg] = useState(null);

  //instanciamos useNavigate
  const navigate = useNavigate();

  /**
   * creamos una función para poder modificar
   * el estado value
   */

  const actualizarInput = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultado = await registrarProducto({
        ...value,
      });
      await crearCategoriaProducto({
        categoriaId: value.categoriaId,
        productoId: resultado._id,
      });
      const URL = {
        ...image,
        productoId: resultado._id,
      };
      if (resultado._id) {
        await Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Éxito",
          text: "En Juego ha sido Registrado¡¡¡¡",
          showConfirmButton: false,
          timer: 2000,
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

  const manejarImagen = (e) => {
    e.preventDefault();
    setimg(e.target.files[0]);
    setImage({
      contentType: e.target.files[0].type,
      filename: e.target.files[0].name.split(".")[0],
      ext: e.target.files[0].name.split(".")[1],
      productoId: "",
    });
    setRutaImg(URL.createObjectURL(e.target.files[0]));
  };

  const getRegresar = () => {
    navigate("/admin");
  };

  useEffect(() => {
    const getCategorias = async () => {
      try {
        const catObtenidas = await obtenerCategorias();
        setCategorias(catObtenidas);
      } catch (error) {
        throw error;
      }
    };
    getCategorias();
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
