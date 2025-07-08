export default class HistorySummary {
    constructor({ id, categoria, producto, fechaConsulta, precioUnitario, cantidad, precio }) {
        this.id = id;
        this.categoria = categoria;
        this.producto = producto;
        this.fechaConsulta = fechaConsulta;

        this.precio = precio ?? precioUnitario ?? 0;
        this.cantidad = cantidad ?? 0;

        this.total = this.precio * this.cantidad;
    }
}
