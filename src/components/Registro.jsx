import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { registro } from "../services/Services";

export default function Login() {
  //manejar estados
  const [user, setUser] = useState({
    nombre: "",
    passwword: "",
    correo: "",
    apellido: ""
  });
  //actualizamo estado
  const actualizarInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  //manejando el navegador
  const navigate = useNavigate();


  //validando los datos
  const manejarSubmit = async (e) => {
    e.preventDefault();
    const result = await registro(user);
    //si los datos son correctos
    if (result) {
      Swal.fire({
        icon: "success",
        title: "Registrado Correctamente",
        text: "Favor de Logearse",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/login")
    }
  };

  const click = () => {
      navigate("/login")
  }


  return (
    <div className="login-contenedor text-center">
      <div className="login-contenido ">
        <form className="d-flex flex-column align-items-center"
          onSubmit={(e) => {
            manejarSubmit(e);
          }}
        >
          <div className="titulo-contenedor text-center">¡Registrarse!</div>
          <label className="label-contenedor">Email:</label>
          <div className="input-contenedor">
            <input
            required
            minLength="4"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              type="email"
              id="correo"
              value={user.correo}
              name="correo"
              placeholder="Ingrese su Email"
              onChange={(e) => {
                actualizarInput(e);
              }}
              className="input-estilo"
            />
          </div>
          <div>
            <label className="label-contenedor">Contraseña:</label>
          </div>
          <div className="input-contenedor">
            <input
            required
            minLength="8"
              type="password"
              id="password"
              name="password"
              placeholder="Ingrese su Contraseña"
              onChange={(e) => {
                actualizarInput(e);
              }}
              className="input-estilo"
            />
          </div>

          <div>
            <label className="label-contenedor">Nombre:</label>
          </div>
          <div className="input-contenedor">
            <input
            required
            minLength="2"
              type="text"
              id="password"
              name="nombre"
              placeholder="Ingrese su Nombre"
              onChange={(e) => {
                actualizarInput(e);
              }}
              className="input-estilo"
            />
          </div>

          <div>
            <label className="label-contenedor">Apellido:</label>
          </div>
          <div className="input-contenedor">
            <input
            required
            minLength="2"
              type="text"
              id="password"
              name="apellido"
              placeholder="Ingrese su Apellido"
              onChange={(e) => {
                actualizarInput(e);
              }}
              className="input-estilo"
            />
          </div>

          <div className="button-contenedor">
            <button type="submit" className="button-elemento me-2 mb-4">
              Registrar
            </button>
            <button onClick={click} className="button-elemento ms-2 mb-4">
              Volver
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}