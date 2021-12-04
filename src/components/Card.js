import { useState, useEffect, useContext } from "react";
import { CarritoContext } from "../context/carrito";

import img1 from "../assets/41PPdkP1bzL.jpg";

export default function Card({ id, title, desc, img }) {
  const { anadirACarrito } = useContext(CarritoContext);

  const anadirACarritoContext = () => {
    const nuevoProducto = {
      id,
      title,
      desc,
      img,
    };
    anadirACarrito(nuevoProducto);
  };

  return (
    <div className="card text-center bg-dark ">
      <img src={img} alt="PS4" className="img-titulo" />
      <div className="card-body text-light card-cont">
        <h4 className="card-title">{title}</h4>
        <p className="card-text small text-secondary w-75 mx-auto">{desc}</p>
        <button
          className="btn btn-outline-secondary rounded-0"
          onClick={anadirACarritoContext}
        >
          <i className="fas fa-cart-plus"></i> COMPRARLO
        </button>
      </div>
    </div>
  );
}
