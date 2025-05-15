<script>
import StockAlertCard from "../components/stockAlert-card.component.vue";

export default {
  components: { StockAlertCard },
  data() {
    return {
      alerts: [
        {
          id: 1,
          alert_type: "Stock Mínimo",
          product_category: "Menestras",
          product_name: "Lentejitas Garbanzo Pallares",
          alert_date: "24/05",
          severity: "warning",
          details: "Stock crítico"
        },
        {
          id: 2,
          alert_type: "Stock Máximo",
          product_category: "Menestras",
          product_name: "Lentejitas Garbanzo Pallares",
          alert_date: "24/05",
          severity: "info",
          details: "Sobre stock"
        },
        {
          id: 3,
          alert_type: "Pronto a vencer",
          product_category: "Menestras",
          product_name: "Lentejitas Garbanzo Pallares",
          alert_date: "24/05",
          severity: "danger",
          details: "Caduca pronto"
        }
      ]
    };
  },
  methods: {
    showDetails(alert) {
      alert("Detalles: " + alert.details);
    },
    deleteAlert(alert) {
      this.alerts = this.alerts.filter(a => a.id !== alert.id);
    }
  }
};
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Alerta Stock</h2>
    <div v-for="alert in alerts" :key="alert.id">
      <StockAlertCard :alert="alert" @view="showDetails" @delete="deleteAlert" />
    </div>
  </div>
</template>
