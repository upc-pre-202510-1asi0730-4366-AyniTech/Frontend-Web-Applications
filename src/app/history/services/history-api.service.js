import HistorySummary from "../model/history.entity.js";

export async function fetchProductHistory() {
    return [
        new HistorySummary({
            id: 1,
            categoria: "Bebidas",
            producto: "Jugo de Naranja",
            fechaConsulta: "24/05",
            precio: 3.5,
            cantidad: 10
        }),
        new HistorySummary({
            id: 2,
            categoria: "Abarrotes",
            producto: "Fideos",
            fechaConsulta: "23/05",
            precio: 2,
            cantidad: 5
        }),
        new HistorySummary({
            id: 3,
            categoria: "Lácteos",
            producto: "Leche Entera",
            fechaConsulta: "22/05",
            precio: 4.2,
            cantidad: 8
        }),
        new HistorySummary({
            id: 4,
            categoria: "Snacks",
            producto: "Galletas de Avena",
            fechaConsulta: "21/05",
            precio: 1.5,
            cantidad: 12
        }),
        new HistorySummary({
            id: 5,
            categoria: "Enlatados",
            producto: "Atún en Aceite",
            fechaConsulta: "20/05",
            precio: 6.8,
            cantidad: 4
        }),
        new HistorySummary({
            id: 6,
            categoria: "Cereales",
            producto: "Avena Instantánea",
            fechaConsulta: "19/05",
            precio: 3.0,
            cantidad: 7
        }),
    ]
}