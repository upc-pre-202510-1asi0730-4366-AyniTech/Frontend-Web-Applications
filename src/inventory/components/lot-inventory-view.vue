<script>
import { InventoryService} from "../services/inventory.service.js"
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: "lot-inventory-view",
  setup() {
    const router = useRouter()
    const inventoryService = new InventoryService()
    const lots = ref([])
    const filters = ref({
      product: '',
      supplier: '',
      entryDate: '',
      quantity: '',
      unitPrice: ''
    })

    // Cargar historial al montar
    const fetchLots = async () => {
      const { data } = await inventoryService.getAll()
      lots.value = data
    }

    // Filtrar historial
    const filteredLots = computed(() => {
      return lots.value.filter(lot => {
        return (
            (!filters.value.product || lot.product?.toLowerCase().includes(filters.value.product.toLowerCase())) &&
            (!filters.value.supplier || lot.supplier?.toLowerCase().includes(filters.value.supplier.toLowerCase())) &&
            (!filters.value.entryDate || lot.entryDate?.includes(filters.value.entryDate)) &&
            (!filters.value.quantity || String(lot.quantity).includes(filters.value.quantity)) &&
            (!filters.value.unitPrice || String(lot.unitPrice).includes(filters.value.unitPrice))
        )
      })
    })

    onMounted(fetchLots)

    return {
      router,
      filters,
      filteredLots
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
    <h1 class="title">{{ $t('lotInventory.inventoryByLot') }}</h1>

    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <input v-model="filters.product" class="search-input" :placeholder="$t('lotInventory.products')" />
      <input v-model="filters.supplier" class="search-input" :placeholder="$t('lotInventory.supplier')" />
      <input v-model="filters.entryDate" class="search-input" :placeholder="$t('lotInventory.entryDate')" />
      <input v-model="filters.quantity" class="search-input" :placeholder="$t('lotInventory.quantity')" />
      <input v-model="filters.unitPrice" class="search-input" :placeholder="$t('lotInventory.price')" />
      <button class="new-lot-btn" @click="router.push({ name: 'generate-lot' })">
        {{ $t('lotInventory.generateNewLot') }}
      </button>
    </div>

    <!-- Historial -->
    <div class="lot-history-container">
      <div v-for="(lot, idx) in filteredLots" :key="idx" class="lot-history-row">
        <div class="lot-data">
          <div>
            <div class="label">{{ $t('lotInventory.supplier') }}</div>
            <div class="value">{{ lot.supplier }}</div>
          </div>
          <div>
            <div class="label">{{ $t('lotInventory.products') }}</div>
            <div class="value">{{ lot.product }}</div>
          </div>
          <div>
            <div class="label">{{ $t('lotInventory.entryDate') }}</div>
            <div class="value">{{ lot.entryDate.split('T')[0].split('-').reverse().join('/') }}</div>
          </div>
          <div>
            <div class="label">{{ $t('lotInventory.quantity') }}</div>
            <div class="value">{{ lot.quantity }}</div>
          </div>
          <div>
            <div class="label">{{ $t('lotInventory.price') }}</div>
            <div class="value">S/.{{ lot.unitPrice }}</div>
          </div>
          <div>
            <div class="label">{{ $t('lotInventory.measurement') }}</div>
            <div class="value">{{ lot.unit }}</div>
          </div>
        </div>
        <div class="lot-actions">
          <button class="action-btn"><span class="material-icons">picture_as_pdf</span></button>
          <button class="action-btn" @click="router.push({ name: 'comment-lot', params: { id: lot.id } })">
            <span class="material-icons">comment</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600&family=Inter:wght@400&display=swap');
.lot-history-container {
  max-height: 500px; /* Puedes ajustar la altura según tu preferencia */
  overflow-y: auto;
  margin: 0 24px 32px 24px; /* Igual que la barra de búsqueda para alineación */
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
  align-items: center;
  gap: 16px;
  background: #EE7F27;
  padding: 18px 32px;
  border-radius: 8px;
  margin: 0 24px 32px 24px;
}

.search-input {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 400;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  outline: none;
  min-width: 140px;
  background: #fff; /* Fondo blanco */
  color: #333;      /* Texto oscuro para mejor visibilidad */
}

.new-lot-btn {
  background: #C0392B;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  padding: 10px 22px;
  cursor: pointer;
  margin-left: auto;
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
  grid-template-columns: repeat(6, 1fr); /* 6 columnas iguales */
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