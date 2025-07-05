export default class NewLot {
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
            ? new Date(fechaEntrada).toLocaleDateString('es-PE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })
            : ''
        this.cantidad = cantidad
        this.precio = precio
        this.unidad = unidad
    }

    toJSON() {
        return { ...this }
    }

    static fromJSON(json) {
        return new NewLot(json)
    }
}
