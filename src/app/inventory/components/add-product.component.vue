<script setup>
import { ref } from 'vue'
import NewProduct from '../models/NewProduct.entity.js'

const product = ref(new NewProduct())
const emit = defineEmits(['close', 'save'])

const handleSubmit = () => {
  emit('save', product.value.toJSON())
}
</script>

<template>
  <div class="add-product-container">
    <div class="add-product-form">
      <h1>Agregar Producto</h1>

      <div class="form-group">
        <label>Producto</label>
        <input
            type="text"
            v-model="product.producto"
            class="form-input"
            placeholder="Nombre del producto"
        >
      </div>

      <div class="form-group">
        <label>Proveedor</label>
        <input
            type="text"
            v-model="product.proveedor"
            class="form-input"
            placeholder="Nombre del proveedor"
        >
      </div>

      <div class="form-group">
        <label>Fecha de entrada</label>
        <input
            type="date"
            v-model="product.fechaEntrada"
            class="form-input"
        >
      </div>

      <div class="form-group">
        <label>Cantidad</label>
        <input
            type="number"
            v-model="product.cantidad"
            class="form-input"
            min="0"
        >
      </div>

      <div class="form-group">
        <label>Precio</label>
        <div class="price-input">
          <span class="currency">$</span>
          <input
              type="number"
              v-model="product.precio"
              class="form-input"
              step="0.01"
              min="0"
          >
        </div>
      </div>

      <div class="form-group">
        <label>Unidad de medida</label>
        <input
            type="text"
            v-model="product.unidad"
            class="form-input"
            placeholder="Ej: kg, l, unidades"
        >
      </div>

      <div class="form-actions">
        <button
            class="save-button"
            @click="handleSubmit"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.add-product-container {
  min-height: calc(100vh - 70px);
  padding: 2rem;
  background-color: #FFF5E0;
}

.add-product-form {
  max-width: 800px;
  margin: 0 auto;
  background: #FFF5E0;
  padding: 2rem;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: #F4A460;
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

.price-input .form-input {
  padding-left: 2rem;
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.save-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.75rem 3rem;
  border-radius: 24px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-button:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .add-product-container {
    padding: 1rem;
  }

  .add-product-form {
    padding: 1rem;
  }
}
</style>