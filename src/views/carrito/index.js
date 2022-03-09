import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { formatoAPrecio } from "../../utilidades/set-precio";

import { CarritoContext } from "../../context/carrito";

import styles from "./styles.module.scss";

export default function Carrito() {
  const { carrito, limpiarCarrito } = useContext(CarritoContext);
  const [subTotal, setSubTotal] = useState(0);

  const { eliminarProducto } = useContext(CarritoContext);

  useEffect(() => {
    let result = 0;

    carrito.forEach((item) => {
      result = result + item.cantidad * item.producto.precio;
    });

    setSubTotal(result);
  }, [carrito]);

  const eliminarDeCarrito = (index) => {
    eliminarProducto(index);

    toast.warn("Producto eliminado", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 pt-0">
          <h2 className="subtitulo-general">
            Carrito{" "}
            <span className="text-muted">
              {carrito.length > 1
                ? `(${carrito.length} productos)`
                : `(${carrito.length} producto)`}
            </span>
          </h2>
          {/* Producto */}

          {carrito.length ? (
            <section>
              <div className="container mt-5">
                <div className="row">
                  <div className="col-md-8">
                    {carrito.map((item, i) => {
                      return (
                        <div className={`${styles.card} row mb-5 py-3`} key={i}>
                          <div className="col-md-3">
                            <div
                              style={{
                                backgroundImage: `url(${
                                  item.producto ? item.producto.imagen : null
                                })`,
                              }}
                              className={`${styles.cardImagen}`}
                            >
                              {/* <img src={item.producto.imagen} alt="" className="img-fluid" /> */}
                            </div>
                          </div>
                          <div className="col-md-9 text-left">
                            <div className="row">
                              <div className="col-md-9">
                                <h3 className="small">
                                  {item.producto.nombre}
                                </h3>
                                <p className="small text-muted">
                                  {item.producto.descripcion}
                                </p>
                              </div>

                              <div className="col-md-3">
                                Cantidad: {item.cantidad}
                              </div>
                            </div>

                            <div className="row">
                              <div className="col">
                                {/* Si existe descuento */}
                                <div>
                                  {item.producto.precioDescuento ? (
                                    <h4
                                      className={`${styles.precio} text-danger`}
                                    >
                                      <span>
                                        {formatoAPrecio(
                                          item.producto.precioDescuento
                                        )}
                                      </span>
                                      <span className="small">(Oferta)</span>
                                    </h4>
                                  ) : (
                                    ""
                                  )}
                                  {item.producto.precio &&
                                  item.producto.precioDescuento ? (
                                    <h4 className={`${styles.precio}`}>
                                      <span>
                                        {formatoAPrecio(
                                          item.producto.precioReal
                                        )}
                                      </span>
                                    </h4>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                {/* Si no existe descuento */}
                                {item.producto.precio &&
                                !item.producto.precioDescuento ? (
                                  <h4 className={`${styles.precio}`}>
                                    <span>
                                      {formatoAPrecio(item.producto.precio)}
                                    </span>
                                  </h4>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>

                            <div className="row">
                              <div className="col">
                                <button
                                  type="button"
                                  className={`${styles.btnDelete} border-0 mt-3`}
                                  onClick={() => eliminarDeCarrito(i)}
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="col-md-4">
                    <div className="card mt-0">
                      <div className="card-body">
                        <h4>Resumen de tu orden</h4>

                        <p className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
                          <span className="small text-muted">
                            Sub-total productos
                          </span>
                          <span>{formatoAPrecio(subTotal)}</span>
                        </p>
                        <p className={`${styles.message}`}>
                          El costo de despacho no está incluido en el precio
                        </p>

                        <Link
                          to="/finalizar-compra"
                          className="btn btn-success w-100 mt-3"
                        >
                          FINALIZAR COMPRA &nbsp;
                          <i class="fas fa-location-arrow"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="col-12 text-center carrito-vacio d-flex flex-column justify-content-center align-items-center">
              <span className="icono-carrito-vacio">
                <i class="fas fa-shopping-cart"></i>
              </span>
              <p>Aún no ha agregado productos a su carrito.</p>

              <Link to="/tienda" className="btn btn-primary">
                Ver productos &nbsp;
                <i class="fab fa-telegram-plane"></i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
