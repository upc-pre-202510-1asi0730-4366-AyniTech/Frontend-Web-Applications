<template>
  <div class="add-inventory-container">
    <h2>Añadir Inventario Inicial</h2>
    <p class="product-info">
      Producto: <strong>{{ productData.name }}</strong>
    </p>
    
    <form @submit.prevent="saveInventory" class="inventory-form">
      <div class="form-group">
        <label>Cantidad:</label>
        <input 
          type="number" 
          v-model="inventoryData.quantity" 
          required
          min="0"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label>Precio:</label>
        <input 
          type="number" 
          v-model="inventoryData.price" 
          required
          min="0"
          step="0.01"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label>Stock Mínimo:</label>
        <input 
          type="number" 
          v-model="inventoryData.minStock" 
          required
          min="0"
          class="form-control"
        />
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

      <div class="form-actions">
        <button type="submit" class="btn-save" :disabled="isSaving">
          {{ isSaving ? 'Guardando...' : 'Guardar Inventario' }}
        </button>
        <button type="button" @click="skipInventory" class="btn-skip">Omitir</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import InventoryApiService from '../../services/inventory-api.service';
import ProductApiService from '../../services/product-api.service';

export default {
  name: 'AddInventoryComponent',
  props: {
    productData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const router = useRouter();
    const isSaving = ref(false);
    const inventoryData = ref({
      categoria: props.productData.categoryName || '',
      producto: props.productData.name || '',
      quantity: props.productData.stock || 0,
      price: props.productData.salePrice || 0,
      minStock: props.productData.minStock || 0,
      unitName: props.productData.unitName || '',
      entryDate: new Date().toISOString()
    });

    const selectedTags = ref(props.productData.tagIds ? [...props.productData.tagIds] : []);
    const availableTags = ref([]);

    onMounted(async () => {
      // Cargar etiquetas disponibles
      try {
        availableTags.value = await ProductApiService.getTags();
      } catch (error) {
        console.error('Error al cargar etiquetas:', error);
      }
    });

    const isTagSelected = (tagId) => selectedTags.value.includes(tagId);
    const toggleTag = (tagId) => {
      if (isTagSelected(tagId)) {
        selectedTags.value = selectedTags.value.filter(id => id !== tagId);
      } else {
        selectedTags.value.push(tagId);
      }
    };

    const saveInventory = async () => {
      try {
        isSaving.value = true;
        console.log('Datos a enviar:', {
          ...inventoryData.value,
          unitName: props.productData.unitName,
          tagIds: selectedTags.value
        });
        await InventoryApiService.createInventory(inventoryData.value);
        router.push('/inventory');
      } catch (error) {
        console.error('Error al guardar el inventario:', error);
        alert('Error al guardar el inventario. Por favor, intenta de nuevo.');
      } finally {
        isSaving.value = false;
      }
    };

    const skipInventory = () => {
      router.push('/inventory');
    };

    return {
      inventoryData,
      saveInventory,
      skipInventory,
      isSaving,
      selectedTags,
      availableTags,
      isTagSelected,
      toggleTag
    };
  }
};
</script>

<style scoped>
.add-inventory-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-info {
  margin-bottom: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.inventory-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-control {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-save,
.btn-skip {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-save {
  background-color: #28a745;
  color: white;
}

.btn-save:hover:not(:disabled) {
  background-color: #218838;
}

.btn-save:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.btn-skip {
  background-color: #6c757d;
  color: white;
}

.btn-skip:hover {
  background-color: #5a6268;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f0f0f0;
}

.tag {
  padding: 0.3rem 0.7rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #333;
  background-color: #e0e0e0;
  cursor: pointer;
  transition: all 0.2s;
}

.tag.selected {
  background-color: #007bff;
  color: white;
}

.tag:hover:not(.selected) {
  background-color: #d0d0d0;
}
</style> 