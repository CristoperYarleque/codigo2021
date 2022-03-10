import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import decode from 'jwt-decode'
import { useState } from 'react'
import { validarCorreo } from './services/Services'
import Swal from "sweetalert2";

export const PrivateRoute = ({children}) => {
    // el children sera el componente protegido a consultar verificaremos si la token existe y tienen tiempo de vida para que recien pueda acceder a ese componente, caso contrario lo redireccionaremos al inicio (/)
    const [token, setToken] = useState(localStorage.getItem('token'))
    
    useEffect(()=>{
        if(localStorage.getItem('token')){
            try {
                const result = decode(localStorage.getItem('token'))   
                setToken(localStorage.getItem('token'))
                // usar useContext para setear un contexto del usuario dentro de la aplicacion con el resultado de la decodificacion
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Informacion del usuario incorrecta",
                    text: "ADIOS",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                localStorage.removeItem('token')
                setToken(null)
            }
        }
    },[])

    return token && localStorage.getItem("token") ? children : <Navigate to={'/'}/>
}

export const PrivateLogin = ({children}) => {
    const [correo,setCorreo] = useState()

    useEffect(async ()=> {
        if(localStorage.getItem("correo")){
            try {
                const result = {
                    correo: localStorage.getItem("correo")
                }
                console.log(result);
                const data = await validarCorreo(result)
                if(data.message === "existe"){
                    setCorreo(data.correo)
                }else if(data.message === "no existe"){
                    Swal.fire({
                        icon: "error",
                        title: "Correo Incorrecto",
                        text: "ADIOS",
                        showConfirmButton: false,
                        timer: 2000,
                      });
                localStorage.removeItem('nombre')
                localStorage.removeItem('apellido')
                localStorage.removeItem('correo')
                setCorreo(null)
                }
            } catch (error) {
                console.log(error);
            }
        }
    },[])
    return correo ? <Navigate to={'/'}/> : children
}