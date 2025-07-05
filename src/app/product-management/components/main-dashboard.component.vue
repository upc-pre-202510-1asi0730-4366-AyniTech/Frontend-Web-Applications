<template>
  <div class="dashboard-container">
    <div class="dashboard-content">
      <div class="welcome-section">
        <h1 class="welcome-title">Bienvenido de nuevo</h1>
        <p class="welcome-subtitle">{{ getWelcomeMessage() }}</p>
      </div>

      <div class="stats-section">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-box"></i>
          </div>
          <div class="stat-info">
            <h3>Total de Productos</h3>
            <p class="stat-value">{{ totalProducts }}</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-calendar"></i>
          </div>
          <div class="stat-info">
            <h3>Fecha de Proveedor</h3>
            <p class="stat-value">{{ providerDate || '00/00/00' }}</p>
          </div>
        </div>
      </div>

      <div class="actions-grid">
        <button class="action-btn primary" @click="navigateTo('history')">
          <i class="pi pi-chart-line"></i>
          <span>Historial</span>
        </button>

        <button class="action-btn primary" @click="navigateTo('inventory')">
          <i class="pi pi-box"></i>
          <span>Inventario</span>
        </button>

        <button class="action-btn primary" @click="navigateTo('add-product')">
          <i class="pi pi-plus"></i>
          <span>Añadir Productos</span>
        </button>

        <button class="action-btn secondary" @click="navigateTo('kits')">
          <i class="pi pi-shopping-cart"></i>
          <span>Kits</span>
        </button>

        <button class="action-btn secondary" @click="navigateTo('returns')">
          <i class="pi pi-sync"></i>
          <span>Devolución de productos</span>
        </button>
      </div>
    </div>

    <div class="alerts-section">
      <div class="alerts-container">
        <h2 class="alerts-title">
          <i class="pi pi-exclamation-triangle"></i>
          Próximos a Acabarse
        </h2>
        <div class="alerts-list">
          <div v-for="alert in lowStockProducts" 
               :key="alert.id" 
               class="alert-card">
            <div class="alert-info">
              <span class="product-name">{{ alert.productName }}</span>
              <span class="stock-info">
                <i class="pi pi-shopping-cart"></i>
                Stock: {{ alert.quantity }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStockAlertService } from '../../stock-alert/services/stockAlert-service';
import 'primeicons/primeicons.css';

export default {
  name: 'MainDashboard',
  setup() {
    const router = useRouter();
    const stockAlertService = useStockAlertService();
    const totalProducts = ref(0);
    const providerDate = ref(null);
    const lowStockProducts = ref([]);
    
    const getWelcomeMessage = () => {
      const hour = new Date().getHours();
      if (hour < 12) return 'Buenos días';
      if (hour < 18) return 'Buenas tardes';
      return 'Buenas noches';
    };
    
    const navigateTo = (route) => {
      router.push(`/${route}`);
    };
    
    const fetchLowStockProducts = async () => {
      try {
        await stockAlertService.fetchAlerts();
        lowStockProducts.value = stockAlertService.alerts;
      } catch (error) {
        console.error('Error fetching low stock products:', error);
      }
    };

    onMounted(() => {
      fetchLowStockProducts();
    });

    return {
      getWelcomeMessage,
      navigateTo,
      totalProducts,
      providerDate,
      lowStockProducts
    };
  }
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  gap: 2rem;
  padding: 5rem 4rem;
  min-height: calc(100vh - 64px);
  background-color: #FFF5E0;
}

.dashboard-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.welcome-section {
  margin-bottom: 1rem;
}

.welcome-title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.welcome-subtitle {
  font-size: 1.2rem;
  color: #666;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: #BC162A;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon i {
  font-size: 1.5rem;
  color: white;
}

.stat-info h3 {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
  font-weight: 500;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-btn {
  border: none;
  border-radius: 8px;
  padding: 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
  color: white;
}

.action-btn i {
  font-size: 1.5rem;
}

.action-btn.primary {
  background: #BC162A;
}

.action-btn.primary:hover {
  background: #a01223;
}

.action-btn.secondary {
  background: #E67E22;
}

.action-btn.secondary:hover {
  background: #d35400;
}

.alerts-section {
  width: 300px;
  min-width: 300px;
}

.alerts-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  position: sticky;
  top: 2rem;
}

.alerts-title {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alerts-title i {
  color: #BC162A;
}

.alerts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alert-card {
  padding: 1rem;
  border-radius: 8px;
  background: #f8f9fa;
  border: 1px solid #eee;
}

.alert-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.product-name {
  font-weight: 500;
  color: #333;
}

.stock-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #BC162A;
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .dashboard-container {
    flex-direction: column;
  }

  .alerts-section {
    width: 100%;
    min-width: auto;
  }

  .alerts-container {
    position: static;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding: 1rem;
  }

  .actions-grid {
    grid-template-columns: 1fr;
  }

  .welcome-title {
    font-size: 1.75rem;
  }
}
</style>

