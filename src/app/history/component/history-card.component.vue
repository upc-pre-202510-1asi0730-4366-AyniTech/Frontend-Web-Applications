<script setup>
import { ref, onMounted, nextTick } from 'vue'
import ModalConfirmEditHistory from '@/shared/modal.confirm.edit.history.vue'
import ModalConfirmDeleteHistory from '@/shared/modal.confirm.delete.history.vue'

const props = defineProps({ h: Object })

const showModal = ref(false)
const tipoAccion = ref('')
const mensaje = ref('')
const visible = ref(false)

onMounted(() => {
  nextTick(() => {
    visible.value = true
  })
})

function abrirModalEdicion() {
  tipoAccion.value = 'editar'
  showModal.value = true
}

function abrirModalEliminacion() {
  tipoAccion.value = 'eliminar'
  mensaje.value = '¿Deseas eliminar el reporte?'
  showModal.value = true
}

function confirmarAccion(actualizado) {
  showModal.value = false
  if (tipoAccion.value === 'editar') {
    props.h.categoria = actualizado.categoria
    props.h.producto = actualizado.producto
    props.h.fechaConsulta = actualizado.fechaConsulta
    props.h.precio = actualizado.precio
    props.h.cantidad = actualizado.cantidad
    props.h.total = actualizado.total
    console.log('Registro editado:', actualizado)
  } else if (tipoAccion.value === 'eliminar') {
    requestAnimationFrame(() => {
      visible.value = false
    })
  }
}

function cancelarAccion() {
  showModal.value = false
}
</script>

<template>
  <transition name="fade">
    <div v-show="visible" class="history-card">
      <div class="cell"><label>Categoría</label><p>{{ h.categoria }}</p></div>
      <div class="cell"><label>Producto</label><p>{{ h.producto }}</p></div>
      <div class="cell"><label>Fecha de Consulta</label><p>{{ h.fechaConsulta }}</p></div>
      <div class="cell"><label>Precio Unitario</label><p>S/. {{ h.precio }}</p></div>
      <div class="cell"><label>Cantidad</label><p>{{ h.cantidad }}</p></div>
      <div class="cell"><label>Total</label><p>S/. {{ h.total }}</p></div>

      <div class="actions">
        <button class="edit-button" @click="abrirModalEdicion">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" alt="Editar" width="10" height="10" />
        </button>
        <button class="delete-button" @click="abrirModalEliminacion">
          <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Eliminar" width="14" height="14" />
        </button>
      </div>

      <ModalConfirmEditHistory
          v-if="showModal && tipoAccion === 'editar'"
          :visible="showModal"
          :h="h"
          @confirmar="confirmarAccion"
          @cancelar="cancelarAccion"
      />

      <ModalConfirmDeleteHistory
          v-if="showModal && tipoAccion === 'eliminar'"
          :visible="showModal"
          :mensaje="mensaje"
          @confirmar="confirmarAccion"
          @cancelar="cancelarAccion"
      />
    </div>
  </transition>
</template>

<style scoped>
.history-card {
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

.history-card:first-of-type {
  margin-top: 0rem;
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

.edit-button{
  background: transparent;
  border: 1px solid #c0392b;
}

.edit-button img {
  display: block;
  object-fit: contain;
}

.delete-button{
  background: #c0392b;
}

button img {
  object-fit: contain;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
