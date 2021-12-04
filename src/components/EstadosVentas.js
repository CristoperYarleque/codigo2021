

export default function EstadosVentas(estadoP) {
    console.log(estadoP)
    return (
        <>
            {
                estadoP.map((estado, i)=>(
                    <option value={estado.id} key={i}>
                        {estado.nombre}
                    </option>
                ))
            }
        </>
    )
}
