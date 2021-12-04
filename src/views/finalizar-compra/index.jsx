import React, { useEffect, useContext, useState } from 'react'
import { Link } from "react-router-dom"

import { toast } from "react-toastify";
import Swal from "sweetalert2";

import { formatoAPrecio } from '../../utilidades/set-precio'

import { CarritoContext } from "../../context/carrito";
import { crearPedido } from '../../services/Services'

import styles from './styles.module.scss'

export default function FinalizarCompra() {
    const { carrito, limpiarCarrito } = useContext(CarritoContext);
    const [subTotal, setSubTotal] = useState(0)
    const [user, setUser] = useState(true)
    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        nombreCompleto: "",
        telefono: "",
        email: "",
        departamento: "",
        provincia: "",
        distrito: "",
        direccion: "",
        nroTarjeta: "",
        fechaVencimiento: "",
        ccv: ""
    })

    const actualizarInput = (e) => {
        setForm({
            ...form, //cogiendo el estado de value, spreadoperator
            [e.target.name]: e.target.value,
        });
    }
 
    const { eliminarProducto } = useContext(CarritoContext);
    
    useEffect(() => {
        let result = 0

        carrito.forEach((item) => {
            result = result + (item.cantidad * item.producto.precio_juego)
        });

        setSubTotal(result)
      }, [carrito])

    const eliminarDeCarrito = (index) => {
        eliminarProducto(index)

        toast.warn('Producto eliminado', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const submit = async e => {
        e.preventDefault()

        setLoading(true)

        let data = {
            ...form
        }

        // Organizar carrito
        let carritoAEnviar = carrito.map(item => {
            return {
                nombre: item.producto.nom_juego,
                precio: item.producto.precio_juego,
                cantidad: item.cantidad
            }
        })

        data.juegos = carritoAEnviar
        data.total = subTotal
        data.estado_id = "1"
        data.coordenadas = [-12.149882, -76.99093]

        // Eliminar campos innecesarios
        delete data.nroTarjeta
        delete data.fechaVencimiento
        delete data.ccv

        setTimeout(async () => {
            const resultado = await crearPedido(data)

            if(resultado) {
                limpiarCarrito();

                setForm({
                    nombreCompleto: "",
                    telefono: "",
                    email: "",
                    departamento: "",
                    provincia: "",
                    distrito: "",
                    direccion: "",
                    nroTarjeta: "",
                    fechaVencimiento: "",
                    ccv: ""
                })

                Swal.fire(
                    'Compra exitosa!',
                    'Su pedido se ha procesado con éxito',
                    'success'
                )
            } else {
                Swal.fire(
                    'Ups! Ocurrió un error',
                    'Al parecer hubo un error al procesar la compra, por favor inténtelo nuevamente',
                    'success'
                )
            }

            setLoading(false)
        }, 2000)
    }

    return (
        <div className="container my-5">
            <div className="row">
                {carrito.length ? (
                    <form className="col-12" onSubmit={e => submit(e)}>
                        <div className="row">
                        <div className="col-md-4">
                            <h2 className="subtitulo-general mt-3">Finalizar compra</h2>
                            {user ? (
                                <section>
                                    <p className="text-muted">Datos de contacto</p>
                                        <div className="form-group mb-3">
                                            <input type="text" id="nombreCompleto" name="nombreCompleto" required placeholder="Nombre completo" value={form.nombreCompleto} className="form-control py-3" onChange={(e) => {actualizarInput(e)}} />
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="email" id="email" name="email" required placeholder="Correo electrónico" value={form.email} className="form-control py-3" onChange={(e) => {actualizarInput(e)}} />
                                        </div>

                                        <div className="form-group mb-3">
                                            <input type="number" id="telefono" name="telefono" required placeholder="Celular" className="form-control py-3" value={form.telefono} onChange={(e) => {actualizarInput(e)}} />
                                        </div>

                                        {/* <div className="form-group mb-3">
                                            <textarea id="observaciones" name="observaciones" required placeholder="Observaciones" className="form-control"></textarea>
                                        </div> */}
                                </section>) : (<p>Debe iniciar sesión para continuar finalizar su compra</p>)}
                            </div>
                            <div className="col-md-4">
                                {user ? (
                                <section className="mt-5">
                                    <p className="text-muted">Dirección de entrega</p>
                                    <div className="form-group mb-3">
                                            <input type="text" id="departamento" name="departamento" required placeholder="Departamento" className="form-control py-3" value={form.departamento} onChange={(e) => {actualizarInput(e)}} />
                                        </div>

                                        <div className="form-group mb-3">
                                            <input type="text" id="provincia" name="provincia" required placeholder="Provincia" className="form-control py-3" value={form.provincia} onChange={(e) => {actualizarInput(e)}} />
                                        </div>

                                        <div className="form-group mb-3">
                                            <input type="text" id="distrito" name="distrito" required placeholder="Distrito" className="form-control py-3" value={form.distrito} onChange={(e) => {actualizarInput(e)}} />
                                        </div>

                                        <div className="form-group mb-3">
                                            <input type="text" id="direccion" name="direccion" required placeholder="Dirección de envío" className="form-control py-3" value={form.direccion} onChange={(e) => {actualizarInput(e)}} />
                                        </div>
                                </section>) : (<p>Debe iniciar sesión para continuar finalizar su compra</p>)}
                            </div>

                            <div className="col-md-4">
                                {user ? (
                                <section className="mt-5">
                                    <div className="d-flex align-items-center">
                                        <p className="text-muted m-0 mr-1">Datos de pago</p>
                                        <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" width="40px" className="d-inline-block mr-1" />
                                        <img src="https://cdn-icons.flaticon.com/png/512/177/premium/177025.png?token=exp=1638588983~hmac=203e22c2aeb23b93ce3a9ec278132f2f" width="40px" />
                                    </div>
                                    <section>
                                    {/* <PayPalButton
                                        createOrder={(data, actions) =>
                                            createOrder(data, actions)
                                        }
                                        onApprove={(data, actions) =>
                                            onApprove(data, actions)
                                        }
                                        /> */}
                                        <div className="form-group mb-3">
                                            <input type="number" id="nroTarjeta" name="nroTarjeta" required placeholder="Número de tarjeta" className="form-control py-3" value={form.nroTarjeta} onChange={(e) => {actualizarInput(e)}} />
                                        </div>

                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group mb-3">
                                                    <input type="text" id="fechaVencimiento" name="fechaVencimiento" required placeholder="F.V. (MM/AA)" className="form-control py-3" value={form.fechaVencimiento} onChange={(e) => {actualizarInput(e)}} />
                                                </div>
                                            </div>

                                            <div className="col-6">
                                                <div className="form-group mb-3">
                                                    <input type="text" id="ccv" name="ccv" required placeholder="CCV" className="form-control py-3" value={form.ccv} onChange={(e) => {actualizarInput(e)}} />
                                                </div>
                                            </div>
                                        </div>

                                        <button type="submit" disabled={loading} className="btn btn-success btn-block w-100 py-3">
                                            {loading ? 'Creando pedido' : 'Finalizar'} &nbsp;
                                            <i class="fas fa-location-arrow"></i>
                                        </button>
                                    </section>
                                </section>) : (<p>Debe iniciar sesión para continuar finalizar su compra</p>)}
                            </div>
                        </div>
                    </form>) : (
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
    )
}
