<script setup>
defineProps({
  lot: Object
})
</script>

<template>
  <div class="lot-card">
    <p><strong>Proveedor:</strong> {{ lot.proveedor }}</p>
    <p><strong>Producto:</strong> {{ lot.producto }}</p>
    <p><strong>Fecha de entrada:</strong> {{ lot.fechaEntrada }}</p>
    <p><strong>Cantidad por unidad:</strong> {{ lot.cantidad }}</p>
    <p><strong>Precio por unidad:</strong> S/ {{ lot.precio }}</p>
    <p><strong>Unidad de medida:</strong> {{ lot.unidad }}</p>
    <button class="comment-button">💬</button>
  </div>
</template>

<style scoped>
.lot-card {
  background: #fff9e6;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.comment-button {
  margin-top: 0.5rem;
  background: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>