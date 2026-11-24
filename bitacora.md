## Diccionario de datos

| Propiedad  | Tipo   | Significado |
| :--------- | :----- | :---------- |
| `id`       | number | Número único de la venta. |
| `fecha`    | string | Día de la venta (AAAA-MM-DD). |
| `cliente`  | string | Código del cliente (C01, C02...). |
| `producto` | string | Nombre del producto vendido. |
| `ciudad`   | string | Ciudad donde se hizo la venta. |
| `cantidad` | number | Unidades vendidas. |
| `precio`   | number | Precio de una unidad, en pesos colombianos. |

## Casos borde detectados

| # | Problema | Dónde | Decisión |
| :-: | :------- | :---- | :------- |
| 1 | Ciudad escrita distinto: `"medellín "` (minúscula y con espacio) frente a `"Medellín"`. | Venta 5 | Normalizar con `.trim().toLowerCase()` al comparar o agrupar, sin cambiar el dato original. |
| 2 | Cantidad en 0: no se vendió nada. | Venta 8 | Tratarla como no válida y dejarla fuera de todos los cálculos. |
| 3 | Clientes repetidos: C01 aparece 3 veces, C02 y C03 aparecen 2. | Ventas 1, 4, 11, 2, 7, 3, 9 | Calcular el ticket promedio por venta, no por cliente, y no contar clientes distintos al contar ventas. |

## Plan en pseudocódigo (MiniReto 2)

| Indicador | Qué recorro | Condición | Qué acumulo | Valor inicial |
| :-------- | :---------- | :-------- | :---------- | :------------ |
| `totalVendido` | todas las ventas | `cantidad > 0` | suma de `cantidad * precio` | `total = 0` |
| `unidadesVendidas` | todas las ventas | `cantidad > 0` | suma de `cantidad` | `unidades = 0` |
| `ventaMayor` | todas las ventas | `cantidad > 0` y valor mayor al del candidato | la venta de mayor valor | `mayor = null` |
| `ticketPromedio` | todas las ventas | `cantidad > 0` | total y contador de ventas | `total = 0`, `contador = 0` |
| `ventasPorCiudad` | todas las ventas | `cantidad > 0` y ciudad normalizada igual a la buscada | suma de `cantidad * precio` | `total = 0` |

**totalVendido(ventas)**
```
total = 0
para cada venta en ventas:
    si venta.cantidad > 0:
        total = total + venta.cantidad * venta.precio
devolver total
```

**unidadesVendidas(ventas)**
```
unidades = 0
para cada venta en ventas:
    si venta.cantidad > 0:
        unidades = unidades + venta.cantidad
devolver unidades
```

**ventaMayor(ventas)**
```
mayor = null
para cada venta en ventas:
    si venta.cantidad > 0:
        si mayor es null o valor(venta) > valor(mayor):
            mayor = venta
devolver mayor
```

**ticketPromedio(ventas)**
```
total = 0
contador = 0
para cada

## Qué devuelve cada función con un arreglo vacío

| Función | Con `[]` devuelve | Por qué |
| :------ | :---------------- | :------ |
| `totalVendido` | `0` | No se sumó nada; 0 es el valor inicial. |
| `unidadesVendidas` | `0` | Igual que la anterior. |
| `ventaMayor` | `null` | No hay ninguna venta, así que no puede devolver un registro. |
| `ticketPromedio` | `0` | Sin validar, 0 / 0 daría `NaN`. Reviso que el contador no sea 0 antes de dividir. |
| `ventasPorCiudad` | `0` | No hay ventas en esa ciudad. |

Probadas con tres entradas: arreglo completo (12), un solo elemento y arreglo vacío.


## Las cinco preguntas por función (MiniReto 3)

| Función | ¿Qué recorro? | ¿Qué filtro? | ¿Qué transformo? | ¿Qué acumulo? | ¿Cómo agrupo? |
| :------ | :------------ | :----------- | :--------------- | :------------ | :------------ |
| `totalVendidoM` | todas las ventas | las de `cantidad > 0` | cada venta en su valor (`map`) | suma de valores | no agrupo |
| `unidadesVendidasM` | todas las ventas | las de `cantidad > 0` | nada | suma de `cantidad` | no agrupo |
| `ventasPorCiudadM` | todas las ventas | válidas y de esa ciudad | cada venta en su valor | suma de valores | no agrupo |
| `totalPorCiudad` | todas las ventas | las de `cantidad > 0` | nada | dinero de cada ciudad | objeto con la ciudad normalizada como clave |
| `unidadesPorProducto` | todas las ventas | las de `cantidad > 0` | nada | unidades de cada producto | objeto con el producto como clave |
| `topProductosPorValor` | las ventas, luego las entradas del objeto | las de `cantidad > 0` | cada `[producto, valor]` en solo el nombre | dinero de cada producto | objeto con el producto como clave; luego ordeno y tomo los k primeros |

## Registro de depuración (MiniReto 4)

### Error 1: una ciudad aparece dos veces
- **Síntoma:** en ventas por ciudad, la misma ciudad salía en dos filas.
- **Entrada que lo produce:** ciudades escritas distinto, como `"Bogotá"` y `"Bogotá "` (con espacio). En la muestra pasa con `"Medellín"` y `"medellín "`.
- **Hipótesis:** el objeto usa la ciudad tal cual como clave, y para JavaScript `"Bogotá"` y `"Bogotá "` son claves distintas.
- **Prueba realizada:** probé una versión sin normalizar (`depuracion.js`). Con la muestra salieron 5 grupos en vez de 4.
- **Causa:** no se normalizaba el nombre antes de agrupar.
- **Corrección:** `totalPorCiudad` usa `venta.ciudad.trim().toLowerCase()` como clave. Ahora salen 4 ciudades, y la entrada de Bogotá da 1 solo grupo.

### Error 2: el ticket promedio da NaN
- **Síntoma:** al filtrar un día sin ventas, el ticket promedio mostraba `NaN`.
- **Entrada que lo produce:** un arreglo vacío, como `ventasDelDia(ventas, "2026-09-07")`.
- **Hipótesis:** se divide entre 0, y `0 / 0` da `NaN` en JavaScript.
- **Prueba realizada:** la versión sin validación devolvió `NaN` con el arreglo vacío.
- **Causa:** la función dividía sin revisar si había ventas.
- **Corrección:** en `ticketPromedio`, si el contador es 0 devuelve 0 antes de dividir.

Mi versión ya no tiene ninguno de los dos errores: lo demuestran las pruebas de `depuracion.js`.