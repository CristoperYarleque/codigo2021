import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { login } from "../services/Services";

export default function Login() {
  //manejar estados
  const [user, setUser] = useState({
    correo: "",
    password: "",
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
    const result = await login(user);
    //si los datos son correctos
    if (result.message === "error") {
      Swal.fire({
        icon: "error",
        title: "Datos Incorrectos",
        text: "Favor de intentar de nuevo...",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (result.message === "admin") {
      localStorage.setItem("token", result.token);
      localStorage.setItem("correo", result.usuarioEncontrado.correo);
      Swal.fire({
        icon: "success",
        title: "Datos Correctos",
        text: "En breve a la zona de Admin..",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    } else {
      localStorage.setItem("correo", result.usuarioEncontrado.correo);
      Swal.fire({
        icon: "success",
        title: "Datos Correctos",
        text: "Logeado Correctamente",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    }
  };

  const click = () => {
    navigate("/registro");
  };

  return (
    <div className="login-contenedor text-center">
      <div className="login-contenido">
        <form
          className="d-flex flex-column align-items-center"
          onSubmit={(e) => {
            manejarSubmit(e);
          }}
        >
          <div className="titulo-contenedor">¡Loguearse!</div>
          <label className="label-contenedor">Email:</label>
          <div className="input-contenedor">
            <input
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              minLength="4"
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
              minLength="3"
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
          <div className="button-contenedor">
            <button type="submit" className="button-elemento me-2">
              Ingresar
            </button>
            <button onClick={click} className="button-elemento ms-2">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
