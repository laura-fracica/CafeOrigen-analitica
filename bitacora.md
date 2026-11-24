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