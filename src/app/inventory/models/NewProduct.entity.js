export default class NewProduct {
    constructor({
                    id = null,
                    proveedor = '',
                    producto = '',
                    fechaEntrada = '',
                    cantidad = '',
                    precio = '00.00',
                    unidad = ''
                } = {}) {
        this.id = id
        this.proveedor = proveedor
        this.producto = producto
        this.fechaEntrada = fechaEntrada
        this.cantidad = cantidad
        this.precio = precio
        this.unidad = unidad
    }

    toJSON() {
        return {
            id: this.id,
            proveedor: this.proveedor,
            producto: this.producto,
            fechaEntrada: this.fechaEntrada,
            cantidad: this.cantidad,
            precio: this.precio,
            unidad: this.unidad
        }
    }

    static fromJSON(json) {
        return new NewProduct({
            id: json.id,
            proveedor: json.proveedor,
            producto: json.producto,
            fechaEntrada: json.fechaEntrada,
            cantidad: json.cantidad,
            precio: json.precio,
            unidad: json.unidad
        })
    }
}