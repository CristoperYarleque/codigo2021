import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { registrarJuego, subirImagen } from "../services/juegosServices";
// import { obtenerCategorias } from "../services/categoriaServices";
import { obtenerCategorias, registrarProducto } from "../services/Services";
import FormularioJuego from "../components/FormularioJuego";
import Swal from "sweetalert2";

//basicamente es una ariable global que no
//esta definida
let imagen;
let ruta, ruta1;

export default function RegistrarJuegosView() {
  /**
   * creamos un estado para manejar n inputs
   */

  const [value, setValue] = useState({
    nombre: "",
    descripcion: "",
    // cantidad: 0,
    precio: 0,
  });

  //estado de categoria
  const [categorias, setCategorias] = useState([]);
  const [productoId, setProductoId] = useState();

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
      const result = await registrarProducto({
        ...value,
        // ,
        // imagen: urlImagenSubida
      });
      setProductoId(result._id);
      await Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Éxito",
        text: "En Juego ha sido Registrado¡¡¡¡",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //funcion que maneja la imgane
  //   const manejarImagen = (e) => {
  //     e.preventDefault();
  //     console.log(e.target.name);
  //     imagen = e.target.files[0];
  //     ruta = URL.createObjectURL(e.target.files[0]);
  //     setRutaImg(URL.createObjectURL(e.target.files[0]));
  //     console.log(ruta);
  //   };

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
          //   manejarImagen={manejarImagen}
          categorias={categorias}
          rutaImg={rutaImg}
          getRegresar={getRegresar}
          productoId={productoId}
        />
      </div>
    </div>
  );
}
