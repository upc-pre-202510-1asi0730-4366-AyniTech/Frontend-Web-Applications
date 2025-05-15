<script setup>
defineProps({
  product: Object
})
</script>
<template>
  <div class="product-card">
    <p><strong>categoria:</strong> {{ product.categoria }}</p>
    <p><strong>Producto:</strong> {{ product.producto }}</p>
    <p><strong>Fecha de entrada:</strong> {{ product.fechaEntrada }}</p>
    <p><strong>Cantidad por unidad:</strong> {{ product.cantidad }}</p>
    <p><strong>Precio por unidad:</strong> S/ {{ product.precio }}</p>
    <p><strong>Stock Mínimo:</strong> S/ {{ product.stockminimo }}</p>
    <p><strong>Unidad de medida:</strong> {{ product.unidad }}</p>
    <button class="comment-button">💬</button>
  </div>
</template>

<style scoped>
.product-card {
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