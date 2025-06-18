<script>
import { ref } from 'vue'
import { Inventory } from '../model/inventory.entity.js'
import { InventoryService } from '../services/inventory.service.js'

export default {
  name: "genereate-new-lot",
  emits: ['created', 'cancel'],
  setup(_, { emit }) {
    const form = ref(new Inventory({}))
    const loading = ref(false)
    const error = ref(null)
    const inventoryService = new InventoryService()

    const save = async () => {
      loading.value = true
      error.value = null
      try {
        await inventoryService.create(form.value)
        emit('created')
      } catch (e) {
        error.value = 'Error al crear el lote'
      } finally {
        loading.value = false
      }
    }

    const cancel = () => emit('cancel')

    return { form, save, cancel, loading, error }
  }
}
</script>

<template>
  <div class="generate-lot-form">
    <h2>{{ $t('generateLot.title') }}</h2>
    <form @submit.prevent="save">
      <label>{{ $t('generateLot.category') }}</label>
      <input v-model="form.category" type="text" required />

      <label>{{ $t('generateLot.product') }}</label>
      <input v-model="form.product" type="text" required />

      <label>{{ $t('generateLot.entryDate') }}</label>
      <input v-model="form.entryDate" type="date" required />

      <label>{{ $t('generateLot.quantity') }}</label>
      <input v-model="form.quantity" type="number" min="0" required />

      <label>{{ $t('generateLot.price') }}</label>
      <input v-model="form.unitPrice" type="number" min="0" step="0.01" required />

      <label>{{ $t('generateLot.minStock') }}</label>
      <input v-model="form.minStock" type="number" min="0" required />

      <label>{{ $t('generateLot.unit') }}</label>
      <input v-model="form.unit" type="text" required />

      <label>{{ $t('generateLot.supplier') }}</label>
      <input v-model="form.supplier" type="text" required />

      <div class="actions">
        <button type="submit" :disabled="loading">{{ $t('generateLot.create') }}</button>
        <button type="button" @click="cancel">{{ $t('generateLot.cancel') }}</button>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<style scoped>
.generate-lot-form {
  background: #fff;
  border-radius: 18px;
  padding: 32px 40px 24px 40px;
  max-width: 420px;
  margin: 32px auto;
  box-shadow: 0 4px 32px #0002;
}
h2 {
  margin-bottom: 18px;
  text-align: center;
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
  color: #222;
}
.actions {
  display: flex;
  gap: 16px;
  margin-top: 18px;
  justify-content: center;
}
button[type="submit"] {
  background: #C0392B;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 10px 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}
button[type="button"] {
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
  text-align: center;
}
</style>