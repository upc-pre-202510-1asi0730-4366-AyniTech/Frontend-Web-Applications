<script setup>
import Navbar from './app/shared/navbar.component.vue'
import HistoryDashboard from './app/history/view/history-dashboard.vue'
</script>

<template>
  <div class="app-container">
    <Navbar />
    <div class="content">
      <HistoryDashboard />
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
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
  font-size: 1.2rem;
}
</style>
