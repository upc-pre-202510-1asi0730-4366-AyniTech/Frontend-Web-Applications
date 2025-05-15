export default class HistorySummary {
    constructor({ id, categoria, producto, fechaConsulta, precio, cantidad }) {
        this.id = id;
        this.categoria = categoria;
        this.producto = producto;
        this.fechaConsulta = fechaConsulta;
        this.precio = precio;
        this.cantidad = cantidad;
        this.total = precio * cantidad;
    }
}
