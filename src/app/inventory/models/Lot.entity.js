export default class Lot {
    constructor({ id, proveedor, producto, fechaEntrada, cantidad, precio, unidad }) {

        this.id = id;
        this.proveedor = proveedor
        this.producto = producto
        this.fechaEntrada = fechaEntrada
        this.cantidad = cantidad
        this.precio = precio
        this.unidad = unidad
    }
}