import axios from 'axios'
import NewProduct from '../models/NewProduct.entity.js'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT || 5000
})

export async function fetchProductInventory() {
    const response = await api.get('/api/v1/inventory/by-product');
    return response.data.map(p => NewProduct.fromJSON(p)) // ✅ ya está bien
}

export async function fetchProductInventoryById(id) {
    const response = await api.get(`/api/v1/inventory/by-product/${id}`);
    return NewProduct.fromJSON(response.data) // ✅ aplica formateo
}

export async function createProductInventory(payload) {
    const response = await api.post('/api/v1/inventory/by-product', payload);
    return NewProduct.fromJSON(response.data) // ✅ aplica formateo
}
