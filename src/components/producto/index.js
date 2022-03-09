import React, { useContext } from "react";

import { toast } from "react-toastify";

import { CarritoContext } from "../../context/carrito";

import { Link } from "react-router-dom";

export default function Producto({ prod }) {
  const { anadirACarrito } = useContext(CarritoContext);

  const anadirACarritoContext = (e) => {
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
      cantidad: 1,
      producto: {
        ...prod,
      },
    };
    anadirACarrito(nuevoProducto);
  };

  const recortarDescripcion = (texto) => {
    let limite = 130;
    return texto.length >= limite ? `${texto.slice(0, limite)}...` : texto;
  };

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/detalle/${prod._id}`}
      className="card text-center bg-dark "
    >
      <img src={prod.imagen} alt={prod.nombre} className="img-titulo" />
      <div className="card-body text-light card-cont">
        <h5 className="large">
          <p style={{ textDecoration: "none" }} className="large">
            {prod.nombre}
          </p>
        </h5>
        <p className="small text-secondary">
          {recortarDescripcion(prod.descripcion)}
        </p>
        <div className="d-flex justify-content-center">
          <a
            href=""
            className="btn btn-outline-primary rounded-0"
            onClick={(e) => anadirACarritoContext(e)}
          >
            COMPRAR
          </a>
          <h3 className="ms-4 text-secondary">S/ {prod.precio}.00</h3>
        </div>
      </div>
    </Link>
  );
}
