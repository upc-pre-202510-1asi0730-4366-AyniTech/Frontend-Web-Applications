export default class NewProduct {
    constructor() {
        this.name = '';
        this.description = '';
        this.purchasePrice = 0;
        this.salePrice = 0;
        this.stock = 0;
        this.minStock = 0;
        this.categoryId = null;
        this.unitId = null;
        this.expirationDate = null;
        this.internalNotes = '';
        this.tagIds = [];
    }

    toJSON() {
        return {
            name: this.name,
            description: this.description,
            purchasePrice: this.purchasePrice,
            salePrice: this.salePrice,
            internalNotes: this.internalNotes,
            categoryId: this.categoryId,
            unitId: this.unitId,
            tagIds: this.tagIds
        };
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