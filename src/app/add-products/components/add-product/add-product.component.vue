<template>
  <div class="add-product-container">
    <div v-if="!showInventoryForm">
      <h2>{{ $t('addProduct.title') }}</h2>

      <form @submit.prevent="handleSubmit" class="product-form">
        <div class="form-group">
          <label for="name">{{ $t('addProduct.labels.name') }}</label>
          <input
            id="name"
            type="text"
            v-model="productForm.name"
            class="form-input"
            required
          />
        </div>

        <div class="form-group">
          <label for="description">{{ $t('addProduct.labels.description') }}</label>
          <textarea
            id="description"
            v-model="productForm.description"
            class="form-textarea"
            rows="3"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="purchasePrice">{{ $t('addProduct.labels.buyPrice') }}</label>
            <div class="price-input">
              <span class="currency">S/.</span>
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
            <label for="salePrice">{{ $t('addProduct.labels.sellPrice') }}</label>
            <div class="price-input">
              <span class="currency">S/.</span>
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
            <label for="category">{{ $t('addProduct.labels.category') }}</label>
            <select 
              id="category"
              v-model.number="productForm.categoryId"
              class="form-select"
              required
            >
              <option value="">{{ $t('addProduct.labels.category') }}</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ $t(`categories.${category.name}`) }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="unit">{{ $t('addProduct.labels.unit') }}</label>
            <select
              id="unit"
              v-model="productForm.unitId"
              class="form-select"
              required
            >
              <option value="">{{ $t('addProduct.labels.unit') }}</option>
              <option v-for="unit in units" :key="unit.id" :value="unit.id">
                {{ unit.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>{{ $t('addProduct.labels.tags') }}</label>
          <div class="tags-container">
            <div 
              v-for="tag in availableTags" 
              :key="tag.id"
              :class="['tag', { selected: isTagSelected(tag.id) }]"
              @click="toggleTag(tag.id)"
            >
              {{ tag.name }}
            </div>
            <div v-if="availableTags.length === 0" class="no-tags">
              {{ $t('addProduct.noTags') }}
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="internalNotes">{{ $t('addProduct.labels.notes') }}</label>
          <textarea
            id="internalNotes"
            v-model="productForm.internalNotes"
            class="form-textarea"
            rows="2"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-save" :disabled="isSubmitting">
            {{ isSubmitting ? $t('common.saving') : $t('common.save') }}
          </button>
          <button type="button" class="btn-cancel" @click="$router.back()">
            {{ $t('common.cancel') }}
          </button>
        </div>
      </form>
    </div>

    <div v-if="showInventoryForm" class="inventory-form-container">
      <h3>{{ $t('inventory.title') }}</h3>
      
      <div class="product-summary">
        <div class="summary-grid">
          <div class="summary-item">
            <span class="summary-label">{{ $t('inventory.product') }}</span>
            <span class="summary-value">{{ createdProduct.name }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">{{ $t('inventory.category') }}</span>
            <span class="summary-value">{{ $t(`categories.${categories.find(c => c.id === createdProduct.categoryId)?.name}`) }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">{{ $t('inventory.price') }}</span>
            <span class="summary-value">${{ createdProduct.salePrice }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">{{ $t('inventory.unit') }}</span>
            <span class="summary-value">{{ units.find(u => u.id === createdProduct.unitId)?.name }}</span>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleInventorySubmit" class="inventory-form">
        <div class="form-group">
          <label for="stock">{{ $t('inventory.quantity') }}</label>
          <input 
            id="stock" 
            type="number" 
            min="0" 
            v-model.number="inventoryForm.stock" 
            class="form-input" 
            required 
          />
        </div>
        
        <div class="form-group">
          <label for="minStock">{{ $t('inventory.minStock') }}</label>
          <input 
            id="minStock" 
            type="number" 
            min="0" 
            v-model.number="inventoryForm.minStock" 
            class="form-input" 
            required 
          />
        </div>

        <button type="submit" class="btn-save">
          {{ $t('common.save') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ProductApiService from '../../services/product-api.service.js';
import AddInventoryComponent from './add-inventory.component.vue';
import InventoryApiService from '../../services/inventory-api.service.js';

export default {
  name: 'AddProductComponent',
  components: {
    AddInventoryComponent
  },
  setup() {
    const router = useRouter();
    const { t } = useI18n();
    const isSubmitting = ref(false);
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
      { id: 1, name: 'beverages' },
      { id: 2, name: 'dairy' },
      { id: 3, name: 'bakery' },
      { id: 4, name: 'meat' },
      { id: 5, name: 'produce' },
      { id: 6, name: 'groceries' },
      { id: 7, name: 'cleaning' },
      { id: 8, name: 'hygiene' },
      { id: 9, name: 'frozen' },
      { id: 10, name: 'snacks' }
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

    const isTagSelected = (tagId) => {
      return productForm.value.tagIds.includes(tagId);
    };

    const toggleTag = (tagId) => {
      if (isTagSelected(tagId)) {
        productForm.value.tagIds = productForm.value.tagIds.filter(id => id !== tagId);
      } else {
        productForm.value.tagIds.push(tagId);
      }
    };

    const inventoryForm = ref({ stock: 0, minStock: 0 });

    onMounted(async () => {
      await Promise.all([loadUnits(), loadTags()]);
    });

    const handleSubmit = async () => {
      if (!productForm.value.categoryId || !productForm.value.unitId) {
        alert(t('addProduct.validationError'));
        return;
      }

      isSubmitting.value = true;
      try {
        // Solo los campos del Swagger
        const productToSend = {
          name: productForm.value.name,
          description: productForm.value.description,
          purchasePrice: productForm.value.purchasePrice,
          salePrice: productForm.value.salePrice,
          internalNotes: productForm.value.internalNotes,
          categoryId: productForm.value.categoryId,
          unitId: productForm.value.unitId,
          tagIds: productForm.value.tagIds
        };
        const created = await ProductApiService.createProduct(productToSend);
        createdProduct.value = { ...created };
        showInventoryForm.value = true;
      } catch (error) {
        alert(t('addProduct.saveError'));
        console.error('Error al guardar producto:', error);
      } finally {
        isSubmitting.value = false;
      }
    };

    const handleInventorySubmit = async () => {
      try {
        const categoryName = t(`categories.${categories.value.find(c => c.id === createdProduct.value.categoryId)?.name}`);
        const unitName = units.value.find(u => u.id === createdProduct.value.unitId)?.name;

        if (!categoryName || !unitName) {
          throw new Error('Categoría o unidad de medida no encontrada');
        }

        const inventoryData = {
          categoria: categoryName,
          producto: createdProduct.value.name,
          quantity: inventoryForm.value.stock,
          price: createdProduct.value.salePrice,
          minStock: inventoryForm.value.minStock,
          unitName: unitName
        };

        await InventoryApiService.createInventory(inventoryData);
        router.push('/inventory');
      } catch (error) {
        console.error('Error al guardar inventario:', error);
        alert('Error al guardar el inventario: ' + error.message);
      }
    };

    return {
      productForm,
      categories,
      units,
      availableTags,
      isSubmitting,
      showInventoryForm,
      createdProduct,
      isTagSelected,
      toggleTag,
      handleSubmit,
      inventoryForm,
      handleInventorySubmit
    };
  }
};
</script>

<style scoped>
.add-product-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.product-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
  outline: none;
}

.price-input {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 8px;
  color: #666;
  z-index: 1;
}

.form-input.price {
  padding-left: 28px !important;
  width: 100%;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tag {
  padding: 6px 12px;
  border-radius: 16px;
  background-color: #f0f0f0;
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

.no-tags {
  color: #666;
  font-style: italic;
  padding: 0.5rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-save,
.btn-cancel {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save {
  background: #4CAF50;
  color: white;
  border: none;
}

.btn-save:hover:not(:disabled) {
  background: #43A047;
}

.btn-save:disabled {
  background: #9E9E9E;
  cursor: not-allowed;
}

.btn-cancel {
  background: white;
  color: #666;
  border: 1px solid #ddd;
}

.btn-cancel:hover {
  background: #f5f5f5;
}

.loading-text {
  display: block;
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.25rem;
}

.is-loading {
  opacity: 0.7;
  pointer-events: none;
}

.inventory-form-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 20px;
}

.product-summary {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 24px;
}

.product-summary h4 {
  color: #2c3e50;
  margin-bottom: 16px;
  font-size: 1.1em;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.summary-item {
  display: flex;
  flex-direction: column;
}

.summary-label {
  font-size: 0.9em;
  color: #6c757d;
  margin-bottom: 4px;
}

.summary-value {
  font-weight: 500;
  color: #2c3e50;
}

.inventory-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 8px;
  color: #495057;
}

.form-group input {
  padding: 8px 18px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1em;
}

.btn-save {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 20px;
  width: 100%;
  transition: background-color 0.2s;
}

.btn-save:hover {
  background-color: #218838;
}
</style>