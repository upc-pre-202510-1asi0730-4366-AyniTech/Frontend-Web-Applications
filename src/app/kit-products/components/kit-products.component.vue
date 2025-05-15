<template>
  <div class="combine-products">
    <h1 class="page-title">Combinar Productos en Kits</h1>

    <div class="search-bar">
      <div class="search-input">
        <i class="pi pi-search search-icon"></i>
        <input type="text" placeholder="Buscar Productos" />
      </div>
      <Button class="kit-select-btn" label="Selecionar para kit" />
    </div>

    <div class="products-container">
      <h2 class="section-title">Productos existentes</h2>

      <div class="products-table">
        <div class="table-header">
          <div class="header-producto">Producto</div>
          <div class="header-precio">Precio</div>
          <div class="header-inventario">Inventario</div>
          <div class="header-anadir">Añadir</div>
        </div>

        <div v-for="(product, index) in products" :key="index" class="product-row">
          <div class="cell-producto">{{ product.name }}</div>
          <div class="cell-precio">{{ product.price }}</div>
          <div class="cell-inventario">{{ product.stock }}</div>
          <div class="cell-anadir">
            <button class="add-button">
              <i class="pi pi-plus"></i>
            </button>
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
  name: 'KitsProducts',
  components: {
    Button
  },
  data() {
    return {
      products: [
        { name: 'Golosina', price: 's/. 10', stock: '20 Stock' },
        { name: 'Golosina', price: 's/. 10', stock: '20 Stock' },
        { name: 'Golosina', price: 's/. 10', stock: '20 Stock' },
        { name: 'Golosina', price: 's/. 10', stock: '20 Stock' },
        { name: 'Golosina', price: 's/. 10', stock: '20 Stock' },
        { name: 'Golosina', price: 's/. 10', stock: '20 Stock' },
        { name: 'Golosina', price: 's/. 10', stock: '20 Stock' }
      ]
    }
  },
  methods: {
    addToKit(productIndex) {
      // Implementar la lógica para añadir al kit
      console.log('Añadir producto', this.products[productIndex]);
    }
  }
}
</script>

<style scoped>
.combine-products {
  padding: 2rem;
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

:deep(.kit-select-btn) {
  background-color: #BC162A;
  border-color: #BC162A;
  border-radius: 2rem;
  padding: 0.8rem 1.5rem;
  font-weight: 500;
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

.product-row {
  display: flex;
  padding: 0.8rem;
  border-bottom: 1px solid #eee;
  align-items: center;
}

.product-row:last-child {
  border-bottom: none;
}

.header-producto, .cell-producto {
  flex: 2;
}

.header-precio, .cell-precio,
.header-inventario, .cell-inventario,
.header-anadir, .cell-anadir {
  flex: 1;
  text-align: center;
}

.add-button {
  background-color: #E67E22;
  color: white;
  border: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-button:hover {
  background-color: #d35400;
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
</style>