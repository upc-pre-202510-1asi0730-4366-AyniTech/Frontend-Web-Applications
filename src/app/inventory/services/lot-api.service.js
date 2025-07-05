import axios from 'axios'
import NewLot from '../models/NewLot.entity.js'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT || 5000
})

export async function fetchLotInventory() {
    const response = await api.get('/api/v1/inventory/by-batch')
    return response.data.map(l => NewLot.fromJSON(l)) // 🟢 Aquí también
}

export async function fetchLotInventoryById(id) {
    const response = await api.get(`/api/v1/inventory/by-batch/${id}`)
    return NewLot.fromJSON(response.data)
}

export async function createLotInventory(payload) {
    const response = await api.post('/api/v1/inventory/by-batch', payload)
    return NewLot.fromJSON(response.data)
}
