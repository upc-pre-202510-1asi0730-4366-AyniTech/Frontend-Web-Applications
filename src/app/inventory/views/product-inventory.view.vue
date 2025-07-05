<script setup>
import { ref, onMounted } from 'vue'
import { fetchProducts } from '../services/product-api.service'
import ProductCard from '../components/product-card.component.vue'
import ProductApiService from '../../add-products/services/product-api.service'

const products = ref([])
const viewMode = ref('table')
const showAddForm = ref(false)
const selectedTags = ref([])
const categories = ref([
  { id: 1, name: 'Bebidas' },
  { id: 2, name: 'Lácteos' },
  { id: 3, name: 'Panadería' },
  { id: 4, name: 'Carnes' },
  { id: 5, name: 'Frutas y Verduras' },
  { id: 6, name: 'Abarrotes' },
  { id: 7, name: 'Limpieza' },
  { id: 8, name: 'Higiene Personal' },
  { id: 9, name: 'Congelados' },
  { id: 10, name: 'Snacks' }
])
const units = ref([])
const availableTags = ref([])

const newProduct = ref({
  name: '',
  description: '',
  purchasePrice: null,
  salePrice: null,
  categoryId: '',
  unitId: '',
  internalNotes: '',
  tagIds: []
})

const loadUnits = async () => {
  try {
    const response = await ProductApiService.getUnits()
    units.value = response.data
  } catch (error) {
    console.error('Error al cargar unidades:', error)
  }
}

const loadTags = async () => {
  try {
    const response = await ProductApiService.getTags()
    availableTags.value = response.data
  } catch (error) {
    console.error('Error al cargar etiquetas:', error)
  }
}

const getTagName = (tagId) => {
  const tag = availableTags.value.find(t => t.id === tagId)
  return tag ? tag.name : ''
}

const toggleTag = (tagId) => {
  const index = selectedTags.value.indexOf(tagId)
  if (index === -1) {
    selectedTags.value.push(tagId)
  } else {
    selectedTags.value.splice(index, 1)
  }
  newProduct.value.tagIds = [...selectedTags.value]
}

const removeTag = (tagId) => {
  selectedTags.value = selectedTags.value.filter(id => id !== tagId)
  newProduct.value.tagIds = [...selectedTags.value]
}

const handleAddProduct = async () => {
  try {
    await ProductApiService.createProduct(newProduct.value)
    showAddForm.value = false
    // Recargar productos
    products.value = await fetchProducts()
  } catch (error) {
    console.error('Error al guardar el producto:', error)
    alert('Error al guardar el producto. Por favor intenta de nuevo.')
  }
}

onMounted(async () => {
  products.value = await fetchProducts()
  loadUnits()
  loadTags()
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

    <!-- Modal de Añadir Producto -->
    <div v-if="showAddForm" class="modal-overlay">
      <div class="modal-window">
        <h2>Añadir Producto</h2>
        <form @submit.prevent="handleAddProduct" class="form-content">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input
              id="name"
              type="text"
              v-model="newProduct.name"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label for="description">Descripción</label>
            <textarea
              id="description"
              v-model="newProduct.description"
              class="form-textarea"
              rows="3"
            ></textarea>
          </div>

          <div class="form-row">
            <div class="form-group half">
              <label for="purchasePrice">Precio de compra</label>
              <div class="price-input">
                <span class="currency">$</span>
                <input
                  id="purchasePrice"
                  type="number"
                  step="0.01"
                  min="0"
                  v-model.number="newProduct.purchasePrice"
                  class="form-input price"
                  required
                />
              </div>
            </div>

            <div class="form-group half">
              <label for="salePrice">Precio de venta</label>
              <div class="price-input">
                <span class="currency">$</span>
                <input
                  id="salePrice"
                  type="number"
                  step="0.01"
                  min="0"
                  v-model.number="newProduct.salePrice"
                  class="form-input price"
                  required
                />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Categoría</label>
            <div class="custom-select">
              <select 
                v-model="newProduct.categoryId"
                class="form-select"
                required
              >
                <option value="" disabled selected>Selecciona una categoría</option>
                <option 
                  v-for="category in categories" 
                  :key="category.id" 
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Unidad de medida</label>
            <div class="custom-select">
              <select 
                v-model="newProduct.unitId"
                class="form-select"
                required
              >
                <option value="" disabled selected>Selecciona una unidad</option>
                <option 
                  v-for="unit in units" 
                  :key="unit.id" 
                  :value="unit.id"
                >
                  {{ unit.name }} ({{ unit.abbreviation }})
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>Etiquetas</label>
            <div class="tags-container">
              <div class="tags-grid">
                <div
                  v-for="tag in availableTags"
                  :key="tag.id"
                  class="tag-option"
                  :class="{ 'selected': selectedTags.includes(tag.id) }"
                  @click="toggleTag(tag.id)"
                >
                  {{ tag.name }}
                </div>
              </div>
              <div class="selected-tags" v-if="selectedTags.length > 0">
                <p class="selected-label">Etiquetas seleccionadas:</p>
                <div class="selected-tags-grid">
                  <span 
                    v-for="tagId in selectedTags" 
                    :key="tagId" 
                    class="tag-badge"
                  >
                    {{ getTagName(tagId) }}
                    <button 
                      type="button" 
                      class="remove-tag" 
                      @click.stop="removeTag(tagId)"
                    >
                      ×
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="internalNotes">Notas internas</label>
            <textarea
              id="internalNotes"
              v-model="newProduct.internalNotes"
              class="form-textarea"
              rows="2"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="save-button">
              Guardar Producto
            </button>
            <button type="button" class="cancel-button" @click="showAddForm = false">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.inventory-product {
  font-family: Arial, sans-serif;
  background-color: #FFF5E0;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

h2 {
  margin: 0 0 1rem 0;
  color: #333;
  text-align: center;
}

.toolbar-background {
  background-color: #F4A460;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.toolbar {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
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
  margin-top: 1rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  width: 100%;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr) 120px;
  gap: 0.5rem;
  align-items: center;
  padding: 0.75rem 1rem;
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
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.form-content {
  padding: 2rem;
  border-radius: 12px;
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
  margin-bottom: 0.75rem;
  color: #333;
  font-weight: 500;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s;
  background-color: white;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #BC162A;
  box-shadow: 0 0 0 3px rgba(188, 22, 42, 0.1);
}

.custom-select {
  position: relative;
  width: 100%;
}

.form-select {
  appearance: none;
  padding-right: 2.5rem;
}

.custom-select::after {
  content: '';
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #666;
  pointer-events: none;
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

.price {
  padding-left: 1.75rem;
}

.tags-container {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
}

.tags-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.tag-option {
  background: #f8f9fa;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.75rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;
}

.tag-option:hover {
  border-color: #BC162A;
  background: #FFF5F5;
}

.tag-option.selected {
  background: #BC162A;
  color: white;
  border-color: #BC162A;
}

.selected-label {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.selected-tags-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-badge {
  background: #f3f4f6;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remove-tag {
  background: none;
  border: none;
  color: #666;
  font-size: 1.25rem;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: all 0.2s;
}

.remove-tag:hover {
  background: #e2e8f0;
  color: #BC162A;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.save-button,
.cancel-button {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.save-button {
  background: #BC162A;
  color: white;
}

.save-button:hover {
  background: #a01223;
}

.cancel-button {
  background: #e2e8f0;
  color: #4a5568;
}

.cancel-button:hover {
  background: #cbd5e0;
}

@media (max-width: 768px) {
  .modal-window {
    padding: 1rem;
    width: 95%;
  }

  .form-row {
    flex-direction: column;
  }

  .tags-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .form-actions {
    flex-direction: column;
  }

  .save-button,
  .cancel-button {
    width: 100%;
  }
}
</style>
