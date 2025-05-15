<script setup>
import { ref, onMounted } from 'vue'
import { fetchLots } from '../services/lot-api.service'
import LotCard from '../components/lot-card.component.vue'

const lots = ref([])

onMounted(async () => {
  lots.value = await fetchLots()
})
</script>

<template>
  <div class="inventory-lote">
    <h2>Inventario por lote</h2>

    <div class="toolbar">
      <button class="btn">Por producto</button>
      <button class="btn active">Por lote</button>
      <input type="text" placeholder="Producto..." />
      <input type="text" placeholder="Proveedor..." />
      <input type="date" />
      <input type="number" placeholder="Cantidad" />
      <input type="number" placeholder="Precio" />
      <button class="btn generate">Generar Nuevo Lote</button>
    </div>

    <div class="lote-cards">
      <LotCard v-for="lot in lots" :key="lot.id" :lot="lot" />
    </div>
  </div>
</template>

<style scoped>
.inventory-lote {
  padding: 2rem;
}
.toolbar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}
.btn {
  background-color: #ffc107;
  border: none;
  padding: 0.4rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}
.btn.active {
  background-color: #ff9800;
}
.btn.generate {
  background-color: #dc3545;
  color: white;
}
.lote-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>