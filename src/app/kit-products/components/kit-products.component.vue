<template>
  <div class="combine-products">
    <h1 class="page-title">
      <i class="pi pi-box mr-2"></i>
      Combinar Productos en Kits
    </h1>

    <!-- Buscador -->
    <div class="search-bar">
      <div class="search-input">
        <i class="pi pi-search search-icon"></i>
        <input 
          type="text" 
          v-model="searchTerm"
          placeholder="Buscar por nombre o categoría..."
          class="p-inputtext"
        />
      </div>
    </div>

    <!-- Estado de carga -->
    <div v-if="loading" class="loading-state">
      <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
      <p>Cargando productos...</p>
    </div>

    <!-- Mensaje de error -->
    <div v-else-if="error" class="error-state">
      <i class="pi pi-exclamation-triangle mr-2"></i>
      {{ error }}
    </div>

    <!-- Lista de productos -->
    <div v-else class="products-container">
      <h2 class="section-title">
        <i class="pi pi-list mr-2"></i>
        Productos existentes
      </h2>
      <div v-if="filteredProducts.length === 0" class="no-products">
        <i class="pi pi-info-circle mb-2" style="font-size: 2rem"></i>
        <p>No se encontraron productos</p>
      </div>
      <div v-else class="products-table">
        <div class="table-header">
          <div class="header-producto">Producto</div>
          <div class="header-categoria">Categoría</div>
          <div class="header-precio">Precio</div>
          <div class="header-inventario">Stock</div>
          <div class="header-anadir">Añadir</div>
        </div>
        <div v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-row"
        >
          <div class="cell-producto left-align">{{ product.producto }}</div>
          <div class="cell-categoria">{{ product.categoria }}</div>
          <div class="cell-precio">S/. {{ product.precio }}</div>
          <div class="cell-inventario">{{ product.cantidad }}</div>
          <div class="add-cell">
            <button class="add-button" @click="addToCombo(product)" :disabled="isProductInCombo(product)">
              <i class="pi" :class="isProductInCombo(product) ? 'pi-check' : 'pi-plus'"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Productos seleccionados para el combo -->
    <div v-if="selectedProducts.length > 0" class="selected-products-container">
      <h2 class="section-title">
        <i class="pi pi-shopping-cart mr-2"></i>
        Productos seleccionados para el kit
      </h2>
      <div class="kit-name-input">
        <span class="p-float-label">
          <InputText
            id="kit-name"
            v-model="comboName"
            class="p-inputtext-lg w-full"
          />
          <label for="kit-name">Nombre del Kit</label>
        </span>
      </div>
      <div class="selected-products-table">
        <div class="table-header">
          <div class="header-producto">Producto</div>
          <div class="header-categoria">Categoría</div>
          <div class="header-cantidad">Cantidad</div>
          <div class="header-acciones">Acciones</div>
        </div>
        <div v-for="(item, index) in selectedProducts" 
          :key="index" 
          class="product-row"
        >
          <div class="cell-producto left-align">{{ item.producto }}</div>
          <div class="cell-categoria">{{ item.categoria }}</div>
          <div class="cell-cantidad">
            <input 
              type="number" 
              v-model="item.quantity" 
              min="1"
              :max="item.cantidad"
              class="p-inputtext quantity-input"
            />
          </div>
          <div class="cell-acciones">
            <button class="remove-button" @click="removeFromCombo(index)">
              <i class="pi pi-trash"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="kit-actions">
        <Button 
          @click="createCombo"
          :disabled="!isComboValid"
          class="create-kit-button"
          icon="pi pi-check"
          label="Crear Kit"
        />
      </div>
    </div>

    <!-- Lista de Combos Existentes -->
    <div class="existing-combos-container" v-if="showExistingCombos">
      <h2 class="section-title">
        <i class="pi pi-list mr-2"></i>
        Combos Existentes
        <Button
          icon="pi pi-times"
          class="close-button p-button-rounded p-button-text"
          @click="showExistingCombos = false"
        />
      </h2>
      <div v-if="loadingCombos" class="loading-state">
        <i class="pi pi-spin pi-spinner" style="font-size: 2rem"></i>
        <p>Cargando combos...</p>
      </div>
      <div v-else-if="combosError" class="error-state">
        <i class="pi pi-exclamation-triangle mr-2"></i>
        {{ combosError }}
      </div>
      <div v-else-if="!existingCombos.length" class="no-combos">
        <i class="pi pi-info-circle mb-2" style="font-size: 2rem"></i>
        <p>No hay combos creados</p>
      </div>
      <div v-else class="combos-list">
        <div v-for="combo in existingCombos" :key="combo.id" class="combo-card">
          <div class="combo-header">
            <h3>{{ combo.name }}</h3>
            <Badge :value="combo.items.length" severity="info" />
          </div>
          <div class="combo-items">
            <div v-for="item in combo.items" :key="item.id" class="combo-item">
              <div class="item-details">
                <span class="item-name">{{ item.productName }}</span>
                <span class="item-quantity">x{{ item.quantity }}</span>
              </div>
              <span class="item-price">S/. {{ item.productPrice }}</span>
            </div>
          </div>
          <div class="combo-footer">
            <span class="combo-total">Total: S/. {{ calculateComboTotal(combo) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón flotante para mostrar combos -->
    <Button
      class="floating-button"
      icon="pi pi-list"
      @click="loadExistingCombos"
      :disabled="loadingCombos"
      tooltip="Ver Combos Existentes"
      tooltipOptions="{ position: 'left' }"
    />
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Badge from 'primevue/badge';
import KitProductsService from '../services/kit-products-api.service';
import { Combo, ComboItem } from '../models/kit-products.entity';

export default {
  name: 'KitProducts',
  components: {
    Button,
    InputText,
    Badge
  },
  setup() {
    const products = ref([]);
    const selectedProducts = ref([]);
    const searchTerm = ref('');
    const comboName = ref('');
    const loading = ref(true);
    const error = ref(null);
    const showExistingCombos = ref(false);
    const existingCombos = ref([]);
    const loadingCombos = ref(false);
    const combosError = ref(null);

    const loadProducts = async () => {
      try {
        loading.value = true;
        error.value = null;
        const response = await KitProductsService.getInventoryProducts();
        console.log('Productos cargados:', response);
        products.value = response;
      } catch (err) {
        console.error('Error al cargar productos:', err);
        error.value = 'Error al cargar los productos. Por favor, intente nuevamente.';
      } finally {
        loading.value = false;
      }
    };

    const filteredProducts = computed(() => {
      if (!products.value) return [];
      if (!searchTerm.value) return products.value;
      
      const search = searchTerm.value.toLowerCase();
      return products.value.filter(product => {
        const productName = (product.producto || '').toLowerCase();
        const category = (product.categoria || '').toLowerCase();
        return productName.includes(search) || category.includes(search);
      });
    });

    const isProductInCombo = (product) => {
      return selectedProducts.value.some(p => p.id === product.id);
    };

    const addToCombo = (product) => {
      if (!isProductInCombo(product)) {
        selectedProducts.value.push({
          ...product,
          quantity: 1
        });
      }
    };

    const removeFromCombo = (index) => {
      selectedProducts.value.splice(index, 1);
    };

    const isComboValid = computed(() => {
      return comboName.value.trim() !== '' && 
             selectedProducts.value.length > 0 &&
             selectedProducts.value.every(product => 
               product.quantity > 0 && product.quantity <= product.cantidad
             );
    });

    const createCombo = async () => {
      try {
        const comboItems = selectedProducts.value.map(product => 
          new ComboItem(product.id, product.quantity)
        );
        
        const combo = new Combo(comboName.value, comboItems);
        
        await KitProductsService.createCombo(combo);
        
        // Limpiar el formulario
        selectedProducts.value = [];
        comboName.value = '';
        
        alert('Kit creado exitosamente');
      } catch (error) {
        console.error('Error al crear el kit:', error);
        alert('Error al crear el kit');
      }
    };

    const loadExistingCombos = async () => {
      try {
        loadingCombos.value = true;
        combosError.value = null;
        const response = await KitProductsService.getAllCombos();
        existingCombos.value = response;
        showExistingCombos.value = true;
      } catch (error) {
        console.error('Error al cargar los combos:', error);
        combosError.value = 'Error al cargar los combos. Por favor, intente nuevamente.';
      } finally {
        loadingCombos.value = false;
      }
    };

    const calculateComboTotal = (combo) => {
      return combo.items.reduce((total, item) => 
        total + (item.productPrice * item.quantity), 0
      ).toFixed(2);
    };

    // Cargar productos al montar el componente
    loadProducts();

    return {
      products,
      selectedProducts,
      searchTerm,
      comboName,
      loading,
      error,
      filteredProducts,
      isProductInCombo,
      addToCombo,
      removeFromCombo,
      createCombo,
      isComboValid,
      showExistingCombos,
      existingCombos,
      loadingCombos,
      combosError,
      loadExistingCombos,
      calculateComboTotal
    };
  }
};
</script>

<style scoped>
.combine-products {
  padding: 2rem;
  padding-top: calc(70px + 2rem);
  font-family: 'Arial', sans-serif;
  background-color: #FFF5E0;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

.page-title {
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-title i {
  margin-right: 0.5rem;
  color: #E67E22;
}

.search-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: center;
}

.search-input {
  flex: 1;
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-input input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 2rem;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #fff;
}

.search-input input:focus {
  border-color: #E67E22;
  box-shadow: 0 0 0 2px rgba(230, 126, 34, 0.1);
  outline: none;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.products-container, .selected-products-container {
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e0e0e0;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.products-container:hover, .selected-products-container:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.section-title {
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #333;
  display: flex;
  align-items: center;
}

.section-title i {
  margin-right: 0.5rem;
  color: #E67E22;
}

.products-table, .selected-products-table {
  width: 100%;
}

.table-header {
  display: flex;
  background-color: #E67E22;
  color: white;
  font-weight: bold;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.header-producto, .cell-producto {
  flex: 2;
}

.header-categoria, .cell-categoria,
.header-precio, .cell-precio,
.header-inventario, .cell-inventario,
.header-anadir, .add-cell,
.header-cantidad, .cell-cantidad,
.header-acciones, .cell-acciones {
  flex: 1;
  text-align: center;
}

.product-row {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s ease;
}

.product-row:hover {
  background-color: #fff8f0;
}

.left-align {
  text-align: left;
  padding-left: 1rem;
}

.add-button, .remove-button {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.add-button {
  background-color: #E67E22;
}

.add-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.add-button:not(:disabled):hover {
  background-color: #d35400;
  transform: scale(1.05);
}

.remove-button {
  background-color: #e74c3c;
}

.remove-button:hover {
  background-color: #c0392b;
  transform: scale(1.05);
}

.kit-name-input {
  margin-bottom: 2rem;
}

.kit-name-input :deep(.p-float-label) {
  width: 100%;
}

.kit-name-input :deep(.p-inputtext) {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.kit-name-input :deep(.p-float-label label) {
  background: white;
  padding: 0 0.5rem;
  color: #666;
}

.kit-name-input :deep(.p-inputtext:focus) {
  border-color: #E67E22;
  box-shadow: 0 0 0 2px rgba(230, 126, 34, 0.1);
}

.kit-name-input :deep(.p-float-label input:focus ~ label),
.kit-name-input :deep(.p-float-label input.p-filled ~ label) {
  color: #E67E22;
}

.selected-products-table {
  margin-bottom: 1.5rem;
}

.quantity-input {
  width: 80px;
  text-align: center;
  border-radius: 4px;
}

.kit-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.create-kit-button {
  background-color: #E67E22;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 2rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.create-kit-button:not(:disabled):hover {
  background-color: #d35400;
  transform: translateY(-2px);
}

.create-kit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading-state {
  text-align: center;
  padding: 3rem;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.error-state {
  text-align: center;
  padding: 2rem;
  background-color: #fee2e2;
  color: #dc2626;
  border-radius: 8px;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-products {
  text-align: center;
  padding: 3rem;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.existing-combos-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.combos-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.combo-card {
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.combo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.combo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eee;
}

.combo-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.combo-items {
  margin-bottom: 1rem;
}

.combo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #eee;
}

.item-details {
  display: flex;
  flex-direction: column;
}

.item-name {
  font-weight: 500;
  color: #333;
}

.item-quantity {
  font-size: 0.9rem;
  color: #666;
}

.item-price {
  color: #E67E22;
  font-weight: 500;
}

.combo-footer {
  margin-top: 1rem;
  padding-top: 0.5rem;
  border-top: 1px solid #eee;
  text-align: right;
}

.combo-total {
  font-weight: bold;
  color: #E67E22;
  font-size: 1.1rem;
}

.floating-button {
  position: fixed;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: #E67E22;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.floating-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.close-button {
  margin-left: auto;
  color: #666;
}

.no-combos {
  text-align: center;
  padding: 3rem;
  color: #666;
}

@media (max-width: 768px) {
  .combine-products {
    padding: 1rem;
  }

  .search-bar {
    flex-direction: column;
  }

  .search-input {
    max-width: 100%;
  }

  .product-row {
    font-size: 0.9rem;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .header-producto, .cell-producto,
  .header-categoria, .cell-categoria,
  .header-precio, .cell-precio,
  .header-inventario, .cell-inventario {
    flex: 1 1 50%;
  }

  .header-anadir, .add-cell,
  .header-acciones, .cell-acciones {
    flex: 0 0 100%;
    justify-content: center;
  }

  .quantity-input {
    width: 60px;
  }

  .combos-list {
    grid-template-columns: 1fr;
  }

  .floating-button {
    bottom: 1rem;
    right: 1rem;
    width: 3.5rem;
    height: 3.5rem;
  }
}
</style>