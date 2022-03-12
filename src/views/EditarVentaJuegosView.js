import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerVentaPorId, editarVentaPorId, obtenerFacturacion } from "../services/Services"
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import FormularioVentas from "../components/FormularioVentas";

export default function EditarVentaJuegosView() {

    //se crea un estado donde se almacenara los datos de venta
    const [value, setValue] = useState({
        nombreCompleto: "",
        telefono: "",
        email: "",
        provincia: "",
        distrito: "",
        direccion: "",
        juegos: [],
        total: 0,
        estado_id: "",
    })
    const [boleta11, setBoleta11] = useState({
        tipo: "",
        enlace: "",
        pdf: "",
        xml: ""
    })
    const [estado, setEstado] = useState("");
    const { id } = useParams();
    const navigate = useNavigate()

    const boleta = async (idBol) => {
        const resultado = await obtenerFacturacion(idBol)
        setBoleta11(resultado)
    }

    const getVentas = async () => {
        try {
            const ventaObt = await obtenerVentaPorId(id);
            boleta(ventaObt.idBoleta)
            setValue(ventaObt);
            if (ventaObt.estado_id === "1") {
                setEstado("ADMITIDO")
            } else if (ventaObt.estado_id === "2") {
                setEstado("EN ESPERA")
            } else if (ventaObt.estado_id === "3") {
                setEstado("EN CAMINO")
            } else if (ventaObt.estado_id === "4") {
                setEstado("ENTREGADO")
            }
        } catch (error) {
            console.log("error")
        }
    }

    console.log(boleta11);
    const manejarActualizacion = async () => {
        try {
            const result = await editarVentaPorId(id, value);
            if (result) {
                await Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Producto Editado Exitosamente",
                });
                navigate("/ventasJuegos")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarInput = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    }

    const getRegresar = () => {
        navigate("/ventasJuegos");
    }

    useEffect(() => {
        getVentas()
    }, [])

    return (
        <div className="bg-dark">
            <div className="container col-md-11 bg-light">
                <FormularioVentas
                    value={value}
                    actualizarInput={actualizarInput}
                    estado={estado}
                    getRegresar={getRegresar}
                    manejarActualizacion={manejarActualizacion}
                    boleta11={boleta11}
                />
            </div>
        </div>
    )
}
