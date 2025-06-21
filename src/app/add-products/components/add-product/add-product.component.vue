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
            @input="validateName"
            class="form-input"
            :class="{ 'error': nameError }"
            required
        />
        <span v-if="nameError" class="error-message">{{ nameError }}</span>
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
                min="0"
                v-model.number="product.buyPrice"
                class="form-input price"
                :class="{ 'error': buyPriceError }"
                placeholder="00.00"
            />
          </div>
          <span v-if="buyPriceError" class="error-message">{{ buyPriceError }}</span>
        </div>

        <div class="form-group half-width">
          <label for="sellPrice">{{ $t('addProduct.labels.sellPrice') }}</label>
          <div class="price-input">
            <span class="currency">$</span>
            <input
                id="sellPrice"
                type="number"
                step="0.01"
                min="0"
                v-model.number="product.sellPrice"
                class="form-input price"
                :class="{ 'error': sellPriceError }"
                placeholder="00.00"
            />
          </div>
          <span v-if="sellPriceError" class="error-message">{{ sellPriceError }}</span>
        </div>
      </div>

      <div class="form-group">
        <label for="quantity">{{ $t('addProduct.labels.quantity') }}</label>
        <input
            id="quantity"
            type="number"
            min="1"
            v-model.number="product.quantity"
            class="form-input"
            :class="{ 'error': quantityError }"
            required
        />
        <span v-if="quantityError" class="error-message">{{ quantityError }}</span>
      </div>

      <div class="form-group">
        <label for="batch">{{ $t('addProduct.labels.batch') }}</label>
        <select
            id="batch"
            v-model="product.batch"
            class="form-select"
            :class="{ 'error': batchError }"
        >
          <option value="">{{ $t('addProduct.selectBatch') }}</option>
          <option value="LOTE001">LOTE001</option>
          <option value="LOTE002">LOTE002</option>
          <option value="LOTE003">LOTE003</option>
        </select>
        <span v-if="batchError" class="error-message">{{ batchError }}</span>
      </div>

      <div class="form-group">
        <label for="expiryDate">{{ $t('addProduct.labels.expiryDate') }}</label>
        <input
            id="expiryDate"
            type="date"
            v-model="product.expiryDate"
            class="form-input"
            :class="{ 'error': expiryDateError }"
        />
        <span v-if="expiryDateError" class="error-message">{{ expiryDateError }}</span>
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

      <button type="submit" class="save-button" :disabled="isSubmitting">
        {{ isSubmitting ? 'Guardando...' : $t('addProduct.save') }}
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
import ProductApiService from '../../services/product-api.service.js';

export default {
  name: 'AddProduct',
  data() {
    return {
      showTagModal: false,
      customTag: '',
      isSubmitting: false,
      nameError: '',
      buyPriceError: '',
      sellPriceError: '',
      quantityError: '',
      batchError: '',
      expiryDateError: '',
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
    validateName() {
      const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
      if (!this.product.name.trim()) {
        this.nameError = 'El nombre es requerido';
      } else if (!nameRegex.test(this.product.name)) {
        this.nameError = 'El nombre solo puede contener letras y espacios';
      } else if (this.product.name.length < 3) {
        this.nameError = 'El nombre debe tener al menos 3 caracteres';
      } else {
        this.nameError = '';
      }
    },
    validatePrices() {
      this.buyPriceError = '';
      this.sellPriceError = '';
      
      if (this.product.buyPrice !== null && this.product.buyPrice < 0) {
        this.buyPriceError = 'El precio de compra no puede ser negativo';
      }
      
      if (this.product.sellPrice !== null && this.product.sellPrice < 0) {
        this.sellPriceError = 'El precio de venta no puede ser negativo';
      }
      
      if (this.product.buyPrice !== null && this.product.sellPrice !== null) {
        if (this.product.sellPrice <= this.product.buyPrice) {
          this.sellPriceError = 'El precio de venta debe ser mayor al precio de compra';
        }
      }
    },
    validateQuantity() {
      if (!this.product.quantity || this.product.quantity <= 0) {
        this.quantityError = 'La cantidad debe ser mayor a 0';
      } else if (!Number.isInteger(this.product.quantity)) {
        this.quantityError = 'La cantidad debe ser un número entero';
      } else {
        this.quantityError = '';
      }
    },
    validateBatch() {
      if (!this.product.batch) {
        this.batchError = 'Debe seleccionar un lote';
      } else {
        this.batchError = '';
      }
    },
    validateExpiryDate() {
      if (this.product.expiryDate) {
        const today = new Date();
        const expiryDate = new Date(this.product.expiryDate);
        if (expiryDate <= today) {
          this.expiryDateError = 'La fecha de vencimiento debe ser futura';
        } else {
          this.expiryDateError = '';
        }
      } else {
        this.expiryDateError = '';
      }
    },
    validateForm() {
      this.validateName();
      this.validatePrices();
      this.validateQuantity();
      this.validateBatch();
      this.validateExpiryDate();
      
      return !this.nameError && !this.buyPriceError && !this.sellPriceError && 
             !this.quantityError && !this.batchError && !this.expiryDateError;
    },
    async saveProduct() {
      if (!this.validateForm()) {
        alert('Por favor, corrija los errores en el formulario');
        return;
      }

      if (this.product.tags.length === 0) {
        alert('Debe agregar al menos una etiqueta');
        return;
      }

      this.isSubmitting = true;

      try {
        const productData = {
          name: this.product.name.trim(),
          category: 'Golosina',
          stock: this.product.quantity,
          quantity: this.product.quantity,
          buyPrice: this.product.buyPrice,
          sellPrice: this.product.sellPrice,
          batch: this.product.batch,
          expiryDate: this.product.expiryDate,
          notes: this.product.notes.trim(),
          tags: this.product.tags
        };

        await ProductApiService.createProduct(productData);
        
        alert('Producto guardado exitosamente');
        this.$router.push('/products');
      } catch (error) {
        console.error('Error al guardar producto:', error);
        alert('Error al guardar el producto. Por favor, intente nuevamente.');
      } finally {
        this.isSubmitting = false;
      }
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
  },
  watch: {
    'product.buyPrice'() {
      this.validatePrices();
    },
    'product.sellPrice'() {
      this.validatePrices();
    },
    'product.quantity'() {
      this.validateQuantity();
    },
    'product.batch'() {
      this.validateBatch();
    },
    'product.expiryDate'() {
      this.validateExpiryDate();
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

/* Error Styles */
.form-input.error, .form-select.error {
  border-color: #dc2626;
  box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.save-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.save-button:disabled:hover {
  background: #9ca3af;
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