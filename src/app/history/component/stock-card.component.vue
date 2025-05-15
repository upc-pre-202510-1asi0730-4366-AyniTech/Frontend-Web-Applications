<script setup>
import { ref } from 'vue'
import ModalConfirmExcelStock from '../../shared/modal.confirm.excel.stock.vue'
import ModalConfirmTicketStock from '../../shared/modal.confirm.ticket.stock.vue'

const props = defineProps({
  s: Object
})

const showExcelModal = ref(false)
const showTicketModal = ref(false)

function exportToExcel() {
  const data = [
    ['Stock Promedio', 'Categoría', 'Producto', 'Fecha de consulta', 'Stock ideal', 'Estado'],
    [
      props.s.stockPromedio,
      props.s.categoria,
      props.s.producto,
      props.s.fechaConsulta,
      props.s.stockIdeal,
      props.s.estado
    ]
  ]

  const csvContent = 'data:text/csv;charset=utf-8,' + data.map(e => e.join(",")).join("\n")
  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `stock_card_${props.s.producto}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function confirmarExcel() {
  showExcelModal.value = false
  exportToExcel()
}

function confirmarTicket() {
  showTicketModal.value = false
  console.log('[Ticket] Generar para:', props.s.producto)
  // Aquí podrías emitir o llamar a la función que genera el ticket
}
</script>

<template>
  <div class="stock-card">
    <div class="cell"><label>Stock Promedio</label><p>{{ s.stockPromedio }}</p></div>
    <div class="cell"><label>Categoría</label><p>{{ s.categoria }}</p></div>
    <div class="cell"><label>Producto</label><p>{{ s.producto }}</p></div>
    <div class="cell"><label>Fecha de consulta</label><p>{{ s.fechaConsulta }}</p></div>
    <div class="cell"><label>Stock ideal</label><p>{{ s.stockIdeal }}</p></div>
    <div class="cell"><label>Estado</label><p>{{ s.estado }}</p></div>

    <div class="actions">
      <button class="excel-button" @click="showExcelModal = true">
        <img src="https://cdn-icons-png.flaticon.com/512/732/732220.png" alt="Exportar a Excel" width="14" height="14" />
      </button>
      <button class="ticket-button" @click="showTicketModal = true">
        <img src="https://cdn-icons-png.flaticon.com/512/639/639365.png" alt="Ticket" width="12" height="12" />
      </button>
    </div>

    <ModalConfirmExcelStock
        :visible="showExcelModal"
        mensaje="¿Deseas exportar este registro a Excel?"
        @confirmar="confirmarExcel"
        @cancelar="showExcelModal = false"
    />

    <ModalConfirmTicketStock
        :visible="showTicketModal"
        mensaje="¿Deseas generar el ticket para este registro?"
        @confirmar="confirmarTicket"
        @cancelar="showTicketModal = false"
    />
  </div>
</template>

<style scoped>
.stock-card {
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  display: grid;
  grid-template-columns: 1.2fr 1.8fr 1fr 1.3fr 1fr 1fr 80px;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
  min-height: 80px;
}

.cell label {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
  color: #444;
}

.cell p {
  margin: 0;
  font-size: 0.95rem;
  color: #333;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;
  height: 100%;
}

button {
  color: white;
  border: none;
  border-radius: 20px;
  padding: 0.5rem;
  cursor: pointer;
  width: 80px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ticket-button {
  background: #000000;
}

.excel-button {
  background: #000000;
}

button img {
  display: block;
  object-fit: contain;
}
</style>
