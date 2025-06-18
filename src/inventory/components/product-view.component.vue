<script>
import { InventoryService } from "../services/inventory.service.js"
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: "product-view",
  setup() {
    const router = useRouter()
    const inventoryService = new InventoryService()
    const products = ref([])
    const filters = ref({
      category: '',
      product: '',
      entryDate: '',
      quantity: '',
      unitPrice: '',
      minStock: '',
      unit: ''
    })

    // Cargar productos al montar
    const fetchProducts = async () => {
      const { data } = await inventoryService.getAll()
      products.value = data
    }

    // Filtrar productos
    const filteredProducts = computed(() => {
      return products.value.filter(item => {
        return (
            (!filters.value.category || item.category?.toLowerCase().includes(filters.value.category.toLowerCase())) &&
            (!filters.value.product || item.product?.toLowerCase().includes(filters.value.product.toLowerCase())) &&
            (!filters.value.entryDate || item.entryDate?.includes(filters.value.entryDate)) &&
            (!filters.value.quantity || String(item.quantity).includes(filters.value.quantity)) &&
            (!filters.value.unitPrice || String(item.unitPrice).includes(filters.value.unitPrice)) &&
            (!filters.value.minStock || String(item.minStock).includes(filters.value.minStock)) &&
            (!filters.value.unit || item.unit?.toLowerCase().includes(filters.value.unit.toLowerCase()))
        )
      })
    })

    onMounted(fetchProducts)

    return {
      router,
      filters,
      filteredProducts
    }
  }
}
</script>

<template>
  <div class="lot-inventory-view">
    <!-- Botones superiores -->
    <div class="top-buttons">
      <button class="switch-btn" @click="router.push('/inventory/product-inventory')">{{ $t('lotInventory.byProduct') }}</button>
      <button class="switch-btn" @click="router.push('/inventory/lot-inventory')">{{ $t('lotInventory.byLot') }}</button>
    </div>

    <!-- Título -->
    <h1 class="title">{{ $t('lotInventory.inventoryByProduct') || 'Inventario por producto' }}</h1>

    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <input v-model="filters.category" class="search-input" :placeholder="$t('lotInventory.category') || 'Categoría'" />
      <input v-model="filters.product" class="search-input" :placeholder="$t('lotInventory.products')" />
      <input v-model="filters.entryDate" class="search-input" :placeholder="$t('lotInventory.entryDate')" />
      <input v-model="filters.quantity" class="search-input" :placeholder="$t('lotInventory.quantity')" />
      <input v-model="filters.unitPrice" class="search-input" :placeholder="$t('lotInventory.pricePerUnit')" />
      <input v-model="filters.minStock" class="search-input" :placeholder="$t('lotInventory.minStock') || 'Stock mínimo'" />
      <input v-model="filters.unit" class="search-input" :placeholder="$t('lotInventory.unit')" />
    </div>

    <!-- Historial -->
    <div class="lot-history-container">
      <div v-for="(item, idx) in filteredProducts" :key="idx" class="lot-history-row">
        <div class="lot-data">
          <div>
            <div class="label">{{ $t('lotInventory.category') || 'Categoría' }}</div>
            <div class="value">{{ item.category }}</div>
          </div>
          <div>
            <div class="label">{{ $t('lotInventory.products') }}</div>
            <div class="value">{{ item.product }}</div>
          </div>
          <div>
            <div class="label">{{ $t('lotInventory.entryDate') }}</div>
            <div class="value">{{ item.entryDate.split('T')[0].split('-').reverse().join('/') }}</div>
          </div>
          <div>
            <div class="label">{{ $t('lotInventory.quantity') }}</div>
            <div class="value">{{ item.quantity }}</div>
          </div>
          <div>
            <div class="label">{{ $t('lotInventory.pricePerUnit') }}</div>
            <div class="value">S/.{{ item.unitPrice }}</div>
          </div>
          <div>
            <div class="label">{{ $t('lotInventory.minStock') || 'Stock mínimo' }}</div>
            <div class="value">{{ item.minStock }}</div>
          </div>
          <div>
            <div class="label">{{ $t('lotInventory.unit') }}</div>
            <div class="value">{{ item.unit }}</div>
          </div>
        </div>
        <div class="lot-actions">
          <button class="action-btn" @click="router.push({ name: 'edit-product', params: { id: item.id } })">
            <span class="material-icons">edit</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600&family=Inter:wght@400&display=swap');
.lot-history-container {
  max-height: 500px;
  overflow-y: auto;
  margin: 0 24px 32px 24px;
}
.lot-inventory-view {
  background: #FFE3A3;
  min-height: 100vh;
  padding: 24px 0 0 0;
}
.top-buttons {
  display: flex;
  gap: 12px;
  margin-left: 32px;
  margin-top: 8px;
}
.switch-btn {
  background: #C0392B;
  color: #fff;
  font-family: 'Nunito', sans-serif;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  padding: 6px 18px;
  cursor: pointer;
  margin-bottom: 8px;
  transition: background 0.2s;
}
.switch-btn:hover {
  background: #a93226;
}
.title {
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 18px 0;
  color: #333;
}
.search-bar {
  display: flex;
  flex-wrap: wrap; /* Permite que los inputs bajen a otra línea si no caben */
  align-items: center;
  gap: 16px;
  background: #EE7F27;
  padding: 18px 32px;
  border-radius: 8px;
  margin: 0 24px 32px 24px;
  justify-content: center; /* Centra los elementos */
}
.search-input {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 400;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  outline: none;
  min-width: 120px;
  max-width: 180px;
  flex: 1 1 140px; /* Permite que se adapten al espacio disponible */
  background: #fff;
  color: #222;
  box-sizing: border-box;
}
.lot-history-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 6px #0001;
  margin: 18px 24px;
  padding: 18px 24px;
  gap: 24px;
}
.lot-data {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 32px;
  flex: 1;
  align-items: center;
}
.label {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #222;
}
.value {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #222;
  background: #f7f7f7;
  border-radius: 6px;
  padding: 6px 12px;
  margin-top: 2px;
  min-width: 80px;
  max-width: 160px; /* Puedes ajustar este valor */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
.lot-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.action-btn {
  background: #2D2321;
  color: #fff;
  border: none;
  border-radius: 20px;
  width: 48px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
}
.action-btn .material-icons {
  font-size: 22px;
}
</style>