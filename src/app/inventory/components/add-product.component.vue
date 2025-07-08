<script setup>
import { ref, reactive, onMounted } from 'vue'
import NewProduct from '../models/NewProduct.entity.js'
import http from '../../shared/services/http.instance.js'
import ProductApiService from '../../add-products/services/product-api.service.js'

const product = reactive(new NewProduct())
const emit = defineEmits(['close', 'save'])
const newTag = ref('')
let nextTagId = 1

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

onMounted(async () => {
  try {
    const response = await ProductApiService.getUnits();
    units.value = response;
    const tagsResponse = await ProductApiService.getTags();
    availableTags.value = tagsResponse;
  } catch (error) {
    console.error('Error loading units or tags:', error);
  }
});

const availableTags = ref([])

const handleSubmit = async () => {
  try {
    const response = await http.post('/api/v1/products', {
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      salePrice: product.salePrice,
      internalNotes: product.internalNotes,
      categoryId: product.categoryId,
      unitId: product.unitId,
      tagIds: product.tagIds
    })
    console.log('Producto guardado:', response.data)
    resetForm()
    emit('save', product.toJSON())
  } catch (error) {
    console.error('Error al guardar el producto:', error)
  }
}

const resetForm = () => {
  Object.assign(product, new NewProduct())
  newTag.value = ''
}

const addTag = () => {
  if (newTag.value.trim()) {
    product.tags.push({
      id: nextTagId++,
      name: newTag.value.trim()
    })
    newTag.value = ''
  }
}

const removeTag = (tag) => {
  const index = product.tags.findIndex(t => t.id === tag.id)
  if (index > -1) {
    product.tags.splice(index, 1)
  }
}
</script>

<template>
  <div class="add-product-container">
    <h2>Agregar Producto</h2>
    <form @submit.prevent="handleSubmit" class="product-form">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input 
          id="name"
          v-model="product.name"
          type="text"
          required
          class="form-control"
          placeholder="Nombre del producto"
        />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea
          id="description"
          v-model="product.description"
          class="form-control"
          rows="3"
          placeholder="Descripción del producto"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group half">
          <label for="purchasePrice">Precio de compra ($)</label>
          <input
            id="purchasePrice"
            v-model.number="product.purchasePrice"
            type="number"
            step="0.01"
            min="0"
            required
            class="form-control"
          />
        </div>

        <div class="form-group half">
          <label for="salePrice">Precio de venta ($)</label>
          <input
            id="salePrice"
            v-model.number="product.salePrice"
            type="number"
            step="0.01"
            min="0"
            required
            class="form-control"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group half">
          <label for="stock">Stock actual</label>
          <input
            id="stock"
            v-model.number="product.stock"
            type="number"
            min="0"
            class="form-control"
            placeholder="Cantidad actual"
          />
        </div>

        <div class="form-group half">
          <label for="minStock">Stock mínimo</label>
          <input
            id="minStock"
            v-model.number="product.minStock"
            type="number"
            min="0"
            class="form-control"
            placeholder="Cantidad mínima"
          />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group half">
          <label for="categoryId">Categoría</label>
          <select
            id="categoryId"
            v-model.number="product.categoryId"
            required
            class="form-control"
          >
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="form-group half">
          <label for="unitId">Unidad de medida</label>
          <select
            id="unitId"
            v-model.number="product.unitId"
            required
            class="form-control"
          >
            <option v-for="unit in units" :key="unit.id" :value="unit.id">
              {{ unit.name }} ({{ unit.abbreviation }})
            </option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label for="expirationDate">Fecha de vencimiento</label>
        <input
          id="expirationDate"
          v-model="product.expirationDate"
          type="date"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="internalNotes">Notas internas</label>
        <textarea
          id="internalNotes"
          v-model="product.internalNotes"
          class="form-control"
          rows="2"
          placeholder="Notas adicionales sobre el producto"
        ></textarea>
      </div>

      <div class="form-group">
        <label>Etiquetas</label>
        <div class="tags-container">
          <div v-for="tag in availableTags" :key="tag.id" class="tag-option">
            <input
              type="checkbox"
              :id="'tag-' + tag.id"
              :value="tag.id"
              v-model="product.tagIds"
            />
            <label :for="'tag-' + tag.id">{{ tag.name }}</label>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn-save">Guardar</button>
        <button type="button" @click="resetForm" class="btn-cancel">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.add-product-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 5rem;
}

h2 {
  color: #2e2e2e;
  margin-bottom: 2rem;
}

.product-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.half {
  flex: 1;
  margin-bottom: 0;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #4a5568;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.1);
}

.tags-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
}

.tag-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
}

.tag-option input[type="checkbox"] {
  width: 16px;
  height: 16px;
}

.tag-option label {
  margin: 0;
  font-size: 0.9rem;
  color: #4a5568;
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-save {
  background: #bc162a;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-save:hover {
  background: #a01223;
}

.btn-cancel {
  background: #e2e8f0;
  color: #4a5568;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-cancel:hover {
  background: #cbd5e0;
}

@media (max-width: 640px) {
  .form-row {
    flex-direction: column;
  }

  .half {
    width: 100%;
  }

  .add-product-container {
    padding: 1rem;
  }

  .product-form {
    padding: 1rem;
  }
}
</style>