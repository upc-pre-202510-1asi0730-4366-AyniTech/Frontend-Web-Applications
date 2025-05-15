<template>
  <div class="alert-container">
    <h2 class="page-title">Alerta Stock</h2>

    <div class="search-bar">
      <i class="pi pi-search"></i>
      <input
          v-model="search"
          type="text"
          placeholder="Buscar Alertas"
          class="search-input"
      />
    </div>

    <div v-for="alert in filteredAlerts" :key="alert.id">
      <StockAlertCard :alert="alert" @view="showDetails" @delete="deleteAlert" />
    </div>
  </div>
</template>

<script>
import StockAlertCard from "../components/stockAlert-card.component.vue";

export default {
  components: { StockAlertCard },
  data() {
    return {
      search: "",
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
  computed: {
    filteredAlerts() {
      return this.alerts.filter(a =>
          a.product_name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
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

<style scoped>
.alert-container {
  background-color: #FFF5E0;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
}

.page-title {
  text-align: left;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #2e2e2e;
}

.search-bar {
  display: flex;
  align-items: center;
  border: 2px solid #f29c1f;
  border-radius: 10px;
  background-color: #fff8e1;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  max-width: 400px;
}

.search-bar i {
  color: #f29c1f;
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 1rem;
  width: 100%;
}
</style>
<style>
body {
  background-color: #FFF5E0;
}
</style>

