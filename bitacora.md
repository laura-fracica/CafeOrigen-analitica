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