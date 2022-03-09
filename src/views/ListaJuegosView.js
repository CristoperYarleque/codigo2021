import imagen1 from "../assets/halo5.jpg";
import {
  obtenerProductos,
  obtenerCategorias,
  eliminarProducto,
} from "../services/Services";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ListaProductosView() {
  //estado de juegos original
  const [juegoOri, setJuegoOri] = useState([]);

  //estado de juego
  const [juegos, setJuego] = useState([]);

  //estado de categorias de juego
  const [categoria, setCategoria] = useState([]);

  //
  const navigate = useNavigate();

  const getDatos = async () => {
    try {
      let juegoObt = await obtenerProductos();
      setJuegoOri(juegoObt);
      setJuego(juegoObt);

      let categoriaObt = await obtenerCategorias();
      setCategoria(categoriaObt);
    } catch (error) {
      throw error;
    }
  };

  const productos1 = [];
  //filtramos los juegos por categorias
  const filtrarPorCategoria = (idCategoria) => {
    const productosFiltrados = juegoOri.filter(
      (prod) => prod.categoriaProducto[0] === idCategoria
    );
    productos1.push(productosFiltrados[0]);
    setJuego(productos1);
  };

  //usamos esta función para mostrar los productos que quedan despues de elimnar
  const verificarEliminar = async (id) => {
    const respuesta = await Swal.fire({
      icon: "warning",
      title: "¿Desea eliminar el Juego?",
      text: "Recuerde que esta acción es irreversible.",
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Si, Eliminar",
      denyButtonText: "No, Cancelar",
    });
    //verificando su el usuario ha confirmado
    //para eliminar el juego
    if (respuesta.isConfirmed) {
      try {
        await eliminarProducto(id);
        Swal.fire({
          icon: "success",
          title: "Juego Eliminado¡¡",
        });
        //actualizamos la lista de productos
        getDatos();
      } catch (error) {
        console.log(error);
      }
    }
  };

  //para cargarlos una vez que se inicialice la pagina
  useEffect(() => {
    getDatos();
  }, []);

  return (
    <div className="bg-dark bg-gradient">
      {/**
       * para mostrar el banner de la pagina
       */}
      <div
        className="title-md-product py-4 mb-3 text-center"
        style={{
          backgroundImage: `url(${imagen1})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="fw-bold container " style={{ color: "black" }}>
          {/* si categoria existe, pregunta por la propiedad nombre */}
          Listado de Juegos
        </h2>
      </div>

      <div className="container bg-light">
        <div className="row">
          <div className="col-xs-3 col-md-3 d-flex flex-column flex-wrap">
            {
              //realizamos los filtros de categorias
            }
            <h4 className="text-center mt-2">Categorias de Juegos</h4>
            <div className="d-flex flex-md-column flex-wrap flex-sm-column justify-content-start">
              <button
                className="btn btn-dark mt-2 mb-2"
                onClick={() => {
                  navigate("/admin");
                }}
              >
                Regresar
              </button>
              <button
                className="btn btn-outline-dark mt-2 mb-2"
                onClick={() => {
                  setJuego(juegoOri);
                }}
              >
                Todas
              </button>
              {categoria.map((cat, i) => (
                <button
                  className="btn btn-outline-dark my-2"
                  key={i}
                  onClick={() => {
                    cat.categoriaProducto.map((cat) => {
                      return filtrarPorCategoria(cat);
                    });
                  }}
                >
                  {cat.nombre}
                </button>
              ))}
            </div>
          </div>
          <div className="col-xs-9 col-md-9 d-flex flex-column align-items-center">
            <table className="table table-hover table-borderless ">
              <thead>
                <tr className="text-center">
                  <th>Nombre del Juego</th>
                  <th>Stock</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {juegos.map(({ nombre, cantidad, precio, _id }, i) => (
                  <tr key={i} className="text-center">
                    <td>{nombre}</td>
                    <td style={{ textAlign: "center" }}>{cantidad}</td>
                    <td>S/. {precio}.00</td>
                    <td style={{ textAlign: "center" }}>
                      <Link
                        className="btn btn-info me-2"
                        to={`/editarJuego/${_id}`}
                      >
                        Editar
                      </Link>
                      <buttom
                        className="btn btn-danger"
                        onClick={() => {
                          verificarEliminar(_id);
                        }}
                      >
                        Eliminar
                      </buttom>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
