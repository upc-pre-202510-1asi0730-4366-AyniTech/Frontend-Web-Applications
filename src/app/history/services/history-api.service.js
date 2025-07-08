import http from '@/shared/http-common'
import { API_CONFIG, CURRENT_ENV } from '../../../../api.config';


const { REPORTS } = API_CONFIG[CURRENT_ENV].ENDPOINTS

// Reporte general por categoría
export const fetchProductHistory  = async () => {
    try {
        const response = await http.get(REPORTS.CATEGORY)
        return response.data
    } catch (error) {
        console.error('Error al obtener reportes por categoría:', error)
        throw error
    }
}

// Reporte por categoría filtrado por fecha
export const fetchHistorySummaryByDate = async (fecha) => {
    try {
        const response = await http.get(`${REPORTS.CATEGORY_BY_DATE}?fecha=${fecha}`)
        return response.data
    } catch (error) {
        console.error('Error al obtener reportes por categoría y fecha:', error)
        throw error
    }
}
