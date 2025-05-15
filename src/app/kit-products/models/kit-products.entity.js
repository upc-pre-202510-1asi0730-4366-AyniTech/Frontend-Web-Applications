export default class Kit {
    constructor({
                    id = null,
                    name = '',
                    price = '00.00',
                    stock = '',
                }) {
        this.id = id;
        this.name = name;
        this.price = price; // Formato: 's/. XX'
        this.stock = stock; // Formato: 'XX Stock'
    }

    // Método para convertir a un objeto plano
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            price: this.price,
            stock: this.stock,
        };
    }
}

