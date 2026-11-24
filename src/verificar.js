const { ventas } = require("./datos");
const a = require("./analitica");

const entradas = { completo: ventas, "un elemento": [ventas[0]], vacío: [] };

function comparar(nombre, ciclo, metodo) {
  const estado = ciclo === metodo ? "OK" : "DIFERENTE";
  console.log(`${estado.padEnd(10)} ${nombre}  (ciclo=${ciclo}, método=${metodo})`);
}

for (const [entrada, datos] of Object.entries(entradas)) {
  comparar(`totalVendido [${entrada}]`, a.totalVendido(datos), a.totalVendidoM(datos));
  comparar(`unidadesVendidas [${entrada}]`, a.unidadesVendidas(datos), a.unidadesVendidasM(datos));
  comparar(`ventasPorCiudad Medellín [${entrada}]`, a.ventasPorCiudad(datos, "Medellín"), a.ventasPorCiudadM(datos, "Medellín"));
}