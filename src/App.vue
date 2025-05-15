<script setup>
import { ref } from 'vue';
import Navbar from './app/shared/navbar.component.vue';
import ProductInventoryView from "./app/inventory/views/product-inventory.view.vue";
import LotInventory from "./app/inventory/views/lot-intentory.view.vue";

const currentView = ref('product'); // 'product' o 'lot'
</script>

<template>
  <div class="app-container">
    <Navbar />
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

<style>
html, body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  width: 100%;
  height: 100%;
  background-color: #FFF5E0;
  overflow-x: hidden;
}

#app {
  width: 100%;
  min-height: 100vh;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
}

.content {
  padding: 2rem;
  padding-top: calc(70px + 2rem);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.view-selector {
  background-color: #fff3cd;
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.btn-view {
  padding: 0.5rem 1rem;
  border: none;
  background: #ffc107;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.btn-view.active {
  background: #ff9800;
}

.btn-view:hover {
  background: #ffb74d;
}
</style>