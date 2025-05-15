<template>
  <div class="dashboard">
    <div class="dashboard-content">
      <div class="stats-container">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-shopping-bag"></i>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">{{ $t('dashboard.totalProducts') }}</h3>
            <p class="stat-value">500</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">
            <i class="pi pi-calendar"></i>
          </div>
          <div class="stat-info">
            <h3 class="stat-title">{{ $t('dashboard.providerDate') }}</h3>
            <p class="stat-value">00/00/00</p>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <button class="action-btn history-btn" @click="navigateTo('history')" :title="$t('dashboard.history')">
          <i class="pi pi-chart-line"></i> {{ $t('dashboard.history') }}
        </button>

        <button class="action-btn inventory-btn" @click="navigateTo('inventory')" :title="$t('dashboard.inventory')">
          <i class="pi pi-box"></i> {{ $t('dashboard.inventory') }}
        </button>
      </div>

      <hr class="divider" />

      <div class="bottom-actions">
        <button class="add-product-btn" @click="navigateTo('add-product')" :title="$t('dashboard.addProducts')">
          <i class="pi pi-plus"></i> {{ $t('dashboard.addProducts') }}
        </button>

        <button class="kits-btn" @click="navigateTo('kits')" :title="$t('dashboard.kits')">
          <i class="pi pi-shopping-cart"></i> {{ $t('dashboard.kits') }}
        </button>

        <button class="return-btn" @click="navigateTo('returns')" :title="$t('dashboard.returns')">
          <i class="pi pi-sync"></i> {{ $t('dashboard.returns') }}
        </button>
      </div>
    </div>
    
    <div class="expiring-products">
      <h2 class="section-title">{{ $t('dashboard.expirationTitle') }}</h2>

      <div class="product-cards">
        <div class="product-card" v-for="(product, index) in expiringProducts" :key="index">
          <div class="product-info">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-date">
              <i class="pi pi-calendar"></i> {{ product.expirationDate }}
            </p>
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
// Importación de PrimeIcons
import 'primeicons/primeicons.css'

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
  overflow: visible; /* quita overflow independiente para evitar barra vertical extra */
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
  transition: transform 0.2s, box-shadow 0.2s;
  justify-content: center;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  gap: 0.5rem;
  color: white;
  flex: 1;
  min-width: 180px;
  min-height: 45px;
  transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}

.action-btn:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.action-btn:hover:before {
  transform: translateX(0);
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.action-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.action-btn i {
  font-size: 1.2rem;
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
  border-left: 4px solid #c1121f;
  padding-left: 0.8rem;
}

.expiring-products {
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  margin-right: 1rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  max-width: 450px;
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
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border-color: #c1121f;
}

.product-card:hover .product-name {
  color: #c1121f;
}

.product-name {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0 0 0.5rem;
  color: #333;
  transition: color 0.2s;
}

.product-date {
  font-size: 1rem;
  margin: 0;
  color: #666;
  display: flex;
  align-items: center;
}

.product-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.product-stock {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: #BC162A;
}

.stock-count {
  font-weight: bold;
  font-size: 1.1rem;
}

.view-details-btn {
  background-color: transparent;
  border: none;
  color: #666;
  cursor: pointer;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s, color 0.2s;
}

.view-details-btn:hover {
  background-color: #f1f1f1;
  color: #c1121f;
}

.view-all-btn {
  width: 100%;
  padding: 0.8rem;
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  color: #666;
}

.view-all-btn:hover {
  background-color: #f1f1f1;
  color: #c1121f;
}

.bottom-actions {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
}

.add-product-btn, 
.kits-btn, 
.return-btn {
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 45px;
  transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}

.add-product-btn:before, 
.kits-btn:before, 
.return-btn:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.add-product-btn:hover:before, 
.kits-btn:hover:before, 
.return-btn:hover:before {
  transform: translateX(0);
}

.add-product-btn:hover, 
.kits-btn:hover, 
.return-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.add-product-btn:active, 
.kits-btn:active, 
.return-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.add-product-btn i,
.kits-btn i,
.return-btn i {
  font-size: 1.2rem;
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

/* Para agregar los iconos de PrimeIcons */
/* La importación global ya está en main.js: import 'primeicons/primeicons.css'; */

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
    gap: 2em;
  }
  
  .expiring-products {
    max-width: 100%;
    margin-right: 0;
  }
  
  .stats-container {
    flex-direction: column;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .stat-card {
    min-width: auto;
  }
  
  .action-btn {
    min-width: auto;
  }
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

.pi {
  font-family: 'primeicons';
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
</style>

