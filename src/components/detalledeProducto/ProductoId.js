import { useState, useEffect, useContext } from "react";
import {
  obtenerProductosPorId,
  obtenerCategorias,
} from "../../services/Services";
import { useParams } from "react-router";
import ReactImageMagnify from "react-image-magnify";
import { toast } from "react-toastify";

import { CarritoContext } from "../../context/carrito";

export default function ProductoId() {
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [categoria, setCategoria] = useState("");

  const { anadirACarrito } = useContext(CarritoContext);
  const { id } = useParams();

  const getProducto = async () => {
    try {
      const prodObtenido = await obtenerProductosPorId(id);
      const catObtenidas = await obtenerCategorias();
      const catProducto = catObtenidas.find((cat) => {
        const catcat = cat.categoriaProducto.find(
          (cat1) => cat1 === prodObtenido.categoriaProducto[0]
        );
        if (catcat == prodObtenido.categoriaProducto[0]) {
          return cat;
        }
      });
      setProducto(prodObtenido);
      setCategoria(catProducto);
    } catch (error) {
      throw error;
    }
  };

  const modificarCantidad = (numero) => {
    if (cantidad + numero === 0 || cantidad + numero === 11) {
      return;
    }
    setCantidad(cantidad + numero);
  };

  const anadirACarritoContext = (e) => {
    console.log(e);
    e.preventDefault();
    toast.success("Producto agregado", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const nuevoProducto = {
      cantidad,
      producto: {
        ...producto,
      },
    };
    anadirACarrito(nuevoProducto);
  };

  const whatsapp = () => {
    let texto = `Hola Palace Game estoy interesado en el juego ${producto.nombre}`;
    let url = `https://api.whatsapp.com/send?phone=${+51964711527}&text=${texto}`;
    window.open(url);
  };

  useEffect(() => {
    getProducto();
  }, []);

  return (
    <>
      <div className="text-center my-3 mb-4 text-primary">
        <h2>
          {categoria?.nombre} - {producto?.nombre}
        </h2>
      </div>
      <div className="container">
        <div className="row my-3 d-flex justify-content-center">
          {producto ? (
            <>
              <div id="detalle-view" className="col-12 col-md-6 detalle-view">
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: producto.nombre,
                      isFluidWidth: true,
                      src: producto.imagen,
                    },
                    largeImage: {
                      src: producto.imagen,
                      width: 1080,
                      height: 720,
                    },
                  }}
                />
              </div>

              <div className="col-12 col-md-6">
                <h4>{producto.nombre}</h4>
                <h3>S/ {producto.precio}</h3>
                <hr />
                <p>{producto.descripcion}</p>
                <div className="d-flex">
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      modificarCantidad(-1);
                    }}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <h4 className="mx-2">{cantidad}</h4>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      modificarCantidad(1);
                    }}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                  <br />
                  <a
                    href=""
                    className="btn btn-outline-dark ms-3"
                    onClick={(e) => anadirACarritoContext(e)}
                  >
                    <i className="fas fa-cart-plus"></i> Añadir a carrito
                  </a>
                </div>

                <div>
                  <button
                    type="button"
                    className="whatsapp"
                    onClick={() => whatsapp()}
                  >
                    Consultar
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
                      width="20px"
                    />
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
