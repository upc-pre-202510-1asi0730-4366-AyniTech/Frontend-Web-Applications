import http from '../../../shared/http-common';
import { StockAlert } from "../models/StockAlert.js";
import { defineStore } from "pinia";
import { API_CONFIG, CURRENT_ENV } from '../../../../api.config';

export const useStockAlertService = defineStore("stockAlertService", {
    state: () => ({
        alerts: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchAlerts() {
            this.loading = true;
            this.error = null;
            try {
                console.log('Obteniendo alertas...');
                const response = await http.get(API_CONFIG[CURRENT_ENV].ENDPOINTS.ALERTS);
                console.log('Respuesta de alertas:', response.data);
                
                this.alerts = Array.isArray(response.data) ? response.data : [response.data];
                this.alerts = this.alerts.map(alert => ({
                    productName: alert.productName || '',
                    quantity: alert.quantity || 0,
                    minStock: alert.minStock || 0,
                    entryDate: alert.entryDate || new Date().toISOString(),
                    isLowStock: alert.isLowStock || false
                }));
            } catch (error) {
                console.error('Error detallado al obtener alertas:', error.response || error);
                if (error.response?.status === 401) {
                    this.error = 'Sesión expirada. Por favor, inicia sesión nuevamente.';
                    // Redirigir al login
                    window.location.href = '/login';
                } else if (error.response?.status === 403) {
                    this.error = 'No tienes permisos para ver las alertas.';
                } else if (error.code === 'ERR_NETWORK') {
                    this.error = 'No se pudo conectar con el servidor. Por favor, verifica tu conexión.';
                } else {
                    this.error = error.response?.data?.message || 'Error al cargar las alertas';
                }
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async deleteAlert(id) {
            try {
                const url = `${API_CONFIG[CURRENT_ENV].ENDPOINTS.ALERTS}/${id}`;
                await http.delete(url);
                this.alerts = this.alerts.filter(a => a.id !== id);
            } catch (error) {
                console.error('Error al eliminar alerta:', error);
                throw error;
            }
        }
    }
});