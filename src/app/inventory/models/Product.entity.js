export default class Product {
    constructor({ id,categoria, producto, fechaEntrada, cantidad,precio,stockminimo, unidad }) {

        this.id=id
        this.categoria = categoria
        this.producto = producto
        this.fechaEntrada = fechaEntrada
        this.cantidad = cantidad
        this.precio = precio
        this.stockminimo = stockminimo
        this.unidad = unidad
    }
}