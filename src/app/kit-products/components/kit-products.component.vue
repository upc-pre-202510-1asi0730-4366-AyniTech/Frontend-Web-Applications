<template>
  <div class="combine-products">
    <h1 class="page-title">{{ $t('kits.title') }}</h1>

    <div class="search-bar">
      <div class="search-input">
        <i class="pi pi-search search-icon"></i>
        <input type="text" :placeholder="$t('kits.searchPlaceholder')" />
      </div>
      <Button class="kit-select-btn" :label="$t('kits.selectForKit')" @click="registerKit" />
    </div>

    <div class="products-container">
      <h2 class="section-title">{{ $t('kits.existingProducts') }}</h2>

      <div class="products-table">
        <div class="table-header">
          <div class="header-producto">{{ $t('kits.product') }}</div>
          <div class="header-precio">{{ $t('kits.price') }}</div>
          <div class="header-inventario">{{ $t('kits.inventory') }}</div>
          <div class="header-anadir">{{ $t('kits.add') }}</div>
        </div>

        <div v-for="(product, index) in products" :key="index" 
          class="product-row"
          :class="{ 'selected-row': isSelected(product) }"
        >
          <div class="cell-producto left-align">{{ product.name }}</div>
          <div class="cell-precio">{{ product.price }}</div>
          <div class="cell-inventario">{{ product.stock }}</div>
          <div class="add-cell">
            <button class="add-button" @click="addToKit(product)">+</button>
          </div>
        </div>
      </div>
    </div>

    <template v-if="showSuccess">
      <div class="success-message">
        Kit registrado exitosamente
      </div>
    </template>
  </div>
</template>

<script>
import 'primeicons/primeicons.css';
import Button from 'primevue/button';

export default {
  name: 'KitsProducts',
  components: {
    Button
  },
  data() {
    return {
      products: [
        {name: 'Golosina', price: 's/. 10', stock: '20 Stock'},
        {name: 'Golosina', price: 's/. 10', stock: '20 Stock'},
        {name: 'Golosina', price: 's/. 10', stock: '20 Stock'},
        {name: 'Golosina', price: 's/. 10', stock: '20 Stock'},
        {name: 'Golosina', price: 's/. 10', stock: '20 Stock'},
        {name: 'Golosina', price: 's/. 10', stock: '20 Stock'},
        {name: 'Golosina', price: 's/. 10', stock: '20 Stock'}
      ],
      selectedProducts: [],
      showSuccess: false
    }
  },
  methods: {
    addToKit(product) {
      const index = this.selectedProducts.indexOf(product);
      if (index === -1) {
        this.selectedProducts.push(product);
      } else {
        this.selectedProducts.splice(index, 1);
      }
    },
    isSelected(product) {
      return this.selectedProducts.indexOf(product) !== -1;
    },
    registerKit() {
      this.showSuccess = true;
      setTimeout(() => { this.showSuccess = false; }, 2000);
    }
  }
}
</script>

<style scoped>
.combine-products {
  padding: 2rem;
  padding-top: calc(70px + 2rem); /* Espacio para el navbar fijo */
  font-family: 'Arial', sans-serif;
  background-color: #FFF5E0;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.page-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  flex: 1;
  position: relative;
  max-width: 600px;
}

.search-input input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 2rem;
  font-size: 1rem;
  background-color: #fff;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.products-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
}

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
}

.table-header {
  display: flex;
  background-color: #E67E22;
  color: white;
  font-weight: bold;
  padding: 0.8rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.header-producto, .cell-producto {
  flex: 2;
  text-align: left;
  padding-left: 1rem;
}

.header-precio, .cell-precio,
.header-inventario, .cell-inventario,
.header-anadir, .add-cell {
  flex: 1;
  text-align: center;
}

.product-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
  min-height: 48px;
}

.product-row > div {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.add-cell {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-button {
  background-color: #E67E22;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #d35400;
}

.selected-row {
  background-color: #D9D593 !important;
}

:deep(.kit-select-btn) {
  background-color: #BC162A;
  border-color: #BC162A;
  border-radius: 2rem;
  padding: 0.8rem 1.5rem;
  font-weight: 500;
  color: #fff !important;
}

.success-message {
  position: fixed;
  top: 90px;
  right: 40px;
  background: #388e3c;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  transition: opacity 0.3s;
}

@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input {
    max-width: 100%;
    margin-bottom: 1rem;
  }

  .table-header, .product-row {
    font-size: 0.9rem;
  }
}

.left-align {
  text-align: left !important;
  justify-content: flex-start !important;
}
</style>