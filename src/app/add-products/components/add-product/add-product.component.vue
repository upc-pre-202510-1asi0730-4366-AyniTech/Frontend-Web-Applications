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
            <label for="category">{{ $t('history.card.category') }}</label>
            <select 
              id="category"
              v-model="productForm.categoryId"
              class="form-select"
            required
            >
              <option value="">{{ $t('common.select') }}</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
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
              <option value="">{{ $t('common.select') }}</option>
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
import { ref, reactive, onMounted, watch } from 'vue';
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
      { id: 1, name: t('categories.beverages') },
      { id: 2, name: t('categories.dairy') },
      { id: 3, name: t('categories.bakery') },
      { id: 4, name: t('categories.meat') },
      { id: 5, name: t('categories.produce') },
      { id: 6, name: t('categories.groceries') },
      { id: 7, name: t('categories.cleaning') },
      { id: 8, name: t('categories.hygiene') },
      { id: 9, name: t('categories.frozen') },
      { id: 10, name: t('categories.snacks') }
    ]);

    const units = ref([]);
    const availableTags = ref([]);

    const loadUnits = async () => {
      try {
        const response = await ProductApiService.getUnits();
        units.value = response.data;
      } catch (error) {
        console.error('Error loading units:', error);
      }
    };

    const loadTags = async () => {
      try {
        const response = await ProductApiService.getTags();
        availableTags.value = response.data;
      } catch (error) {
        console.error('Error loading tags:', error);
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
        alert(t('addProduct.validationError'));
        return;
      }

      try {
        isSubmitting.value = true;
        const response = await ProductApiService.createProduct(productForm.value);
        
        const selectedUnit = units.value.find(u => u.id === productForm.value.unitId);
        
        createdProduct.value = {
          id: response.id,
          name: response.name || productForm.value.name,
          categoryName: categories.value.find(c => c.id === productForm.value.categoryId)?.name || '',
          unitId: response.unitId || productForm.value.unitId,
          unitName: selectedUnit ? selectedUnit.abbreviation : '',
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

    onMounted(async () => {
      await Promise.all([
        loadUnits(),
        loadTags()
      ]);
    });

    return {
      productForm,
      categories,
      units,
      availableTags,
      isSubmitting,
      showInventoryForm,
      createdProduct,
      handleSubmit,
      isTagSelected,
      toggleTag,
      getTagName
    };
  }
};
</script>

<style scoped>
.add-product-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 5em;
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