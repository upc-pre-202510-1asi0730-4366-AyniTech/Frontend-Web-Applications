/**
 * @entity Inventory
 * @summary Inventory entity model.
 * @description Represents an inventory item with details such as category, product, entry date, quantity, unit price, minimum stock, unit, and supplier.
 * @author Henry Kalet Esteban Roman
 */
export class Inventory {
    constructor({
                    id = 0,
                    category = "",
                    product = "",
                    entryDate = "",
                    quantity = 0,
                    unitPrice = 0.0,
                    minStock = 0,
                    unit = "",
                    supplier = ""
                })
    {
        this.id = id;
        this.category = category;
        this.product = product;
        this.entryDate = entryDate;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.minStock = minStock;
        this.unit = unit;
        this.supplier = supplier;
    }
}
