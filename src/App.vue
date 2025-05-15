<script setup>
import MainDashboard from './app/product-management/components/main-dashboard.component.vue';
import Navbar from './app/shared/navbar.component.vue';
</script>

<template>
    <div class="app-container">
        <Navbar/>
        <div class="content">
          <MainDashboard />
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
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

.content {
  margin-top: 70px;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  padding: 0;
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
