import http from '@/shared/http-common'
import { API_CONFIG, CURRENT_ENV } from '../../../../api.config';

const { REPORTS } = API_CONFIG[CURRENT_ENV].ENDPOINTS

export const fetchStockSummary = async () => {
    try {
        const response = await http.get(REPORTS.STOCK_AVERAGE)
        return response.data
    } catch (error) {
        console.error('Error al obtener stock promedio:', error)
        throw error
    }
}

export const fetchStockSummaryByDate = async (fecha) => {
    try {
        const response = await http.get(`${REPORTS.STOCK_AVERAGE_BY_DATE}?fecha=${fecha}`)
        return response.data
    } catch (error) {
        console.error('Error al obtener stock promedio por fecha:', error)
        throw error
    }
}
