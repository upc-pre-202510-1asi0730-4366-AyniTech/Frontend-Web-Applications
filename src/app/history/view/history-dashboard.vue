<script setup>
import { ref, onMounted } from 'vue'
import { fetchProductHistory } from '../services/history-api.service'
import { fetchStockSummary } from '../services/stock-api.service'
import HistoryCard from '../component/history-card.component.vue'
import StockCard from '../component/stock-card.component.vue'

const tipoGestion = ref('Producto')
const fecha = ref('')
const historial = ref([])
const stock = ref([])
const historialOriginal = ref([])
const stockOriginal = ref([])
const haBuscado = ref(false)

onMounted(async () => {
  historialOriginal.value = await fetchProductHistory()
  stockOriginal.value = await fetchStockSummary()
  historial.value = [...historialOriginal.value]
  stock.value = [...stockOriginal.value]
})

function formatearFechaISOaDDMM(fechaISO) {
  if (!fechaISO) return ''
  const [yyyy, mm, dd] = fechaISO.split('-')
  return `${dd}/${mm}`
}

function filtrarResultados() {
  haBuscado.value = true

  const fechaFiltrada = formatearFechaISOaDDMM(fecha.value)
  historial.value = [...historialOriginal.value]
  stock.value = [...stockOriginal.value]

  // Ahora también filtra por fecha cuando es "Producto"
  if ((tipoGestion.value === 'Producto' || tipoGestion.value === 'Categoría') && fechaFiltrada) {
    historial.value = historial.value.filter(item =>
        item.fechaConsulta === fechaFiltrada
    )
  }

  if ((tipoGestion.value === 'Producto' || tipoGestion.value === 'Stock Promedio') && fechaFiltrada) {
    stock.value = stock.value.filter(item =>
        item.fechaConsulta === fechaFiltrada
    )
  }

  console.log("Gestión seleccionada:", tipoGestion.value)
  console.log("Fecha original:", fecha.value)
  console.log("Fecha formateada:", fechaFiltrada)
  console.log("Historial filtrado:", historial.value)
  console.log("Stock filtrado:", stock.value)
}
</script>

<template>
  <div class="dashboard-container">
    <h2>Historial</h2>

    <div class="toolbar">
      <div class="left-side">
        <select v-model="tipoGestion" class="btnP">
          <option value="Producto">Tipo de Gestión</option>
          <option value="Categoría">Categoría</option>
          <option value="Stock Promedio">Stock Promedio</option>
        </select>
        <input class="btnP" type="date" v-model="fecha" />
      </div>
      <button class="search-btn" @click="filtrarResultados">Buscar</button>
    </div>

    <div class="card-list" v-if="haBuscado">
      <HistoryCard
          v-if="tipoGestion === 'Producto' || tipoGestion === 'Categoría'"
          v-for="h in historial"
          :key="h.id"
          :h="h"
      />

      <StockCard
          v-if="tipoGestion === 'Producto' || tipoGestion === 'Stock Promedio'"
          v-for="s in stock"
          :key="s.id"
          :s="s"
      />
    </div>
  </div>
</template>

<style scoped>
.left-side {
  display: flex;
  gap: 1rem;
}

.dashboard-container {
  width: 100%;
  font-family: 'Inter', sans-serif;
  min-height: calc(100vh - 70px);
  margin-top: 110px;
}

.toolbar {
  position: sticky;
  top: 70px;
  z-index: 10;
  background-color: #EE7F27;
  padding: 1rem 2rem;
  display: flex;
  margin-left: calc(-50vw + 50%);
  justify-content: space-between;
  align-items: center;
  width: 97.5vw;
  gap: 1rem;
}

h2 {
  margin-bottom: 1rem;
  color: #333;
}

select,
input[type="date"] {
  padding: 0.5rem;
  border-radius: 4px;
  border: none;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  filter: invert(1);
  cursor: pointer;
}

.search-btn {
  background: #c0392b;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-right: 2rem;
}

.btnP {
  padding: 0.5rem 1rem;
  background: #ffffff;
  color: #676767;
  border-radius: 6px;
  border: none;
  font-weight: 500;
  cursor: pointer;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 260px;
}
</style>
