<script>
import { ref, watch } from 'vue'
import { Inventory } from '../model/inventory.entity.js'
import { InventoryService } from '../services/inventory.service.js'

export default {
  name: "edit-view",
  props: {
    product: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'updated'],
  setup(props, { emit }) {
    const form = ref(new Inventory({ ...props.product }))
    const inventoryService = new InventoryService()
    const loading = ref(false)
    const error = ref(null)

    // Actualiza el formulario si el producto cambia
    watch(() => props.product, (newVal) => {
      form.value = new Inventory({ ...newVal })
    })

    // Guardar cambios
    const save = async () => {
      loading.value = true
      error.value = null
      try {
        await inventoryService.update(form.value.id, form.value)
        emit('updated', form.value)
        emit('close')
      } catch (e) {
        error.value = 'Error al guardar los cambios'
      } finally {
        loading.value = false
      }
    }

    // Cerrar modal
    const close = () => emit('close')

    return { form, save, close, loading, error }
  }
}
</script>

<template>
  <div v-if="show" class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="close">×</button>
      <h2>Editar registro</h2>
      <form @submit.prevent="save">
        <label>Categoría</label>
        <input v-model="form.category" type="text" required />

        <label>Producto</label>
        <input v-model="form.product" type="text" required />

        <label>Fecha de ingreso</label>
        <input v-model="form.entryDate" type="date" required />

        <label>Cantidad por unidad</label>
        <input v-model="form.quantity" type="number" min="0" required />

        <label>Precio por unidad</label>
        <input v-model="form.unitPrice" type="number" min="0" step="0.01" required />

        <label>Unidad de medida</label>
        <input v-model="form.unit" type="text" required />

        <div class="actions">
          <button type="submit" class="save-btn" :disabled="loading">Guardar</button>
          <button type="button" class="cancel-btn" @click="close">Cancelar</button>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: #0008;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 24px;
  padding: 32px 40px 24px 40px;
  min-width: 350px;
  max-width: 95vw;
  position: relative;
  box-shadow: 0 4px 32px #0002;
}
.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}
h2 {
  margin-bottom: 18px;
}
form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
input {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 16px;
  background: #f7f7f7;
  color: #222; /* <-- Cambia esto de blanco a oscuro */
}
.actions {
  display: flex;
  gap: 16px;
  margin-top: 18px;
}
.save-btn {
  background: #C0392B;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
.cancel-btn {
  background: #EE7F27;
  color: #222;
  border: none;
  border-radius: 12px;
  padding: 10px 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
.error {
  color: #C0392B;
  margin-top: 8px;
  font-size: 15px;
}
</style>