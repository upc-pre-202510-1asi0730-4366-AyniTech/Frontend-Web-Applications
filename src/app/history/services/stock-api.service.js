import StockSummary from "../model/stock.entity.js";

export async function fetchStockSummary() {
    return [
        new StockSummary({
            id: 1,
            stockPromedio: 25,
            categoria: "Lácteos",
            producto: "Leche",
            fechaConsulta: "14/04",
            stockIdeal: 15,
            estado: "Estable"
        }),
        new StockSummary({
            id: 2,
            stockPromedio: 5,
            categoria: "Enlatados",
            producto: "Atún",
            fechaConsulta: "12/04",
            stockIdeal: 10,
            estado: "Estable"
        }),
        new StockSummary({
            id: 3,
            stockPromedio: 30,
            categoria: "Cereales",
            producto: "Avena",
            fechaConsulta: "13/04",
            stockIdeal: 20,
            estado: "Estable"
        })
    ]
}