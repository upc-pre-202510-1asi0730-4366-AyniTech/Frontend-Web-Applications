<script setup>
import { ref, onMounted } from 'vue'
import { fetchProducts } from '../services/product-api.service'
import ProductCard from '../components/product-card.component.vue'
import NewProduct from '../models/NewProduct.entity.js'

const products = ref([])
const viewMode = ref('table')
const showAddForm = ref(false)
const newProduct = ref(new NewProduct({}))

onMounted(async () => {
  products.value = await fetchProducts()
})

const handleAddProduct = () => {

  console.log('Nuevo producto:', newProduct.value)
  showAddForm.value = false
}
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
        <button class="btn-generate" @click="showAddForm = true">
          Generar Nuevo Producto
        </button>
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
              <i class="fas fa-edit"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showAddForm" class="modal-overlay">
      <div class="modal-window">
        <h2>Agregar Producto</h2>

        <div class="form-content">
          <div class="form-group">
            <label>Nombre</label>
            <input
                type="text"
                v-model="newProduct.nombre"
                class="form-input"
                placeholder="Nombre del producto"
            >
          </div>

          <div class="form-group">
            <label>Etiquetas</label>
            <div class="tags-container">
              <div class="tag">Golosina</div>
              <div class="tag">Golosina</div>
              <button class="add-tag-btn">+ Añadir</button>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group half">
              <label>Precio de compra</label>
              <div class="price-input">
                <span class="currency">$</span>
                <input
                    type="number"
                    v-model="newProduct.precioCompra"
                    class="form-input"
                    value="00.00"
                >
              </div>
            </div>

            <div class="form-group half">
              <label>Precio de venta</label>
              <div class="price-input">
                <span class="currency">$</span>
                <input
                    type="number"
                    v-model="newProduct.precioVenta"
                    class="form-input"
                    value="00.00"
                >
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Cantidad</label>
            <input
                type="number"
                v-model="newProduct.cantidad"
                class="form-input"
            >
          </div>

          <div class="form-group">
            <label>Lote</label>
            <select v-model="newProduct.lote" class="form-input">
              <option value="">Seleccionar lote</option>
            </select>
          </div>

          <div class="form-group">
            <label>Fecha de caducidad</label>
            <input
                type="date"
                v-model="newProduct.fechaCaducidad"
                class="form-input"
                placeholder="DD/MM/AAAA"
            >
          </div>

          <div class="form-group">
            <label>Nota</label>
            <textarea
                v-model="newProduct.nota"
                class="form-input"
                rows="3"
            ></textarea>
          </div>

          <div class="form-actions">
            <button class="save-button" @click="handleAddProduct">Guardar</button>
            <button class="cancel-button" @click="showAddForm = false">Cancelar</button>
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
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-window {
  background: #FFF5E0;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.form-content {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.half {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

.tag {
  background: #F4A460;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
}

.add-tag-btn {
  background: none;
  border: none;
  color: #F4A460;
  cursor: pointer;
}

.price-input {
  position: relative;
}

.currency {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.price-input .form-input {
  padding-left: 2rem;
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.save-button, .cancel-button {
  padding: 0.75rem 3rem;
  border-radius: 24px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.save-button {
  background: #dc3545;
  color: white;
}

.cancel-button {
  background: #6c757d;
  color: white;
}

.save-button:hover {
  background: #c82333;
}

.cancel-button:hover {
  background: #5a6268;
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .modal-window {
    padding: 1rem;
    width: 95%;
  }
}
</style>
