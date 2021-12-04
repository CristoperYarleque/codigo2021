import { useState } from "react"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Login() {

    //manejar estados
    const [user, setUser]=useState("");
    const [password, setPass]=useState("");
    

    //actualizamo estado
    const actualizarInput = (e) => {
        //verificarndo si usuario es vacio
        if(e.target.name === "usuario"){
            setUser(e.target.value)
        }else{
            setPass(e.target.value)
        }

        console.log(e.target.name, e.target.value)
    }   

    //manejando el navegador
    const navigate = useNavigate();

    //validando los datos
    const validarDatos = (e)=>{
        //si los datos son correctos
       if(user=="admin" && password=="123456789"){
            Swal.fire({
            icon: 'success',
            title: 'Datos Correctos',
            text: 'En breve a la zona de Admin..',
            showConfirmButton: false,
            timer:2000
          })
          navigate("/admin")
       }else{
            Swal.fire({
                icon: 'error',
                title: 'Datos Incorrectos',
                text: 'Favor de intentar de nuevo...',
                showConfirmButton: false,
                timer:2000
            })

        
       }
    }

    return (
        <div className="login-contenedor">
            <div className="login-contenido ">
                <div className="titulo-contenedor ">
                    ¡Bienvenido Administrador!
                </div>
                    <label className="label-contenedor" >
                        Usuario:                    
                    </label>
                <div className="input-contenedor">
                    <input 
                        type="text"
                        id="usuario"
                        name="usuario"
                        placeholder="Ingrese su Usuario"
                        onChange={(e)=>{
                            actualizarInput(e);
                            }                        
                        }
                        className="input-estilo"
                    />
                </div>
                <div>
                    <label className="label-contenedor">
                        Contraseña:
                    </label>
                </div>
                <div className="input-contenedor">
                    <input  
                        type="password"
                        id="contrasena"
                        name="contrasena"
                        placeholder="Ingrese su Contraseña"
                        onChange={(e)=>{
                            actualizarInput(e);
                            }                        
                        }
                        className="input-estilo"
                    />
                </div>
                <div className="button-contenedor">
                    <button 
                        onClick={
                            validarDatos
                        }
                        className="button-elemento"
                    >
                        Ingresar
                    </button>
                </div>
            </div>
        </div>
    )
}
