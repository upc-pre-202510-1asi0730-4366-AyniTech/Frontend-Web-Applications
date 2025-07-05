<template>
  <div class="add-product-container">
    <div class="form-header">
      <h1 class="page-title">Añadir Producto</h1>
    </div>

    <form @submit.prevent="saveProduct" class="product-form">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          id="name"
          type="text"
          v-model="product.name"
          class="form-input"
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea
          id="description"
          v-model="product.description"
          class="form-textarea"
          rows="3"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group half-width">
          <label for="purchasePrice">Precio de compra</label>
          <div class="price-input">
            <span class="currency">$</span>
            <input
              id="purchasePrice"
              type="number"
              step="0.01"
              min="0"
              v-model.number="product.purchasePrice"
              class="form-input price"
              required
            />
          </div>
        </div>

        <div class="form-group half-width">
          <label for="salePrice">Precio de venta</label>
          <div class="price-input">
            <span class="currency">$</span>
            <input
              id="salePrice"
              type="number"
              step="0.01"
              min="0"
              v-model.number="product.salePrice"
              class="form-input price"
              required
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="category">Categoría</label>
        <div class="custom-select">
          <select 
            id="category"
            v-model="product.categoryId"
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
        <label for="unit">Unidad de medida</label>
        <div class="custom-select">
          <select 
            id="unit"
            v-model="product.unitId"
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
          v-model="product.internalNotes"
          class="form-textarea"
          rows="2"
        ></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="save-button" :disabled="isSubmitting">
          {{ isSubmitting ? 'Guardando...' : 'Guardar Producto' }}
        </button>
        <button type="button" class="cancel-button" @click="$router.back()">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import ProductApiService from '../../services/product-api.service.js';

export default {
  name: 'AddProduct',
  setup() {
    const router = useRouter();
    const isSubmitting = ref(false);
    const selectedTags = ref([]);
    
    const product = reactive({
      name: '',
      description: '',
      purchasePrice: null,
      salePrice: null,
      categoryId: '',
      unitId: '',
      internalNotes: '',
      tagIds: []
    });

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
    ]);

    const units = ref([]);
    const availableTags = ref([]);

    const loadUnits = async () => {
      try {
        const response = await ProductApiService.getUnits();
        units.value = response.data;
      } catch (error) {
        console.error('Error al cargar unidades:', error);
      }
    };

    const loadTags = async () => {
      try {
        const response = await ProductApiService.getTags();
        availableTags.value = response.data;
      } catch (error) {
        console.error('Error al cargar etiquetas:', error);
      }
    };

    const getTagName = (tagId) => {
      const tag = availableTags.value.find(t => t.id === tagId);
      return tag ? tag.name : '';
    };

    const toggleTag = (tagId) => {
      const index = selectedTags.value.indexOf(tagId);
      if (index === -1) {
        selectedTags.value.push(tagId);
      } else {
        selectedTags.value.splice(index, 1);
      }
    };

    const removeTag = (tagId) => {
      selectedTags.value = selectedTags.value.filter(id => id !== tagId);
    };

    watch(selectedTags, (newTags) => {
      product.tagIds = [...newTags];
    });

    const saveProduct = async () => {
      if (!product.categoryId || !product.unitId) {
        alert('Por favor selecciona una categoría y una unidad de medida');
        return;
      }

      try {
        isSubmitting.value = true;
        await ProductApiService.createProduct(product);
        router.push('/inventory');
      } catch (error) {
        console.error('Error al guardar el producto:', error);
        alert('Error al guardar el producto. Por favor intenta de nuevo.');
      } finally {
        isSubmitting.value = false;
      }
    };

    onMounted(() => {
      loadUnits();
      loadTags();
    });

    return {
      product,
      categories,
      units,
      availableTags,
      selectedTags,
      isSubmitting,
      getTagName,
      removeTag,
      toggleTag,
      saveProduct
    };
  }
};
</script>

<style scoped>
.add-product-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #FFF5E0;
  min-height: calc(100vh - 64px);
}

.form-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  color: #333;
  margin: 0;
}

.product-form {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.half-width {
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
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  appearance: none;
  cursor: pointer;
}

.form-select:focus {
  outline: none;
  border-color: #BC162A;
  box-shadow: 0 0 0 3px rgba(188, 22, 42, 0.1);
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

.form-select[multiple] {
  height: auto;
  min-height: 150px;
  padding: 0.5rem;
}

.form-select[multiple] option {
  padding: 0.75rem;
  margin: 2px 0;
  border-radius: 4px;
  cursor: pointer;
}

.form-select[multiple] option:hover {
  background-color: #f8f9fa;
}

.form-select[multiple] option:checked {
  background: #BC162A;
  color: white;
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

.save-button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.cancel-button {
  background: #e2e8f0;
  color: #4a5568;
}

.cancel-button:hover {
  background: #cbd5e0;
}

.helper-text {
  display: block;
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .add-product-container {
    padding: 1rem;
  }

  .form-row {
    flex-direction: column;
  }

  .half-width {
    width: 100%;
  }

  .form-actions {
    flex-direction: column;
  }

  .save-button,
  .cancel-button {
    width: 100%;
  }

  .tags-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
</style>