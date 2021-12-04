export const formatoAPrecio = (precio) => {
  const formatter = new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
    // useGrouping: true
  });

  let result = formatter.format(precio);
  result = result.replace("PEN", "");
  // result = result.replace(' ', '')

  return result;
};
