<script setup>
const props = defineProps({
  lot: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['comment'])
</script>

<template>
  <div class="lot-card">
    <div class="card-header">
      <h3>{{ lot.producto }}</h3>
      <span class="provider">{{ lot.proveedor }}</span>
    </div>
    <div class="card-content">
      <p><strong>Fecha de entrada:</strong> {{ lot.fechaEntrada }}</p>
      <p><strong>Cantidad por unidad:</strong> {{ lot.cantidad }}</p>
      <p><strong>Precio por unidad:</strong> S/ {{ lot.precio }}</p>
      <p><strong>Unidad de medida:</strong> {{ lot.unidad }}</p>
    </div>
    <div class="card-actions">
      <button
          class="action-button"
          title="Comentarios"
          @click="$emit('comment', lot)"
      >
        <i class="fas fa-comments"></i>
      </button>
      <button
          class="action-button"
          title="Exportar"
      >
        <i class="fas fa-edit"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.lot-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.lot-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.card-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.provider {
  display: inline-block;
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-content p {
  margin: 0;
  color: #666;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.action-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  background: #2D2D2D;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-button:hover {
  background: #1a1a1a;
  transform: translateY(-2px);
}

.action-button i {
  font-size: 1rem;
}
</style>