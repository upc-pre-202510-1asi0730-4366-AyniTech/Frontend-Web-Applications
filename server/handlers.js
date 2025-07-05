export const mockUsers = [
    {
        id: 1,
        email: "example@mail.com",
        password: "password123",
        first_name: "Test",
        last_name: "User"
    }
];

// Mock data para productos
export const mockProducts = [
    {
        id: 1,
        name: 'Galleta de Chocolate',
        category: 'Golosina',
        stock: 20,
        quantity: 50,
        buyPrice: 0.50,
        sellPrice: 1.00,
        batch: 'LOTE001',
        expiryDate: '2024-12-25',
        notes: 'Galletas rellenas de chocolate',
        tags: ['Dulce', 'Chocolate', 'Rellenas']
    },
    {
        id: 2,
        name: 'Galleta de Vainilla',
        category: 'Golosina',
        stock: 15,
        quantity: 30,
        buyPrice: 0.45,
        sellPrice: 0.90,
        batch: 'LOTE002',
        expiryDate: '2025-01-20',
        notes: 'Galletas de vainilla tradicionales',
        tags: ['Dulce', 'Vainilla']
    },
    {
        id: 3,
        name: 'Galleta Salada',
        category: 'Golosina',
        stock: 25,
        quantity: 40,
        buyPrice: 0.40,
        sellPrice: 0.80,
        batch: 'LOTE003',
        expiryDate: '2025-02-15',
        notes: 'Galletas saladas para aperitivos',
        tags: ['Salado', 'Galletas']
    }
];

export const authHandlers = {
    register: (userData) => {
        const userExists = mockUsers.some(user => user.email === userData.email);
        if (userExists) throw new Error('Email already registered');

        const newUser = {
            id: mockUsers.length + 1,
            ...userData,
            first_name: userData.first_name,
            last_name: userData.last_name
        };

        mockUsers.push(newUser);
        return { user: newUser };
    },

    login: (credentials) => {
        const user = mockUsers.find(u =>
            u.email === credentials.email &&
            u.password === credentials.password
        );

        if (!user) throw new Error('Invalid credentials');
        return { user };
    }
};

export const productHandlers = {
    getAllProducts: () => {
        return mockProducts;
    },

    getProductById: (id) => {
        const product = mockProducts.find(p => p.id === parseInt(id));
        if (!product) throw new Error('Producto no encontrado');
        return product;
    },

    createProduct: (productData) => {
        const newProduct = {
            id: Date.now(),
            ...productData,
            stock: productData.quantity,
            category: productData.category || 'Golosina'
        };

        mockProducts.push(newProduct);
        return newProduct;
    },

    updateProduct: (id, productData) => {
        const index = mockProducts.findIndex(p => p.id === parseInt(id));
        if (index === -1) throw new Error('Producto no encontrado');

        mockProducts[index] = { ...mockProducts[index], ...productData };
        return mockProducts[index];
    },

    deleteProduct: (id) => {
        const index = mockProducts.findIndex(p => p.id === parseInt(id));
        if (index === -1) throw new Error('Producto no encontrado');

        const deletedProduct = mockProducts.splice(index, 1)[0];
        return { success: true, deletedProduct };
    },

    getProductsByFilter: (filters) => {
        let filteredProducts = [...mockProducts];

        if (filters.category) {
            filteredProducts = filteredProducts.filter(p => 
                p.category.toLowerCase().includes(filters.category.toLowerCase())
            );
        }

        if (filters.tags && filters.tags.length > 0) {
            filteredProducts = filteredProducts.filter(p => 
                filters.tags.some(tag => p.tags.includes(tag))
            );
        }

        if (filters.minStock !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.stock >= filters.minStock);
        }

        if (filters.maxStock !== undefined) {
            filteredProducts = filteredProducts.filter(p => p.stock <= filters.maxStock);
        }

        return filteredProducts;
    }
};