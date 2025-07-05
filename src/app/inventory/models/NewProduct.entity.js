export default class NewProduct {
    constructor({
                    id = null,
                    categoria = '',
                    producto = '',
                    fechaEntrada = '',
                    cantidad = '',
                    precio = '00.00',
                    stockMinimo = '',
                    unidadMedida  = ''
                } = {}) {
        this.id = id
        this.categoria = categoria
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
        this.stockMinimo = stockMinimo
        this.unidad = unidadMedida
    }

    
    toJSON() {
        return { ...this }
    }

    static fromJSON(json) {
        return new NewProduct(json)
    }
}
