import axios from 'axios'
import HistorySummary from '../model/history.entity'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: import.meta.env.VITE_API_TIMEOUT || 5000
})

export async function fetchProductHistory() {
    const res = await api.get('/api/v1/reports/category')
    return res.data.map(item => new HistorySummary(item))
}
