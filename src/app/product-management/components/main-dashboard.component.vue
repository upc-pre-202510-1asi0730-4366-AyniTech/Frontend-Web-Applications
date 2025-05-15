<template>
  <div class="dashboard">
    <div class="dashboard-content">
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-shopping-bag"></i>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">Total Productos</h3>
            <p class="stat-value">500</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-calendar"></i>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">Fecha Provedor</h3>
            <p class="stat-value">00/00/00</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <Button class="action-btn history-btn" label="Historial Movimientos" icon="pi pi-chart-line" />
        <Button class="action-btn inventory-btn" label="Inventario" icon="pi pi-box" />
      </div>

      <hr class="divider" />

      <div class="bottom-actions">
        <Button class="add-product-btn" label="Agregar Productos" icon="pi pi-plus" />
        <Button class="kits-btn" label="Kits Productos" icon="pi pi-shopping-cart" />
        <Button class="return-btn" label="Devolución de productos" icon="pi pi-sync" />
      </div>
    </div>
    
    <div class="expiring-products">
      <h2 class="section-title">Proximos a Caducar</h2>

      <div class="product-cards">
        <div class="product-card">
          <div class="product-info">
            <h3 class="product-name">Leche</h3>
            <p class="product-date"><i class="pi pi-calendar"></i> 15/05/2024</p>
          </div>
          <div class="product-stock">
            <i class="pi pi-shopping-cart"></i> Stock
            <span class="stock-count">5</span>
          </div>
        </div>

        <div class="product-card">
          <div class="product-info">
            <h3 class="product-name">Pan Integral</h3>
            <p class="product-date"><i class="pi pi-calendar"></i> 20/03/2024</p>
          </div>
          <div class="product-stock">
            <i class="pi pi-shopping-cart"></i> Stock
            <span class="stock-count">10</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import 'primeicons/primeicons.css';
import Button from 'primevue/button';

export default {
  name: 'MainDashboard',
  components: {
    Button
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.dashboard {
  padding: 3em 0 0 0;
  font-family: 'Arial', sans-serif;
  width: 100%;
  display: flex;
  gap: 8em;
  flex-direction: row;
  background-color: #FFF5E0;
  position: relative;
}

.dashboard-content {
  padding: 1rem;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  overflow: visible;
}

.stats-container {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  flex: 1;
  min-width: 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 60px;
  height: 60px;
  margin-right: 1.5rem;
  border-radius: 50%;
  background-color: rgba(188, 22, 42, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon i {
  font-size: 1.8rem;
  color: #BC162A;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-title {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  color: #666;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0.5rem 0 0;
  color: #333;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

:deep(.action-btn) {
  flex: 1;
  min-width: 180px;
  min-height: 45px;
  border-radius: 8px;
}

:deep(.history-btn) {
  background-color: #c1121f;
  border-color: #c1121f;
}

:deep(.inventory-btn) {
  background-color: #c1121f;
  border-color: #c1121f;
}

.divider {
  margin: 2rem 0;
  border: none;
  height: 1px;
  background-color: #ddd;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.product-cards {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  width: 100%;
}

.product-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  width: 100%;
  box-sizing: border-box;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 0.5rem;
  color: #333;
}

.product-date {
  font-size: 1rem;
  margin: 0;
  color: #666;
}

.product-stock {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.stock-count {
  font-weight: bold;
  font-size: 1.1rem;
}

.bottom-actions {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
}

:deep(.add-product-btn) {
  background-color: #c1121f;
  border-color: #c1121f;
  width: 100%;
}

:deep(.kits-btn) {
  background-color: #e67e22;
  border-color: #e67e22;
  width: 100%;
}

:deep(.return-btn) {
  background-color: #e67e22;
  border-color: #e67e22;
  width: 100%;
}

.product-date i {
  margin-right: 0.5rem;
  font-size: 1rem;
  color: #BC162A;
}

.product-stock i {
  font-size: 1rem;
  margin-right: 0.3rem;
  color: #BC162A;
}

@media (max-width: 768px) {
  .stats-container {
    flex-direction: column;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .stat-card {
    min-width: auto;
  }
  
  :deep(.action-btn) {
    min-width: auto;
  }
  
  .dashboard {
    flex-direction: column;
    gap: 2em;
  }
}
</style>

