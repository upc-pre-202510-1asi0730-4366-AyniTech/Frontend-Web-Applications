<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  h: Object
})

const emit = defineEmits(['cancelar', 'confirmar'])

const categoria = ref('')
const producto = ref('')
const fechaConsulta = ref('')
const precio = ref(0)
const cantidad = ref(0)

// Sincroniza los valores cuando el modal se abre
watch(() => props.h, (nuevo) => {
  if (!nuevo) return
  categoria.value = nuevo.categoria || ''
  producto.value = nuevo.producto || ''
  fechaConsulta.value = nuevo.fechaConsulta || ''
  precio.value = nuevo.precio || 0
  cantidad.value = nuevo.cantidad || 0
}, { immediate: true })

function confirmarEdicion() {
  emit('confirmar', {
    ...props.h,
    categoria: categoria.value,
    producto: producto.value,
    fechaConsulta: fechaConsulta.value,
    precio: precio.value,
    cantidad: cantidad.value,
    total: (precio.value * cantidad.value).toFixed(2)
  })
}
</script>

<template>
  <div class="modal-backdrop" v-if="visible">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Edición de Registro</h2>
        <button class="close-btn" @click="$emit('cancelar')">✕</button>
      </div>

      <div class="modal-body">
        <div class="form">
          <div class="form-group">
            <label>Categoría:</label>
            <input type="text" v-model="categoria" />
          </div>

          <div class="form-group">
            <label>Producto:</label>
            <input type="text" v-model="producto" />
          </div>

          <div class="form-group">
            <label>Fecha de Consulta:</label>
            <input type="text" v-model="fechaConsulta" />
          </div>

          <div class="form-group">
            <label>Precio Unitario:</label>
            <input type="number" v-model.number="precio" step="0.01" />
          </div>

          <div class="form-group">
            <label>Cantidad:</label>
            <input type="number" v-model.number="cantidad" />
          </div>

          <div class="form-group">
            <label>Total:</label>
            <input type="text" :value="`S/. ${(precio * cantidad).toFixed(2)}`" readonly />
          </div>
        </div>

        <div class="form-side">
          <img
              class="modal-image"
              src="https://cdn-icons-png.flaticon.com/512/1046/1046890.png"
              alt="Comercio"
          />
          <div class="modal-actions-vertical">
            <button class="btn-crear" @click="confirmarEdicion">Editar</button>
            <button class="btn-cancelar" @click="$emit('cancelar')">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  width: 650px;
  max-width: 95vw;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.25);
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #000;
}

.modal-body {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  align-items: start;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.95rem;
  color: #000;
}

.form-group input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
  background: #f9f9f9;
  color: #333;
  width: 100%;
}

.modal-actions-vertical {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-crear {
  background-color: #c0392b;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  width: 120px;
}

.btn-cancelar {
  background-color: #f39c12;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  width: 120px;
}

.modal-image {
  width: 100px;
  align-self: center;
  justify-self: end;
}

.form-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
</style>
