<template>
  <div class="product-list-container">
    <div class="header-section">
      <h1 class="page-title">{{ $t('products.title') }}</h1>
      <button
          class="add-button"
          @click="goToAddProduct"
      >
        +
      </button>
    </div>

    <div class="search-section">
      <div class="search-container">
        <i class="search-icon">🔍</i>
        <input
            type="text"
            :placeholder="$t('products.searchPlaceholder')"
            v-model="searchTerm"
            class="search-input"
        />
      </div>
      <button class="filter-button">
        <i class="filter-icon">⚙️</i>
        {{ $t('products.filter') }}
      </button>
    </div>

    <div class="products-grid">
      <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
      >
        <div class="product-header">
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="stock-info">
            <i class="stock-icon">🛒</i>
            <span>{{ product.stock }} {{ $t('products.stock') }}</span>
          </div>
        </div>

        <div class="product-body">
          <div class="product-category">
            <span class="category-tag">{{ product.category }}</span>
            <button class="add-icon" @click="addToCart(product)">+</button>
          </div>

          <button
              class="detail-button"
              @click="openEditModal(product)"
          >
            + {{ $t('products.detail') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de edición -->
    <div v-if="showEditModal" class="modal-overlay" @click="closeEditModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>{{ editingProduct.name }}</h2>
          <button class="edit-icon" @click="toggleEdit">✏️</button>
        </div>

        <form @submit.prevent="saveProduct" class="modal-form">
          <div class="form-group">
            <label>{{ $t('products.labels.label') }}</label>
            <div class="tags-container">
              <span
                  v-for="tag in editingProduct.tags"
                  :key="tag"
                  class="tag"
              >
                {{ tag }}
              </span>
              <select v-model="selectedTag" class="tag-select">
                <option value="">{{ $t('products.selectTag') }}</option>
                <option value="Dulce">{{ $t('products.tags.sweet') }}</option>
                <option value="Rellenas">{{ $t('products.tags.filled') }}</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label>{{ $t('products.labels.quantity') }}</label>
            <input
                type="number"
                v-model="editingProduct.quantity"
                :disabled="!isEditing"
                class="form-input"
            />
          </div>

          <div class="form-group">
            <label>{{ $t('products.labels.date') }}</label>
            <input
                type="text"
                v-model="editingProduct.expiryDate"
                :placeholder="$t('products.datePlaceholder')"
                :disabled="!isEditing"
                class="form-input"
            />
          </div>

          <div class="form-group">
            <label>{{ $t('products.labels.notes') }}</label>
            <textarea
                v-model="editingProduct.notes"
                :disabled="!isEditing"
                class="form-textarea"
            ></textarea>
          </div>

          <div class="modal-actions">
            <button
                type="button"
                class="duplicate-button"
                @click="duplicateProduct"
            >
              {{ $t('products.actions.duplicate') }}
            </button>
            <button
                type="button"
                class="delete-button"
                @click="deleteProduct"
            >
              {{ $t('products.actions.delete') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      searchTerm: '',
      showEditModal: false,
      isEditing: false,
      selectedTag: '',
      editingProduct: {},
      products: [
        {
          id: 1,
          name: 'Galleta',
          category: 'Golosina',
          stock: 20,
          quantity: 50,
          expiryDate: '25/12/2024',
          notes: '',
          tags: ['Dulce', 'Rellenas']
        },
        {
          id: 2,
          name: 'Galleta',
          category: 'Golosina',
          stock: 20,
          quantity: 30,
          expiryDate: '20/01/2025',
          notes: '',
          tags: ['Dulce']
        },
        {
          id: 3,
          name: 'Galleta',
          category: 'Golosina',
          stock: 20,
          quantity: 40,
          expiryDate: '15/02/2025',
          notes: '',
          tags: ['Rellenas']
        }
      ]
    }
  },
  computed: {
    filteredProducts() {
      if (!this.searchTerm) return this.products;
      return this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  methods: {
    goToAddProduct() {
      this.$router.push('/add-product');
    },
    openEditModal(product) {
      this.editingProduct = { ...product };
      this.showEditModal = true;
      this.isEditing = false;
    },
    closeEditModal() {
      this.showEditModal = false;
      this.isEditing = false;
      this.selectedTag = '';
    },
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },
    addToCart(product) {
      console.log('Added to cart:', product);
    },
    saveProduct() {
      // Lógica para guardar el producto
      console.log('Saving product:', this.editingProduct);
      this.closeEditModal();
    },
    duplicateProduct() {
      // Lógica para duplicar el producto
      console.log('Duplicating product:', this.editingProduct);
    },
    deleteProduct() {
      // Lógica para eliminar el producto
      console.log('Deleting product:', this.editingProduct);
      this.closeEditModal();
    }
  }
}
</script>

<style scoped>
.product-list-container {
  padding: 2.5rem;
  background-color: #FFF5E0;
  width: 60vw;
  height: 100vh;
  overflow-y: auto;
  font-family: 'Arial', sans-serif;
  flex: 2;
}

.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.add-button {
  background: #c41e3a;
  color: white;
  border: none;
  border-radius: 8px;
  width: 50px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-button:hover {
  background: #a01729;
}

.search-section {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  align-items: center;
}

.search-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
}

.search-icon {
  margin-right: 0.5rem;
  color: #666;
}

.search-input {
  border: none;
  outline: none;
  flex: 1;
  font-size: 1rem;
}

.filter-button {
  background: #666;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;
}

.filter-button:hover {
  background: #555;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem; /* Asegurar espacio al final */
}

.product-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 2px solid #f0b27a;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.product-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.stock-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
}

.product-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-category {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.category-tag {
  background: #e8f4f8;
  color: #2c5282;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.add-icon {
  background: #4ade80;
  color: white;
  border: none;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail-button {
  background: #f97316;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.detail-button:hover {
  background: #ea580c;
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
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.modal-header h2 {
  margin: 0;
  color: #333;
}

.edit-icon {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: bold;
  color: #333;
}

.form-input, .form-textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.form-input:disabled, .form-textarea:disabled {
  background: #f5f5f5;
  color: #666;
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.tag {
  background: #f97316;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.tag-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.duplicate-button {
  flex: 1;
  background: white;
  color: #c41e3a;
  border: 2px solid #c41e3a;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.duplicate-button:hover {
  background: #c41e3a;
  color: white;
}

.delete-button {
  flex: 1;
  background: #c41e3a;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background: #a01729;
}

/* Responsive */
@media (max-width: 768px) {
  .product-list-container {
    padding: 1rem;
  }

  .search-section {
    flex-direction: column;
    gap: 0.5rem;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>