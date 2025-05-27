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
                v-model="product.buyPrice"
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
                v-model="product.sellPrice"
                class="form-input price"
                placeholder="00.00"
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="quantity">{{ $t('addProduct.labels.quantity') }}</label>
        <select
            id="quantity"
            v-model="product.quantity"
            class="form-select"
            required
        >
          <option value="">{{ $t('addProduct.selectQuantity') }}</option>
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
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
            type="text"
            v-model="product.expiryDate"
            :placeholder="$t('addProduct.datePlaceholder')"
            class="form-input"
            pattern="\d{2}/\d{2}/\d{4}"
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
        buyPrice: '',
        sellPrice: '',
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

      // Aquí normalmente harías la llamada al servicio para guardar
      console.log('Saving product:', this.product);

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
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 6rem;
  background-color: #FFF5E0;
  overflow-y: auto;
  font-family: 'Arial', sans-serif;
  box-sizing: border-box;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 2px solid #ddd;
  padding-bottom: 1rem;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.product-form {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  box-sizing: border-box;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: #f97316;
  box-shadow: 0 0 0 2px rgba(249, 115, 22, 0.1);
}

.form-row {
  display: flex;
  gap: 1rem;
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
  font-weight: bold;
  z-index: 1;
}

.form-input.price {
  padding-left: 2rem;
}

.tags-section {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  background: #f9f9f9;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #f97316;
  color: white;
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
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0;
  margin: 0;
}

.add-tag-button {
  background: white;
  color: #f97316;
  border: 2px dashed #f97316;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.add-tag-button:hover {
  background: #f97316;
  color: white;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.save-button {
  width: 100%;
  background: #c41e3a;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
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
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.5rem;
}

.modal-header h3 {
  margin: 0;
  color: #333;
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
}

.tag-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag-option {
  background: #f0f0f0;
  border: 2px solid #ddd;
  border-radius: 20px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.tag-option:hover {
  background: #e0e0e0;
}

.tag-option.selected {
  background: #f97316;
  color: white;
  border-color: #f97316;
}

.custom-tag-section {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.custom-tag-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.add-custom-tag {
  background: #4ade80;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  white-space: nowrap;
}

.add-custom-tag:hover {
  background: #22c55e;
}

@media (max-width: 768px) {
  .add-product-container {
    padding: 1rem;
  }

  .product-form {
    padding: 1rem;
  }

  .form-row {
    flex-direction: column;
  }

  .half-width {
    width: 100%;
  }
}
</style>