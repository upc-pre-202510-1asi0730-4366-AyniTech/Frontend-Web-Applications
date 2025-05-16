<script setup>
import { ref } from 'vue';
import ProductInventoryView from "./product-inventory.view.vue";
import LotInventory from "./lot-intentory.view.vue";

const currentView = ref('product'); // 'product' o 'lot'
</script>

<template>
  <div class="app-container">
    <div class="content">
      <div class="view-selector">
        <button
            :class="['btn-view', currentView === 'product' ? 'active' : '']"
            @click="currentView = 'product'"
        >
          Por producto
        </button>
        <button
            :class="['btn-view', currentView === 'lot' ? 'active' : '']"
            @click="currentView = 'lot'"
        >
          Por lote
        </button>
      </div>

      <component :is="currentView === 'product' ? ProductInventoryView : LotInventory" />
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #FFF5E0;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.content {
  padding: 1rem;
  padding-top: calc(70px + 1rem);
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.view-selector {
  background-color: #fff3cd;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.btn-view {
  padding: 0.5rem 1rem;
  border: none;
  background: #ffc107;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
  flex: 1;
  max-width: 200px;
  font-weight: 500;
}

.btn-view.active {
  background: #ff9800;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn-view:hover {
  background: #ffb74d;
}

@media (max-width: 768px) {
  .content {
    padding: 0.5rem;
    padding-top: calc(70px + 0.5rem);
  }
  
  .btn-view {
    max-width: none;
  }
}
</style> 