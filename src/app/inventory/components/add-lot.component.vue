<script setup>
import { ref } from 'vue'
import NewLot from '../models/NewLot.entity.js'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close', 'save'])
const newLot = ref(new NewLot({}))

const handleSubmit = () => {
  emit('save', newLot.value)
  newLot.value = new NewLot({})
}
</script>

<template>
  <div v-if="isOpen" class="modal-overlay">
    <div class="modal-window">
      <h2>Agregar Lote</h2>

      <div class="form-content">
        <div class="form-group">
          <label>Proveedor</label>
          <input
              type="text"
              v-model="newLot.proveedor"
              class="input-field"
              placeholder="Nombre del proveedor"
          >
        </div>

        <div class="form-group">
          <label>Producto</label>
          <input
              type="text"
              v-model="newLot.producto"
              class="input-field"
              placeholder="Nombre del producto"
          >
        </div>

        <div class="form-group">
          <label>Fecha de entrada</label>
          <input
              type="date"
              v-model="newLot.fechaEntrada"
              class="input-field"
          >
        </div>

        <div class="form-group">
          <label>Cantidad</label>
          <input
              type="number"
              v-model="newLot.cantidad"
              class="input-field"
              min="0"
          >
        </div>

        <div class="form-group">
          <label>Precio por unidad</label>
          <div class="price-input">
            <span class="currency">S/</span>
            <input
                type="number"
                v-model="newLot.precio"
                class="input-field"
                step="0.01"
                min="0"
            >
          </div>
        </div>

        <div class="form-group">
          <label>Unidad de medida</label>
          <input
              type="text"
              v-model="newLot.unidad"
              class="input-field"
              placeholder="Ej: kg, l, unidades"
          >
        </div>

        <div class="form-actions">
          <button class="btn-generate" @click="handleSubmit">Guardar</button>
          <button class="action-button" @click="emit('close')">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-window {
  background: #FFF5E0;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

h2 {
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
}

.form-content {
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background: white;
  min-width: 150px;
  outline: none;
}

.price-input {
  position: relative;
  display: flex;
  align-items: center;
}

.currency {
  position: absolute;
  left: 0.75rem;
  color: #666;
}

.price-input .input-field {
  padding-left: 2rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.btn-generate {
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.action-button {
  width: auto;
  padding: 0.5rem 1rem;
  background: #000000;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-generate:hover {
  background: #c82333;
}

.action-button:hover {
  background: #1a1a1a;
}

@media (max-width: 768px) {
  .modal-window {
    width: 95%;
    padding: 1rem;
  }
}
</style>