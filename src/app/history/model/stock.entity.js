// src/app/history/model/stock.entity.js
export default class StockEntity {
    constructor({ id, stockPromedio, categoria, producto, fechaConsulta, stockIdeal, estado }) {
        this.id = id;
        this.stockPromedio = stockPromedio;
        this.categoria = categoria;
        this.producto = producto;
        this.fechaConsulta = new Date(fechaConsulta).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        this.stockIdeal = stockIdeal;
        this.estado = estado;
    }
}
