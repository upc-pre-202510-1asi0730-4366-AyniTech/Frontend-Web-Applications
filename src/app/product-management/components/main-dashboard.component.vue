<template>
  <div class="dashboard">
    <div class="dashboard-content">
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-store"></i>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">Total Productos</h3>
            <p class="stat-value">500</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="fas fa-calendar"></i>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">Fecha Provedor</h3>
            <p class="stat-value">00/00/00</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="action-btn history-btn">
          <i class="fas fa-chart-line"></i>
          <span>Historial Movimientos</span>
        </button>

        <button class="action-btn inventory-btn">
          <i class="fas fa-box"></i>
          <span>Inventario</span>
        </button>
      </div>

      <hr class="divider" />

      <div class="expiring-products">
        <h2 class="section-title">Proximos a Caducar</h2>
        
        <div class="product-cards">
          <div class="product-card">
            <div class="product-info">
              <h3 class="product-name">Leche</h3>
              <p class="product-date">15/05/2024</p>
            </div>
            <div class="product-stock">
              <i class="fas fa-shopping-basket"></i> Stock
              <span class="stock-count">5</span>
            </div>
          </div>

          <div class="product-card">
            <div class="product-info">
              <h3 class="product-name">Pan Integral</h3>
              <p class="product-date">20/03/2024</p>
            </div>
            <div class="product-stock">
              <i class="fas fa-shopping-basket"></i> Stock
              <span class="stock-count">10</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bottom-actions">
        <button class="add-product-btn">
          <i class="fas fa-plus"></i> Agregar Productos
        </button>

        <button class="kits-btn">
          <i class="fas fa-shopping-cart"></i> Kits Productos
        </button>

        <button class="return-btn">
          Devolución de productos
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainDashboard',
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
  font-family: 'Arial', sans-serif;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #FFF5E0;
}

.dashboard-content {
  padding: 2rem;
  flex: 1;
  width: 100%;
  box-sizing: border-box;
}

.stats-container {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  flex: 1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  font-size: 2rem;
  margin-right: 1rem;
  color: #333;
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
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  gap: 0.75rem;
  color: white;
}

.history-btn {
  background-color: #c1121f;
}

.inventory-btn {
  background-color: #c1121f;
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
  gap: 1rem;
}

.product-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
  gap: 1rem;
  margin-top: 2rem;
}

.add-product-btn, .kits-btn, .return-btn {
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
}

.add-product-btn {
  background-color: #c1121f;
  color: white;
}

.kits-btn {
  background-color: #e67e22;
  color: white;
}

.return-btn {
  background-color: #e67e22;
  color: white;
}

/* Para agregar los iconos de Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style>
