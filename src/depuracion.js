const { ventas } = require("./datos");
const { totalPorCiudad, ticketPromedio, ventasDelDia } = require("./analitica");

function totalPorCiudadConError(datos) {
  const grupos = {};
  for (const venta of datos) {
    grupos[venta.ciudad] = (grupos[venta.ciudad] || 0) + venta.cantidad * venta.precio;
  }
  return grupos;
}

function ticketPromedioConError(datos) {
  let total = 0;
  for (const venta of datos) total += venta.cantidad * venta.precio;
  return total / datos.length;
}

const bogota = [
  { ciudad: "Bogotá", cantidad: 1, precio: 26000 },
  { ciudad: "Bogotá ", cantidad: 2, precio: 26000 },
];

console.log("ERROR 1: ciudad duplicada");
console.log("  Con error (muestra):", totalPorCiudadConError(ventas));
console.log("  Con error (Bogotá) :", totalPorCiudadConError(bogota));
console.log("  Mi versión (muestra):", totalPorCiudad(ventas));
console.log("  Mi versión (Bogotá) :", totalPorCiudad(bogota));

const sinVentas = ventasDelDia(ventas, "2026-09-07");
console.log("\nERROR 2: NaN en un día sin ventas");
console.log("  Con error:", ticketPromedioConError(sinVentas));
console.log("  Mi versión:", ticketPromedio(sinVentas));