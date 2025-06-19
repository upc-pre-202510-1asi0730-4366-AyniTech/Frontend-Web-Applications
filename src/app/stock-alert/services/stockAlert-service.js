import { StockAlert } from "../models/StockAlert.js"; //
import {defineStore} from "pinia";

const BASE_URL = "/api/v1/stock_alerts";

export const useStockAlertService = defineStore("stockAlertService", {
    state: () => ({
        alerts: []
    }),
    actions: {
        async fetchAlerts() {
            const res = await fetch(BASE_URL);
            const data = await res.json();
            this.alerts = data.map(a => new StockAlert(a));
        },
        async deleteAlert(id) {
            await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
            this.alerts = this.alerts.filter(a => a.id !== id);
        }
    }
});