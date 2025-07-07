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
            :placeholder="$t('addProduct.placeholders.description')"
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="purchasePrice">{{ $t('addProduct.labels.buyPrice') }}</label>
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
            <label for="salePrice">{{ $t('addProduct.labels.sellPrice') }}</label>
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
            <label for="category">{{ $t('addProduct.labels.category') }}</label>
            <select 
              id="category"
              v-model="productForm.categoryId"
              class="form-select"
              required
            >
              <option value="">{{ $t('addProduct.placeholders.selectCategory') }}</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ $t(`categories.${category.name}`) }}
              </option>
            </select>
            <span v-if="isLoadingCategories" class="loading-text">{{ $t('addProduct.loading.categories') }}</span>
          </div>

          <div class="form-group">
            <label for="unit">{{ $t('addProduct.labels.unit') }}</label>
            <select
              id="unit"
              v-model="productForm.unitId"
              class="form-select"
              required
              :disabled="isLoadingUnits"
            >
              <option value="">{{ $t('addProduct.placeholders.selectUnit') }}</option>
              <option v-for="unit in units" :key="unit.id" :value="unit.id">
                {{ unit.name }}
              </option>
            </select>
            <span v-if="isLoadingUnits" class="loading-text">{{ $t('addProduct.loading.units') }}</span>
          </div>
        </div>

        <div class="form-group">
          <label>{{ $t('addProduct.labels.tags') }}</label>
          <div class="tags-container" :class="{ 'is-loading': isLoadingTags }">
            <div 
              v-for="tag in availableTags" 
              :key="tag.id"
              :class="['tag', { selected: isTagSelected(tag.id) }]"
              @click="toggleTag(tag.id)"
            >
              {{ tag.name }}
            </div>
            <div v-if="availableTags.length === 0 && !isLoadingTags" class="no-tags">
              No hay etiquetas disponibles
            </div>
          </div>
          <span v-if="isLoadingTags" class="loading-text">{{ $t('addProduct.loading.tags') }}</span>
        </div>

        <div class="form-group">
          <label for="internalNotes">{{ $t('addProduct.labels.notes') }}</label>
          <textarea
            id="internalNotes"
            v-model="productForm.internalNotes"
            class="form-textarea"
            rows="2"
            :placeholder="$t('addProduct.placeholders.notes')"
          ></textarea>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-save" :disabled="isSubmitting || isLoading">
            {{ isSubmitting ? $t('common.saving') : $t('common.save') }}
          </button>
          <button type="button" class="btn-cancel" @click="$router.back()">{{ $t('common.cancel') }}</button>
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
import { ref, reactive, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import ProductApiService from '../../services/product-api.service.js';
import AddInventoryComponent from './add-inventory.component.vue';

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
    
    // Loading states
    const isLoadingUnits = ref(true);
    const isLoadingTags = ref(true);
    const isLoadingCategories = ref(false);
    
    const isLoading = computed(() => {
      return isLoadingUnits.value || isLoadingTags.value || isLoadingCategories.value;
    });
    
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
        units.value = response.data || [];
      } catch (error) {
        console.error('Error loading units:', error);
      } finally {
        isLoadingUnits.value = false;
      }
    };

    const loadTags = async () => {
      try {
        const response = await ProductApiService.getTags();
        availableTags.value = response.data || [];
      } catch (error) {
        console.error('Error loading tags:', error);
      } finally {
        isLoadingTags.value = false;
      }
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
        alert(t('addProduct.validationError'));
        return;
      }

      try {
        isSubmitting.value = true;
        const response = await ProductApiService.createProduct(productForm.value);
        
        const selectedUnit = units.value.find(u => u.id === productForm.value.unitId);
        const selectedCategory = categories.value.find(c => c.id === productForm.value.categoryId);
        
        createdProduct.value = {
          id: response.id,
          name: response.name || productForm.value.name,
          categoryName: selectedCategory ? t(`categories.${selectedCategory.name}`) : '',
          unitId: response.unitId || productForm.value.unitId,
          unitName: selectedUnit ? selectedUnit.name : '',
          salePrice: response.salePrice || productForm.value.salePrice
        };
        
        showInventoryForm.value = true;
      } catch (error) {
        console.error('Error creating product:', error);
        alert(t('addProduct.saveError'));
      } finally {
        isSubmitting.value = false;
      }
    };

    onMounted(() => {
      Promise.all([loadUnits(), loadTags()]).catch(error => {
        console.error('Error loading initial data:', error);
      });
    });

    return {
      productForm,
      categories,
      units,
      availableTags,
      isSubmitting,
      showInventoryForm,
      createdProduct,
      isLoadingUnits,
      isLoadingTags,
      isLoadingCategories,
      isLoading,
      isTagSelected,
      toggleTag,
      handleSubmit
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
  left: 0.75rem;
  color: #666;
}

.price {
  padding-left: 1.5rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 3rem;
}

.tag {
  padding: 0.5rem 1rem;
  background: #f5f5f5;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tag:hover {
  background: #e0e0e0;
}

.tag.selected {
  background: #4CAF50;
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
</style>