// services/kit-products-api.service.js
import axios from 'axios';
import Kit from '../models/kit-products.entity.js';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT || 5000
});

// GET /api/v1/combos → Retorna una lista de Kits
export async function fetchCombos() {
    try {
        const res = await api.get('/api/v1/combos');
        return res.data.map(combo => {
            const totalPrice = calcularPrecioTotal(combo.items);
            const totalStock = combo.items.reduce((sum, item) => sum + item.quantity, 0);

            return new Kit({
                id: combo.id,
                name: combo.name,
                price: `s/. ${totalPrice.toFixed(2)}`,
                stock: `${totalStock} Stock`
            });
        });
    } catch (error) {
        console.error('[ERROR] No se pudo cargar combos:', error);
        return [];
    }
}

// Función auxiliar para sumar el precio total de los ítems del combo
function calcularPrecioTotal(items) {
    return items.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
}
