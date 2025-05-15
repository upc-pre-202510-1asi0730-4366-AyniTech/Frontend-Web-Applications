<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  visible: Boolean,
  t: Object
})

const emit = defineEmits(['cancelar', 'confirmar'])

const rangoFecha = ref('')
const producto = ref('')
const cantidadVentas = ref(0)
const precio = ref(0)

watch(() => props.t, (nuevo) => {
  if (!nuevo) return
  rangoFecha.value = nuevo.rangoFecha || ''
  producto.value = nuevo.producto || ''
  cantidadVentas.value = nuevo.cantidad || 0
  precio.value = nuevo.precio || 0
}, { immediate: true })

function confirmarTicket() {
  emit('confirmar', {
    ...props.t,
    rangoFecha: rangoFecha.value,
    producto: producto.value,
    cantidad: cantidadVentas.value,
    precio: precio.value,
    ticketPromedio: (precio.value / cantidadVentas.value).toFixed(2)
  })
}
</script>

<template>
  <div class="modal-backdrop" v-if="visible">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Ticket Promedio</h2>
        <button class="close-btn" @click="$emit('cancelar')">✕</button>
      </div>

      <div class="modal-body">
        <div class="form">
          <div class="form-group">
            <label>Rango de Fecha:</label>
            <input type="text" v-model="rangoFecha" />
          </div>

          <div class="form-group">
            <label>Producto</label>
            <input type="text" v-model="producto" />
          </div>

          <div class="form-group">
            <label>Cantidad de ventas</label>
            <input type="number" v-model.number="cantidadVentas" />
          </div>

          <div class="form-group">
            <label>Precio</label>
            <input type="number" v-model.number="precio" />
          </div>

          <div class="form-group">
            <label>Ticket promedio</label>
            <input type="text" :value="`S/. ${(precio / cantidadVentas).toFixed(2)}`" readonly />
          </div>
        </div>

        <div class="form-side">
          <img
              class="modal-image"
              src="https://img.freepik.com/vector-premium/granja-organica-que-produce-alimentos-saludables-cajas-madera_1308-159768.jpg?semt=ais_hybrid&w=740"
              alt="Comercio"
          />
          <div class="modal-actions-vertical">
            <button class="btn-crear" @click="confirmarTicket">Crear</button>
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
  width: 200px;
  height: auto;
  display: block;
  margin: 0 auto;
  object-fit: contain;
}


.form-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}
</style>
