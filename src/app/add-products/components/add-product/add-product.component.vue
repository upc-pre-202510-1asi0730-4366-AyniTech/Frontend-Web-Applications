<template>
  <div class="add-product-container">
    <div class="form-header">
      <h1 class="page-title">{{ $t('addProduct.title') }}</h1>
    </div>

    <form @submit.prevent="saveProduct" class="product-form">
      <div class="form-group">
        <label for="productName">{{ $t('addProduct.labels.name') }}</label>
        <input
            id="productName"
            type="text"
            v-model="product.name"
            class="form-input"
            required
        />
      </div>

      <div class="form-group">
        <label>{{ $t('addProduct.labels.tags') }}</label>
        <div class="tags-section">
          <div class="selected-tags">
            <span
                v-for="(tag, index) in product.tags"
                :key="index"
                class="tag"
            >
              {{ tag }}
              <button
                  type="button"
                  @click="removeTag(index)"
                  class="remove-tag"
              >
                ×
              </button>
            </span>
          </div>
          <button
              type="button"
              @click="showTagModal = true"
              class="add-tag-button"
          >
            + {{ $t('addProduct.addTag') }}
          </button>
        </div>
      </div>

      <div class="form-row">
        <div class="form-group half-width">
          <label for="buyPrice">{{ $t('addProduct.labels.buyPrice') }}</label>
          <div class="price-input">
            <span class="currency">$</span>
            <input
                id="buyPrice"
                type="number"
                step="0.01"
                v-model.number="product.buyPrice"
                class="form-input price"
                placeholder="00.00"
            />
          </div>
        </div>

        <div class="form-group half-width">
          <label for="sellPrice">{{ $t('addProduct.labels.sellPrice') }}</label>
          <div class="price-input">
            <span class="currency">$</span>
            <input
                id="sellPrice"
                type="number"
                step="0.01"
                v-model.number="product.sellPrice"
                class="form-input price"
                placeholder="00.00"
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="quantity">{{ $t('addProduct.labels.quantity') }}</label>
        <input
            id="quantity"
            type="number"
            v-model.number="product.quantity"
            class="form-input"
            required
        />
      </div>

      <div class="form-group">
        <label for="batch">{{ $t('addProduct.labels.batch') }}</label>
        <select
            id="batch"
            v-model="product.batch"
            class="form-select"
        >
          <option value="">{{ $t('addProduct.selectBatch') }}</option>
          <option value="LOTE001">LOTE001</option>
          <option value="LOTE002">LOTE002</option>
          <option value="LOTE003">LOTE003</option>
        </select>
      </div>

      <div class="form-group">
        <label for="expiryDate">{{ $t('addProduct.labels.expiryDate') }}</label>
        <input
            id="expiryDate"
            type="date"
            v-model="product.expiryDate"
            class="form-input"
        />
      </div>

      <div class="form-group">
        <label for="notes">{{ $t('addProduct.labels.notes') }}</label>
        <textarea
            id="notes"
            v-model="product.notes"
            class="form-textarea"
            rows="4"
        ></textarea>
      </div>

      <button type="submit" class="save-button">
        {{ $t('addProduct.save') }}
      </button>
    </form>

    <!-- Modal para agregar etiquetas -->
    <div v-if="showTagModal" class="modal-overlay" @click="closeTagModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ $t('addProduct.selectTag') }}</h3>
          <button type="button" @click="closeTagModal" class="close-button">×</button>
        </div>

        <div class="tag-options">
          <button
              v-for="tag in availableTags"
              :key="tag.key"
              type="button"
              @click="addTag(tag.key)"
              class="tag-option"
              :class="{ 'selected': product.tags.includes(tag.key) }"
          >
            {{ $t(`addProduct.tags.${tag.key}`) }}
          </button>
        </div>

        <div class="custom-tag-section">
          <input
              type="text"
              v-model="customTag"
              :placeholder="$t('addProduct.customTagPlaceholder')"
              class="custom-tag-input"
              @keyup.enter="addCustomTag"
          />
          <button
              type="button"
              @click="addCustomTag"
              class="add-custom-tag"
          >
            {{ $t('addProduct.add') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data() {
    return {
      showTagModal: false,
      customTag: '',
      product: {
        name: '',
        tags: [],
        buyPrice: null,
        sellPrice: null,
        quantity: '',
        batch: '',
        expiryDate: '',
        notes: ''
      },
      availableTags: [
        { key: 'sweet', value: 'Dulce' },
        { key: 'salty', value: 'Salado' },
        { key: 'filled', value: 'Rellenas' },
        { key: 'chocolate', value: 'Chocolate' },
        { key: 'vanilla', value: 'Vainilla' },
        { key: 'cookies', value: 'Galletas' }
      ]
    }
  },
  methods: {
    saveProduct() {
      // Validación básica
      if (!this.product.name || !this.product.quantity) {
        alert(this.$t('addProduct.validationError'));
        return;
      }

      // Get products from localStorage
      let products = JSON.parse(localStorage.getItem('products')) || [];

      // Create new product
      const newProduct = {
        id: Date.now(), // Simple way to generate a unique ID
        name: this.product.name,
        category: 'Golosina', // Hardcoding for now as it's not in the form
        stock: this.product.quantity,
        quantity: this.product.quantity,
        expiryDate: this.product.expiryDate,
        notes: this.product.notes,
        tags: this.product.tags,
      };

      // Add new product and save back to localStorage
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));

      // Simular guardado exitoso
      alert(this.$t('addProduct.saveSuccess'));

      // Regresar a la lista de productos
      this.$router.push('/products');
    },
    addTag(tagKey) {
      if (!this.product.tags.includes(tagKey)) {
        this.product.tags.push(tagKey);
      }
      this.closeTagModal();
    },
    addCustomTag() {
      if (this.customTag.trim() && !this.product.tags.includes(this.customTag.trim())) {
        this.product.tags.push(this.customTag.trim());
        this.customTag = '';
        this.closeTagModal();
      }
    },
    removeTag(index) {
      this.product.tags.splice(index, 1);
    },
    closeTagModal() {
      this.showTagModal = false;
      this.customTag = '';
    }
  }
}
</script>

<style scoped>
/* Asegurar que el fondo cubra toda la página */
.add-product-container {
  padding: 2rem;
  background-color: white;
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
}

.form-header {
  text-align: left;
  margin-bottom: 2rem;
  border-bottom: 2px solid #f97316;
  padding-bottom: 1rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.product-form {
  max-width: 800px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
  background-color: white;
  color: #333;
  color-scheme: light;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.1);
}

.form-row {
  display: flex;
  gap: 2rem;
}

.half-width {
  flex: 1;
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

.form-input.price {
  padding-left: 2rem;
}

.tags-section {
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 1rem;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #FEF3C7;
  color: #92400E;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.remove-tag {
  background: none;
  border: none;
  color: #92400E;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0;
  margin: 0;
}

.add-tag-button {
  background: none;
  color: #007bff;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
  padding: 0;
}

.add-tag-button:hover {
  color: #0056b3;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.save-button {
  display: block;
  width: auto;
  min-width: 200px;
  background: #c41e3a;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 2rem auto 0 auto;
}

.save-button:hover {
  background: #a01729;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  width: 90%;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: none;
  padding-bottom: 0;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag-option {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
  color: #9ca3af;
}

.tag-option:hover {
  background: #e5e7eb;
}

.tag-option.selected {
  background: #f97316;
  color: white;
  border-color: #f97316;
}

.custom-tag-section {
  display: flex;
  gap: 0.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.custom-tag-input {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: #4b5563;
  color: white;
}

.custom-tag-input::placeholder {
  color: #d1d5db;
}

.add-custom-tag {
  background: #34d399;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
  font-weight: bold;
}

.add-custom-tag:hover {
  background: #10b981;
}

@media (max-width: 768px) {
  .add-product-container {
    padding: 1rem;
  }

  .product-form {
    padding: 0;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .form-row {
    flex-direction: column;
    gap: 1.5rem;
  }

  .half-width {
    width: 100%;
  }

  .save-button {
    width: 100%;
  }
}
</style>