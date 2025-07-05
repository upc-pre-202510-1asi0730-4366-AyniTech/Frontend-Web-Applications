import http from '../../../shared/http-common';
import { StockAlert } from "../models/StockAlert.js";
import { defineStore } from "pinia";
import { API_CONFIG } from '../../../../api.config';

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
                const response = await http.get(API_CONFIG.ENDPOINTS.ALERTS);
                this.alerts = Array.isArray(response.data) ? response.data : [response.data];
                this.alerts = this.alerts.map(alert => ({
                    productName: alert.productName || '',
                    quantity: alert.quantity || 0,
                    minStock: alert.minStock || 0,
                    entryDate: alert.entryDate || new Date().toISOString(),
                    isLowStock: alert.isLowStock || false
                }));
            } catch (error) {
                console.error('Error fetching alerts:', error);
                this.error = error.message || 'Error al cargar las alertas';
                throw error;
            } finally {
                this.loading = false;
            }
        },
        async deleteAlert(id) {
            await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
            this.alerts = this.alerts.filter(a => a.id !== id);
        }
    }
});