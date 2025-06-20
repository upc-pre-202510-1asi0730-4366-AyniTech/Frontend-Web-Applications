<template>
  <div class="product-list-container">
    <div class="header-section">
      <h1 class="page-title">Agregar Producto</h1>
      <div class="actions-container">
        <button
            class="add-button"
            @click="goToAddProduct"
        >
          +
        </button>
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
          <i class="filter-icon">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 12H11V10H7V12ZM0 0V2H18V0H0ZM3 7H15V5H3V7Z" fill="#4B5563"/>
            </svg>
          </i>
          <span>{{ $t('products.filter') }}</span>
        </button>
      </div>
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
            <i class="stock-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6" stroke="#4B5563" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </i>
            <span>{{ product.stock }} {{ $t('products.stock') }}</span>
          </div>
        </div>

        <div class="product-body">
          <div class="product-category">
            <span class="category-tag">
              {{ product.category }}
              <button class="add-icon" @click="addToCart(product)">+</button>
            </span>
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
              <select v-model="selectedTag" class="tag-select" :disabled="!isEditing">
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
                type="date"
                v-model="editingProduct.expiryDate"
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
                type="submit"
                class="save-button"
                v-if="isEditing"
            >
              Guardar Cambios
            </button>
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
      products: []
    }
  },
  created() {
    this.loadProducts();
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
    loadProducts() {
      const initialProducts = [
        {
          id: 1,
          name: 'Galleta',
          category: 'Golosina',
          stock: 20,
          quantity: 50,
          expiryDate: '2024-12-25',
          notes: '',
          tags: ['Dulce', 'Rellenas']
        },
        {
          id: 2,
          name: 'Galleta',
          category: 'Golosina',
          stock: 20,
          quantity: 30,
          expiryDate: '2025-01-20',
          notes: '',
          tags: ['Dulce']
        },
        {
          id: 3,
          name: 'Galleta',
          category: 'Golosina',
          stock: 20,
          quantity: 40,
          expiryDate: '2025-02-15',
          notes: '',
          tags: ['Rellenas']
        }
      ];

      let products = JSON.parse(localStorage.getItem('products'));
      if (!products || products.length === 0) {
        products = initialProducts;
        localStorage.setItem('products', JSON.stringify(products));
      }
      this.products = products;
    },
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
      if (!this.editingProduct) return;

      this.editingProduct.stock = this.editingProduct.quantity;

      const updatedProducts = this.products.map(p =>
        p.id === this.editingProduct.id ? this.editingProduct : p
      );
      this.products = updatedProducts;
      localStorage.setItem('products', JSON.stringify(this.products));
      this.closeEditModal();
    },
    duplicateProduct() {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      const productToDuplicate = this.products.find(p => p.id === this.editingProduct.id);
      if (productToDuplicate) {
        const newProduct = {
          ...productToDuplicate,
          id: Date.now(),
          name: `${productToDuplicate.name} (Copia)`
        };
        products.push(newProduct);
        localStorage.setItem('products', JSON.stringify(products));
        this.products = products;
      }
      this.closeEditModal();
    },
    deleteProduct() {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      const updatedProducts = products.filter(p => p.id !== this.editingProduct.id);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      this.products = updatedProducts;
      this.closeEditModal();
    }
  }
}
</script>

<style scoped>
.product-list-container {
  padding: 2.5rem;
  background-color: white;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  font-family: 'Arial', sans-serif;
  flex: 2;
}

.header-section {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 1rem 0;
  text-align: left;
}

.actions-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.add-button {
  background: #c41e3a;
  color: white;
  border: none;
  border-radius: 9999px;
  width: 120px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
  padding-bottom: 4px;
}

.add-button:hover {
  background: #a01729;
}

.search-container {
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  background: #FEF3C7;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  border: 1px solid #FDE68A;
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
  background-color: transparent;
}

.filter-button {
  background: #FEF3C7;
  color: #4B5563;
  border: 1px solid #FDE68A;
  border-radius: 8px;
  padding: 0.6rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.3s;
  font-weight: bold;
}

.filter-button:hover {
  background: #FDE68A;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 2px solid #f97316;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
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

.stock-icon {
  display: flex;
  align-items: center;
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
  background: #FEF3C7;
  color: #92400E;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
}

.add-icon {
  background: transparent;
  color: #92400E;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  padding: 0;
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
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}

.modal-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
  font-weight: bold;
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
  text-align: center;
  margin-bottom: 1rem;
}

.form-group label {
  font-weight: bold;
  color: #333;
}

.form-input, .form-textarea {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  color: #333;
}

.form-input:disabled, .form-textarea:disabled {
  background: #f3f4f6;
  color: #6b7280;
  opacity: 0.7;
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

.save-button {
  flex: 1;
  background: #4ade80;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.save-button:hover {
  background: #22c55e;
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
  background: #fef2f2;
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
    width: 100%;
  }

  .actions-container {
    flex-direction: column;
    align-items: stretch;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>