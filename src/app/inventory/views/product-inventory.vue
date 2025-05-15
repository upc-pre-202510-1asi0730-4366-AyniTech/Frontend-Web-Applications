<script setup>
import { ref, onMounted } from 'vue'
import { fetchProducts } from '../services/product-api.service'
import ProductCard from '../components/product-card.component.vue'
const products = ref([])

onMounted(async () => {
  products.value = await fetchProducts()
})
</script>

<template>
  <div class="inventory-product">

    <h2>Inventario por producto</h2>

    <div class="toolbar-background">
      <div class="toolbar">
        <input type="text" placeholder="Categoría..." class="search-input" />
        <input type="text" placeholder="Productos..." class="search-input" />
        <div class="date-container">
          <input type="date" class="date-input" />
          <button class="calendar-button">
            <i class="fas fa-calendar"></i>
          </button>
        </div>
        <input type="number" placeholder="Stock Mín" class="number-input" />
        <button class="btn-generate">Generar Nuevo Lote</button>
      </div>
    </div>

    <div class="product-table">
      <div class="table-row header">
        <div class="cell">Categoría</div>
        <div class="cell">Producto</div>
        <div class="cell">Fecha de entrada</div>
        <div class="cell">Cantidad por unidad</div>
        <div class="cell">Precio por unidad</div>
        <div class="cell">Stock Mínimo</div>
        <div class="cell">Unidad de medida</div>
        <div class="cell actions">Acciones</div>
      </div>

      <div v-for="product in products" :key="product.id" class="table-row-container">
        <div class="table-row data">
          <div class="cell">{{ product.categoria }}</div>
          <div class="cell">{{ product.nombre }}</div>
          <div class="cell">{{ product.fechaEntrada }}</div>
          <div class="cell">{{ product.cantidad }}</div>
          <div class="cell">S/{{ product.precio }}</div>
          <div class="cell">{{ product.stockMinimo }}</div>
          <div class="cell">{{ product.unidad }}</div>
          <div class="cell actions">
            <button class="action-button dark">
              <i class="fas fa-table"></i>
            </button>
            <button class="action-button dark">
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inventory-product {
  font-family: Arial, sans-serif;
  background-color: #FFF5E0;
  min-height: 100vh;
  padding: 1rem;
}



.toolbar-background {
  background-color: #F4A460;
  padding: 1rem;
  margin: 1rem -1rem;
  width: calc(100% + 2rem);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.toolbar {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 1rem;
}

.search-input, .number-input {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background: white;
  min-width: 150px;
  flex: 1;
}

.date-container {
  display: flex;
  align-items: center;
  background: white;
  border-radius: 4px;
  overflow: hidden;
  flex: 1;
  min-width: 150px;
}

.date-input {
  padding: 0.5rem;
  border: none;
  flex: 1;
  min-width: 120px;
}

.calendar-button {
  background: none;
  border: none;
  padding: 0.5rem;
  color: #666;
  cursor: pointer;
}

.btn-generate {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.product-table {
  margin-top: 2rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr) 120px;
  gap: 1rem;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  background: white;
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background: #fff9e6;
}


.table-row.header:hover {
  background: #f8f9fa;
}
.table-row:last-child {
  border-bottom: none;
}

.table-row.header {
  font-weight: 600;
  color: #333;
  background: #f8f9fa;
}

.cell {
  display: flex;
  align-items: center;
}

.actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

.action-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: #2D2D2D;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.action-button:hover {
  background: #1a1a1a;
}

@media (max-width: 1200px) {
  .product-table {
    margin: 1rem;
  }

  .table-row {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .table-row.header {
    display: none;
  }

  .cell {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }

  .cell:before {
    content: attr(data-label);
    font-weight: 600;
    margin-right: 1rem;
  }

  .actions {
    justify-content: flex-start;
    padding-top: 0.5rem;
  }
}

.action-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-button.dark {
  background-color: #2D2D2D;
  color: white;
}

.action-button.dark:hover {
  background-color: #1a1a1a;
}

@media (max-width: 1200px) {
  .product-table {
    margin: 1rem;
  }

  .table-row {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .search-input, .number-input, .date-container {
    width: 100%;
  }

  .btn-generate {
    width: 100%;
  }

  .table-row {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }

  .table-row.header {
    display: none;
  }

  .cell {
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
  }

  .cell:before {
    content: attr(data-label);
    font-weight: 600;
    margin-right: 1rem;
  }

  .actions {
    justify-content: flex-start;
    padding-top: 0.5rem;
  }
}
</style>