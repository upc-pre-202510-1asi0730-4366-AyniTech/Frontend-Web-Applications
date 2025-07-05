export default class HistorySummary {
    constructor({ id, categoria, producto, fechaConsulta, precioUnitario, cantidad }) {
        this.id = id;
        this.categoria = categoria;
        this.producto = producto;
        this.fechaConsulta = new Date(fechaConsulta).toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        this.precio = precioUnitario;
        this.cantidad = cantidad;
        this.total = precioUnitario * cantidad;
    }
}
