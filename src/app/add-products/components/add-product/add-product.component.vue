<template>
  <div class="add-product-container">
    <div v-if="!showInventoryForm">
      <h2>Añadir Nuevo Producto</h2>
      
      <form @submit.prevent="handleSubmit" class="product-form">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input
            id="name"
            type="text"
            v-model="productForm.name"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea
            id="description"
            v-model="productForm.description"
            class="form-textarea"
            rows="3"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="purchasePrice">Precio de compra</label>
            <div class="price-input">
              <span class="currency">$</span>
              <input
                id="purchasePrice"
                type="number"
                step="0.01"
                min="0"
                v-model.number="productForm.purchasePrice"
                class="form-input price"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="salePrice">Precio de venta</label>
            <div class="price-input">
              <span class="currency">$</span>
              <input
                id="salePrice"
                type="number"
                step="0.01"
                min="0"
                v-model.number="productForm.salePrice"
                class="form-input price"
                required
              />
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="category">Categoría</label>
            <select 
              id="category"
              v-model="productForm.categoryId"
              class="form-select"
              required
            >
              <option value="">Selecciona una categoría</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="unit">Unidad de medida</label>
            <select
              id="unit"
              v-model="productForm.unitId"
              class="form-select"
              required
            >
              <option value="">Selecciona una unidad</option>
              <option v-for="unit in units" :key="unit.id" :value="unit.id">
                {{ unit.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Etiquetas</label>
          <div class="tags-container">
            <div 
              v-for="tag in availableTags" 
              :key="tag.id"
              :class="['tag', { selected: isTagSelected(tag.id) }]"
              @click="toggleTag(tag.id)"
            >
              {{ tag.name }}
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="internalNotes">Notas internas</label>
          <textarea
            id="internalNotes"
            v-model="productForm.internalNotes"
            class="form-textarea"
            rows="2"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-save" :disabled="isSubmitting">
            {{ isSubmitting ? 'Guardando...' : 'Guardar Producto' }}
          </button>
          <button type="button" class="btn-cancel" @click="$router.back()">Cancelar</button>
        </div>
      </form>
    </div>

    <AddInventoryComponent 
      v-if="showInventoryForm" 
      :productData="createdProduct"
      @skip="$router.push('/inventory')"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import ProductApiService from '../../services/product-api.service.js';
import AddInventoryComponent from './add-inventory.component.vue';

export default {
  name: 'AddProductComponent',
  components: {
    AddInventoryComponent
  },
  setup() {
    const router = useRouter();
    const isSubmitting = ref(false);
    const selectedTags = ref([]);
    const showInventoryForm = ref(false);
    const createdProduct = ref(null);
    
    const productForm = ref({
      name: '',
      description: '',
      purchasePrice: 0,
      salePrice: 0,
      internalNotes: '',
      categoryId: '',
      unitId: '',
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

    const isTagSelected = (tagId) => {
      return productForm.value.tagIds.includes(tagId);
    };

    const toggleTag = (tagId) => {
      if (isTagSelected(tagId)) {
        productForm.value.tagIds = productForm.value.tagIds.filter(id => id !== tagId);
      } else {
        productForm.value.tagIds = [...productForm.value.tagIds, tagId];
      }
    };

    const handleSubmit = async () => {
      if (!productForm.value.categoryId || !productForm.value.unitId) {
        alert('Por favor selecciona una categoría y una unidad de medida');
        return;
      }

      try {
        isSubmitting.value = true;
        const response = await ProductApiService.createProduct(productForm.value);
        
        // Encontrar la unidad seleccionada
        const selectedUnit = units.value.find(u => u.id === productForm.value.unitId);
        
        createdProduct.value = {
          id: response.id,
          name: response.name || productForm.value.name,
          categoryName: categories.value.find(c => c.id === productForm.value.categoryId)?.name || '',
          unitId: response.unitId || productForm.value.unitId,
          unitName: selectedUnit ? selectedUnit.abbreviation : '', // Usamos la abreviación de la unidad
          salePrice: response.salePrice || productForm.value.salePrice
        };
        
        console.log('Producto creado:', createdProduct.value);
        showInventoryForm.value = true;
      } catch (error) {
        console.error('Error al crear producto:', error);
        alert('Error al crear el producto. Por favor intenta de nuevo.');
      } finally {
        isSubmitting.value = false;
      }
    };

    onMounted(async () => {
      await Promise.all([
        loadUnits(),
        loadTags()
      ]);
    });

    return {
      productForm,
      handleSubmit,
      showInventoryForm,
      createdProduct,
      categories,
      units,
      availableTags,
      isSubmitting,
      getTagName,
      isTagSelected,
      toggleTag
    };
  }
};
</script>

<style scoped>
.add-product-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.product-form {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.price-input {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 12px;
  color: #666;
}

.price {
  padding-left: 24px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 44px;
}

.tag {
  padding: 4px 12px;
  background-color: #f0f0f0;
  border-radius: 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.tag:hover {
  background-color: #e0e0e0;
}

.tag.selected {
  background-color: #4CAF50;
  color: white;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn-save,
.btn-cancel {
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.btn-save:hover {
  background-color: #45a049;
}

.btn-save:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
  border: none;
}

.btn-cancel:hover {
  background-color: #da190b;
}
</style>