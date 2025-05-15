<template>
  <div class="alert-card">
    <div class="alert-grid">
      <div class="field">
        <label>Categoría de alerta</label>
        <div class="value tipo">{{ alert.alert_type }}</div>
      </div>
      <div class="field">
        <label>Categoría de producto</label>
        <div class="value">{{ alert.product_category }}</div>
      </div>
      <div class="field">
        <label>Producto</label>
        <div class="value">{{ alert.product_name }}</div>
      </div>
      <div class="field">
        <label>Fecha de alerta</label>
        <div class="value">{{ alert.alert_date }}</div>
      </div>
      <div class="actions">
        <button class="btn btn-dark" @click="$emit('view', alert)">...</button>
        <button class="btn btn-danger" @click="$emit('delete', alert)">🗑</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StockAlertCard",
  props: {
    alert: Object
  }
};
</script>

<style scoped>
.alert-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px #d8d8d8;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 5px solid #ffa500;
}

.alert-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  gap: 1rem;
  align-items: center;
}

.field label {
  display: block;
  font-size: 0.85rem;
  font-weight: bold;
  color: #333;
}

.value {
  background-color: #fff3cd;
  padding: 0.4rem 0.6rem;
  border-radius: 4px;
  margin-top: 0.25rem;
  font-size: 0.95rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: end;
}

.btn {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  color: white;
}

.btn-dark {
  background-color: #2e1f1f;
}

.btn-danger {
  background-color: #c62828;
}
</style>
