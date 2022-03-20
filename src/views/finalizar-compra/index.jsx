import React, { useEffect, useContext, useState } from 'react'
import { Link,useNavigate } from "react-router-dom"

import { toast } from "react-toastify";
import Swal from "sweetalert2";

import {validarCorreo,facturacion} from "../../services/Services"

import { formatoAPrecio } from '../../utilidades/set-precio'

import { CarritoContext } from "../../context/carrito";
import { crearPedido } from '../../services/Services'

import styles from './styles.module.scss'

export default function FinalizarCompra() {
    const { carrito, limpiarCarrito } = useContext(CarritoContext);
    const [subTotal, setSubTotal] = useState(0)
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)

     
    const [form, setForm] = useState({
        nombreCompleto: "",
        telefono: "",
        email: "",
        departamento: "",
        provincia: "",
        distrito: "",
        nroTarjeta: "",
        fechaVencimiento: "",
        ccv: "",
        dni: "",
        zip:"",
        calle: "",
        numero: "",
    })

    const [enviar,setEnviar] = useState({
        nombreCompleto: "",
        telefono: "",
        email: "",
        departamento: "",
        provincia: "",
        distrito: "",
        nroTarjeta: "",
        fechaVencimiento: "",
        ccv: "",
        direccion : ""
    })

    const navigate = useNavigate()
    
    const [correo,setCorreo] = useState()
    const [comprobante,setComprobante] = useState({
        items: data11,
        cliente: "",
        tipo: "BOLETA",
        tipo_documento:"DNI",
        numero_documento:"",
        direccion:{
            zipcode:"",
            calle:"",
            numero:0,
        }
    })
    
    const data11 = []
    const datos = carrito.map((item) => {
        return data11.push({
                "id":item.producto._id.toString(),
                "cantidad": item.cantidad
        })
    })

    const validar = async () => {
        const envio = { correo: localStorage.getItem("correo") }
        const result = await validarCorreo(envio)
        setComprobante({...comprobante,cliente:result.usuario._id.toString()})
        if (result.message === "existe") {
          setCorreo(result.correo)
          setUser(result.correo)
          setForm({
              ...form,
              email: result.correo
          })
        }
      }


    const actualizarInput = (e) => {
        const direccion = `${form.calle} ${+form.numero}`
        setForm({
            ...form, //cogiendo el estado de value, spreadoperator
            [e.target.name]: e.target.value
        });   
        const previos =  {
            ...comprobante,
            items:data11    ,
            numero_documento:form.dni,
            direccion:{
                zip:form.zip,
                calle:form.calle,
                numero:+form.numero,
            }
        }
        setEnviar({
            direccion,
            nombreCompleto: form.nombreCompleto,
        telefono: form.telefono,
        email: form.email,
        departamento: form.departamento,
        provincia: form.provincia,
        distrito: form.distrito,
        nroTarjeta: form.nroTarjeta,
        fechaVencimiento: form.fechaVencimiento,
        ccv: form.ccv,
        })
        setComprobante(previos)
    }
 
    const { eliminarProducto } = useContext(CarritoContext);
    
    useEffect(() => {
        validar()
        let result = 0

        carrito.forEach((item) => {
            result = result + (item.cantidad * item.producto.precio)
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
            ...enviar,
        }
        // Organizar carrito
        let carritoAEnviar = carrito.map(item => {
            return {
                nombre: item.producto.nombre,
                precio: item.producto.precio,
                cantidad: item.cantidad
            }
        })
        data.juegos = carritoAEnviar
        data.total = subTotal
        data.estado_id = "1"
        console.log(comprobante);

        const res = await facturacion(comprobante)

        console.log(res);
        
        
        delete data.nroTarjeta
        delete data.fechaVencimiento
        delete data.ccv
        
        if(res.data.enlace){
        setTimeout(async () => {
            data.idBoleta = await res.comprobante._id.toString()
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
                    nroTarjeta: "",
                    fechaVencimiento: "",
                    ccv: "",
                    dni: "",
                    zipcode:"",
                    calle: "",
                    numero: "",
                    direccion : ""
                })

                Swal.fire(
                    'Compra exitosa!',
                    'Su pedido se ha procesado con éxito',
                    'success'
                )
            } else {
                await Swal.fire({
                    position: "top-center",
                    icon: "Error",
                    title: "Hubo un Error",
                    text: "Complete datos Correctamente¡¡¡¡",
                    showConfirmButton: false,
                    timer: 2000,
                  });
            }

            setLoading(false)
        }, 2000)}
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
                                            <input type="text" id="dni" name="dni" required placeholder="DNI" value={form.dni} maxLength="8" className="form-control py-3" onChange={(e) => {actualizarInput(e)}} />
                                        </div>


                                        <div className="form-group mb-3">
                                            <input type="email" id="email" name="email" required placeholder="Correo electrónico" disabled value={correo} className="form-control py-3" onChange={(e) => {actualizarInput(e)}} />
                                        </div>

                                        <div className="form-group mb-3">
                                            <input type="number" id="telefono" name="telefono" required placeholder="Celular" className="form-control py-3" value={form.telefono} onChange={(e) => {actualizarInput(e)}} />
                                        </div>

                                        <div className="form-group mb-3">
                                            <input type="text" id="zip" name="zip" required placeholder="Codigo Postal" maxLength="8" value={form.zip} className="form-control py-3" onChange={(e) => {actualizarInput(e)}} />
                                        </div>

                                        {/* <div className="form-group mb-3">
                                            <textarea id="observaciones" name="observaciones" required placeholder="Observaciones" className="form-control"></textarea>
                                        </div> */}
                                </section>
                                ) : (<p>Debe iniciar sesión para continuar finalizar su compra</p>)}
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
                                            <input type="text" id="calle" name="calle" required placeholder="Calle" className="form-control py-3" value={form.calle} onChange={(e) => {actualizarInput(e)}} />
                                        </div>

                                        <div className="form-group mb-3">
                                            <input type="text" id="numero" name="numero" required placeholder="numero" max="5" className="form-control py-3" value={form.numero} onChange={(e) => {actualizarInput(e)}} />
                                        </div>
                                </section>) : null}
                            </div>

                            <div className="col-md-4">
                                {user ? (
                                <section className="mt-5">
                                    <div className="d-flex align-items-center">
                                        <p className="text-muted m-0 mr-1">Datos de pago</p>
                                        <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" width="40px" className="d-inline-block mr-1" />
                                        <img src="https://newsroom.mastercard.com/latin-america/files/2016/07/Linkedin_MC.jpg" width="40px" />
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
                                </section>) : null}
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
