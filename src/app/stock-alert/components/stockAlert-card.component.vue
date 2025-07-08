<template>
  <div class="alert-card" :class="{ 'low-stock': alert.isLowStock }">
    <div class="alert-content">
      <div class="alert-header">
        <h3>{{ alert.productName }}</h3>
        <span class="stock-badge" :class="{ 'low': alert.isLowStock }">
          {{ alert.quantity }} unidades
        </span>
      </div>
      
      <div class="alert-details">
        <p>Stock mínimo: {{ alert.minStock }}</p>
        <p>Fecha de registro: {{ formatDate(alert.entryDate) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StockAlertCard",
  props: {
    alert: {
      type: Object,
      required: true,
      validator: (value) => {
        return value.productName && 
               typeof value.quantity === 'number' && 
               typeof value.minStock === 'number' &&
               typeof value.isLowStock === 'boolean';
      }
    }
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
      }
    }
  }
};
</script>

<style scoped>
.alert-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.alert-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.alert-card.low-stock {
  border-left: 4px solid #dc3545;
}

.alert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.alert-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #2e2e2e;
}

.stock-badge {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: #e9ecef;
  font-size: 0.9rem;
}

.stock-badge.low {
  background-color: #dc3545;
  color: white;
}

.alert-details {
  color: #666;
  font-size: 0.9rem;
}

.alert-details p {
  margin: 0.5rem 0;
}
</style>
