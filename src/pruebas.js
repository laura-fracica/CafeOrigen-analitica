const { ventas } = require("./datos");
const a = require("./analitica");

const entradas = { completo: ventas, "un elemento": [ventas[0]], vacío: [] };

const funciones = {
  valorVenta: (v) => (v.length ? a.valorVenta(v[0]) : "sin registros"),
  totalVendido: a.totalVendido,
  unidadesVendidas: a.unidadesVendidas,
  ventaMayor: (v) => a.ventaMayor(v),
  ticketPromedio: a.ticketPromedio,
  ventasPorCiudad: (v) => a.ventasPorCiudad(v, "Medellín"),
};

for (const [nombre, fn] of Object.entries(funciones)) {
  console.log(`\n${nombre}`);
  for (const [entrada, datos] of Object.entries(entradas)) {
    console.log(`  ${entrada.padEnd(12)} ->`, fn(datos));
  }
}