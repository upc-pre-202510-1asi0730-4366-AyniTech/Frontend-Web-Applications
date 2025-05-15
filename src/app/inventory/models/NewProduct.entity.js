export default class NewProduct {
    constructor({
                    id = null,
                    categoria = '',
                    producto = '',
                    fechaEntrada = '',
                    cantidad = '',
                    precio = '00.00',
                    stockMinimo = '',
                    unidad = ''
                } = {}) {
        this.id = id
        this.categoria = categoria
        this.producto = producto
        this.fechaEntrada = fechaEntrada
        this.cantidad = cantidad
        this.precio = precio
        this.stockMinimo = stockMinimo
        this.unidad = unidad
    }

    toJSON() {
        return {
            id: this.id,
            categoria: this.categoria,
            producto: this.producto,
            fechaEntrada: this.fechaEntrada,
            cantidad: this.cantidad,
            precio: this.precio,
            stockMinimo: this.stockMinimo,
            unidad: this.unidad
        }
    }

    static fromJSON(json) {
        return new NewProduct({
            id: json.id,
            categoria: json.categoria,
            producto: json.producto,
            fechaEntrada: json.fechaEntrada,
            cantidad: json.cantidad,
            precio: json.precio,
            stockMinimo: json.stockMinimo,
            unidad: json.unidad
        })
    }
}