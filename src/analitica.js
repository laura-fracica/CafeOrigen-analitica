function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
  let total = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
    }
  }
  return total;
}

function unidadesVendidas(ventas) {
  let unidades = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      unidades += venta.cantidad;
    }
  }
  return unidades;
}

function ventaMayor(ventas) {
  let mayor = null;
  for (const venta of ventas) {
    if (venta.cantidad > 0 && (mayor === null || valorVenta(venta) > valorVenta(mayor))) {
      mayor = venta;
    }
  }
  return mayor;
}

function ticketPromedio(ventas) {
  let total = 0;
  let contador = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
      contador += 1;
    }
  }
  if (contador === 0) {
    return 0;
  }
  return total / contador;
}

function ventasPorCiudad(ventas, ciudad) {
  const buscada = ciudad.trim().toLowerCase();
  let total = 0;
  for (const venta of ventas) {
    if (venta.cantidad > 0 && venta.ciudad.trim().toLowerCase() === buscada) {
      total += valorVenta(venta);
    }
  }
  return total;
}

function totalVendidoM(ventas) {
  return ventas
    .filter((venta) => venta.cantidad > 0)
    .map(valorVenta)
    .reduce((acumulado, valor) => acumulado + valor, 0);
}

function unidadesVendidasM(ventas) {
  return ventas
    .filter((venta) => venta.cantidad > 0)
    .reduce((acumulado, venta) => acumulado + venta.cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
  const buscada = ciudad.trim().toLowerCase();
  return ventas
    .filter((venta) => venta.cantidad > 0 && venta.ciudad.trim().toLowerCase() === buscada)
    .map(valorVenta)
    .reduce((acumulado, valor) => acumulado + valor, 0);
}

function totalPorCiudad(ventas) {
  return ventas
    .filter((venta) => venta.cantidad > 0)
    .reduce((grupos, venta) => {
      const ciudad = venta.ciudad.trim().toLowerCase();
      grupos[ciudad] = (grupos[ciudad] || 0) + valorVenta(venta);
      return grupos;
    }, {});
}

function unidadesPorProducto(ventas) {
  return ventas
    .filter((venta) => venta.cantidad > 0)
    .reduce((grupos, venta) => {
      grupos[venta.producto] = (grupos[venta.producto] || 0) + venta.cantidad;
      return grupos;
    }, {});
}

function topProductosPorValor(ventas, k) {
  const valorPorProducto = ventas
    .filter((venta) => venta.cantidad > 0)
    .reduce((grupos, venta) => {
      grupos[venta.producto] = (grupos[venta.producto] || 0) + valorVenta(venta);
      return grupos;
    }, {});

  return Object.entries(valorPorProducto)
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([producto]) => producto);
}

function ventasDelDia(ventas, fecha) {
  return ventas.filter((venta) => venta.cantidad > 0 && venta.fecha === fecha.trim());
}

module.exports = {
  valorVenta,totalVendido,unidadesVendidas,ventaMayor,ticketPromedio,ventasPorCiudad,totalVendidoM,unidadesVendidasM,ventasPorCiudadM,totalPorCiudad,unidadesPorProducto,topProductosPorValor,ventasDelDia,
};