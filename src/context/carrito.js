import { useState, useEffect, createContext } from "react";

//recuerden que necesitamos esta referencia para referirnos al contexto, para ser utizada luego por un useContext
export const CarritoContext = createContext();

/* const carrito = [
  {
    id: 1,
    producto: {
      id: 5,
      nombre: "Videojuego de acción",
      descripcion: "Videojuego de acción (Desc.)",
      precioReal: 5,
      precioDescuento: 3,
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/proyg5-2021.appspot.com/o/proyEcommerce%2F1_p.png?alt=media&token=044cfa88-5608-43ff-8573-174feee3bcbb",
    },
    cantidad: 3,
  },
  {
    id: 2,
    producto: {
      id: 3,
      nombre: "Videojuego de aventura",
      descripcion: "Videojuego de aventura (Desc.)",
      precioReal: 10,
      precioDescuento: 5,
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/proyg5-2021.appspot.com/o/proyEcommerce%2F2_p.png?alt=media&token=80cdcbc5-df3e-4860-bd6a-a16699fb9460",
    },
    cantidad: 5,
  },
  {
    id: 3,
    producto: {
      id: 5,
      nombre: "Videojuego de estrategia",
      descripcion: "Videojuego de estrategia (Desc.)",
      precioReal: 5,
      precioDescuento: null,
      imagen:
        "https://firebasestorage.googleapis.com/v0/b/proyg5-2021.appspot.com/o/proyEcommerce%2F4_p.png?alt=media&token=3a09fd56-94d6-4d75-8b87-f7435fc3da64",
    },
    cantidad: 3,
  },
] */

//todo Contexto necesita un Provider, props.children
const CarritoContextProvider = (props) => {
  const [carrito, setCarrito] = useState([]);

  /**producto = {
   * 	id, nombre, precio, cantidad
   * } */
  const anadirACarrito = (nuevoProducto) => {
    const existe = carrito.findIndex(
      (prod) => prod.producto._id === nuevoProducto.producto._id
    );
    //-1 si no existe o si existe la posición ó índice, 1 3 0 6
    if (existe === -1) {
      //es nuevo no existe todavia
      setCarrito([...carrito, nuevoProducto]);
    } else {
      //si existe, tengo que modificarlo según su posición
      let carritoTmp = [...carrito]; //copia del carrito actual
      //solamente modifico la propiedad cantidad del producto existe con la cantidad adicional
      carritoTmp[existe].cantidad =
        carritoTmp[existe].cantidad + nuevoProducto.cantidad;
      setCarrito(carritoTmp);
    }
  };

  const eliminarProducto = (index) => {
    let carritoTmp = [...carrito];
    carritoTmp.splice(index, 1);

    setCarrito(carritoTmp);
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  //1. Cuando cargue el Provider haremos que pregunte si hay algo en el localStorage
  //1.1 si es que encuentra algo en el localStorage pues hacemos un setCarrito
  useEffect(() => {
    const carritoStorage = JSON.parse(localStorage.getItem("carritoApp"));
    if (carritoStorage) {
      setCarrito(carritoStorage);
    }
  }, []);

  //2. Pero cada vez que cambie carrito, guardaremos la información en el localStorage
  useEffect(() => {
    localStorage.setItem("carritoApp", JSON.stringify(carrito));
  }, [carrito]);

  return (
    <CarritoContext.Provider
      value={{ carrito, anadirACarrito, eliminarProducto, limpiarCarrito }}
    >
      {props.children}
    </CarritoContext.Provider>
  );
};

export default CarritoContextProvider;
