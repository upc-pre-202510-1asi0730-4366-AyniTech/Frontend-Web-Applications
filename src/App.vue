<script setup>
import MainDashboard from './app/product-management/components/main-dashboard.component.vue';
</script>

<template>
  <MainDashboard />
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
  display: flex;
  flex-direction: column;
}
</style>
