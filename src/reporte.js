const { ventas } = require("./datos");
const {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
} = require("./analitica");

const ANCHO = 56;
const pesos = (valor) => `$ ${Math.round(valor).toLocaleString("es-CO")}`;
const mayuscula = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);
const fila = (etiqueta, valor) => `  ${etiqueta.padEnd(30)}${String(valor).padStart(ANCHO - 32)}`;
const titulo = (texto) => console.log(`\n${"=".repeat(ANCHO)}\n ${texto}\n${"=".repeat(ANCHO)}`);

function resumen(datos) {
  const mayor = ventaMayor(datos);
  console.log(fila("Ventas válidas", datos.filter((v) => v.cantidad > 0).length));
  console.log(fila("Total vendido", pesos(totalVendido(datos))));
  console.log(fila("Unidades vendidas", unidadesVendidas(datos)));
  console.log(fila("Ticket promedio", pesos(ticketPromedio(datos))));
  console.log(fila("Venta más grande", mayor === null ? "No hay ventas" : `#${mayor.id} - ${pesos(valorVenta(mayor))}`));
}

console.log("CAFÉ ORIGEN - REPORTE DE ANALÍTICA v0.1");

titulo("1. RESUMEN GENERAL");
resumen(ventas);

titulo("2. VENTAS POR CIUDAD");
for (const [ciudad, total] of Object.entries(totalPorCiudad(ventas))) {
  console.log(fila(mayuscula(ciudad), pesos(total)));
}

titulo("3. UNIDADES POR PRODUCTO");
for (const [producto, unidades] of Object.entries(unidadesPorProducto(ventas))) {
  console.log(fila(producto, `${unidades} uds`));
}

titulo("4. TOP 3 PRODUCTOS POR VALOR");
topProductosPorValor(ventas, 3).forEach((producto, i) => console.log(`  ${i + 1}. ${producto}`));

titulo("RESUMEN POR DÍA");
for (const fecha of ["2026-09-05", "2026-09-07"]) {
  const delDia = ventasDelDia(ventas, fecha);
  console.log(`\n  Día ${fecha}${delDia.length === 0 ? " (sin ventas)" : ""}`);
  resumen(delDia);
}