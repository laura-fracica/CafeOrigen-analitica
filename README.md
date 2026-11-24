# Café Origen - Analítica de ventas v0.1

Motor de analítica en JavaScript (Node.js) que procesa una muestra de 12 ventas de septiembre de 2026 de Café Origen y muestra un reporte de negocio por consola.

## Cómo ejecutarlo

Necesitas Node.js (versión LTS).

```
git clone https://github.com/laura-fracica/cafe-origen-analitica.git
cd cafe-origen-analitica
node src/reporte.js
```

Otros scripts: `node src/explorar.js`, `node src/pruebas.js`, `node src/verificar.js` y `node src/depuracion.js`.

## Qué preguntas responde

- ¿Cuánto se vendió en total y cuántas unidades salieron?
- ¿Cuál fue la venta más grande?
- ¿Cuál es el ticket promedio por compra?
- ¿Cuánto se vendió en cada ciudad?
- ¿Cuántas unidades se vendieron de cada producto?
- ¿Cuáles son los 3 productos que más dinero generaron?
- ¿Cómo le fue a la tienda en un día específico, incluso sin ventas?

## Reglas de limpieza

- Las ventas con `cantidad` 0 no cuentan.
- Las ciudades se comparan sin importar mayúsculas ni espacios.
- Con un arreglo vacío no hay errores ni `NaN`.