// models/kit-products.entity.js
export default class Kit {
    constructor({ id = null, name = '', price = 's/. 00.00', stock = '' }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock
        };
    }
}
