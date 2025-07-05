    import axios from 'axios'
    import StockEntity from '../model/stock.entity'

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_BASE_URL,
        timeout: import.meta.env.VITE_API_TIMEOUT || 5000
    })

    export async function fetchStockSummary() {
        const response = await api.get('/api/v1/reports/stock-average')
        return response.data.map(item => new StockEntity(item))
    }
