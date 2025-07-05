<template>
  <NavbarComponent/>
  <div class="alert-container">
    <h2 class="page-title">{{ $t('alerts.title') }}</h2>

    <div class="search-bar">
      <i class="pi pi-search"></i>
      <input
          v-model="search"
          type="text"
          :placeholder="$t('alerts.search')"
          class="search-input"
      />
    </div>

    <div v-if="loading" class="loading">
      Cargando alertas...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else>
      <div v-for="alert in filteredAlerts" :key="alert.productName">
        <StockAlertCard :alert="alert" />
      </div>
    </div>
  </div>
</template>

<script>
import StockAlertCard from "../components/stockAlert-card.component.vue";
import NavbarComponent from "../../shared/navbar.component.vue";
import { useI18n } from 'vue-i18n';
import { useStockAlertService } from '../services/stockAlert-service';
import { onMounted, ref, computed } from 'vue';

export default {
  name: 'StockAlertView',
  components: { 
    StockAlertCard,
    NavbarComponent
  },

  setup() {
    const { locale } = useI18n();
    const stockAlertService = useStockAlertService();
    const search = ref('');
    const loading = ref(true);
    const error = ref(null);

    const fetchAlerts = async () => {
      try {
        loading.value = true;
        await stockAlertService.fetchAlerts();
        loading.value = false;
      } catch (err) {
        error.value = 'Error al cargar las alertas: ' + err.message;
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchAlerts();
    });

    const filteredAlerts = computed(() => {
      return stockAlertService.alerts.filter(alert =>
        alert.productName.toLowerCase().includes(search.value.toLowerCase())
      );
    });

    return {
      search,
      loading,
      error,
      filteredAlerts
    };
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

.search-input::placeholder {
  color: #555;
  opacity: 1;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.error {
  color: #dc3545;
}
</style>

<style>
body {
  background-color: #FFF5E0;
}
</style>

