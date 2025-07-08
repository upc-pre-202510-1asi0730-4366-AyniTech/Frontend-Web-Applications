<script setup>
import { ref } from 'vue'
import { fetchProductHistory, fetchHistorySummaryByDate } from '@/app/history/services/history-api.service'
import { fetchStockSummary, fetchStockSummaryByDate } from '@/app/history/services/stock-api.service'
import HistoryCard from '@/app/history/component/history-card.component.vue'
import StockCard from '@/app/history/component/stock-card.component.vue'
import HistorySummary from '@/app/history/model/history.entity.js'

const tipoGestion = ref('Producto')
const fecha = ref('')
const historial = ref([])
const stock = ref([])
const haBuscado = ref(false)

function compararFechas(fecha1, fecha2) {
  return new Date(fecha1).toISOString().slice(0, 10) === new Date(fecha2).toISOString().slice(0, 10)
}

async function filtrarResultados() {
  haBuscado.value = true
  historial.value = []
  stock.value = []

  const fechaSeleccionada = fecha.value

  try {
    switch (tipoGestion.value) {
      case 'Producto': {
        const producto = await fetchProductHistory()
        const productoMapeado = producto.map(p => new HistorySummary(p))

        historial.value = fechaSeleccionada
            ? productoMapeado.filter(p => compararFechas(p.fechaConsulta, fechaSeleccionada))
            : productoMapeado

        const stockData = await fetchStockSummary()
        stock.value = fechaSeleccionada
            ? stockData.filter(s => compararFechas(s.fechaConsulta, fechaSeleccionada))
            : stockData
        break
      }

      case 'Categoría': {
        historial.value = fechaSeleccionada
            ? await fetchHistorySummaryByDate(fechaSeleccionada)
            : await fetchProductHistory()
        break
      }

      case 'Stock Promedio': {
        stock.value = fechaSeleccionada
            ? await fetchStockSummaryByDate(fechaSeleccionada)
            : await fetchStockSummary()
        break
      }

      default:
        historial.value = []
        stock.value = []
    }

    console.log('Gestión:', tipoGestion.value)
    console.log('Fecha:', fechaSeleccionada)
    console.log('Historial:', historial.value)
    console.log('Stock:', stock.value)

  } catch (error) {
    console.error('Error al filtrar:', error)
  }
}
</script>

<template>
  <div class="dashboard-container">
    <div class="header-section">
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
    </div>

    <div class="scrollable-content">
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
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Arial', sans-serif;
  overflow: hidden; /* Evita el scroll general */
}

.header-section {
  padding: 1rem 3rem 0;
  background: #fbeccf;
  z-index: 10;
}

h2 {
  margin: 2rem 0 1rem 0; /* Aumenté el margen superior a 2rem */
  color: #333;
  text-align: center;
  font-size: 2rem;
  padding-top: 20px; /* Añadí padding superior adicional */
}

.toolbar {
  background-color: #EE7F27;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  border-radius: 0 0 8px 8px;
}

.scrollable-content {
  flex: 1;
  overflow-y: auto; /* Solo este contenedor hace scroll */
  padding: 0 3rem 1rem;
}

.left-side {
  display: flex;
  gap: 1rem;
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
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
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
  padding-top: 0.5rem;
}
</style>