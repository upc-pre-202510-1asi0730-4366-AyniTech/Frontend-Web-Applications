<script setup>
import 'primeicons/primeicons.css'
</script>

<template>
  <header class="dashboard-header">
    <div class="logo-container">
      <img src="../../assets/logo.svg" alt="StockWise" class="logo" />
    </div>
    <nav class="main-nav">
      <a href="#" class="nav-link">Inicio</a>
      <a href="#" class="nav-link">Productos</a>
      <a href="#" class="nav-link">Categorías</a>
      <a href="#" class="nav-link">Proveedores</a>
      <a href="#" class="nav-link search">
        <i class="fas fa-search"></i> Buscar
      </a>
      <a href="#" class="nav-link">
        <i class="fas fa-bell"></i> Alertas
      </a>
      <a href="#" class="nav-link">Soporte</a>
      <a href="#" class="nav-link user">
        user <i class="fas fa-user-circle"></i>
      </a>
    </nav>
  </header>
</template>

<style scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #feeac5;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 70px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 1rem 3rem;
  z-index: 1000;
  box-sizing: border-box;
  overflow: hidden;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 110px;
  height: 110px;
  object-fit: contain;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: bold;
  margin-left: 0.5rem;
  color: #333;
  display: flex;
  align-items: center;
}

.logo-text-accent {
  color: #e63946;
}

.main-nav {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  margin-left: 1rem;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-size: 0.9rem;
}

.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #e63946;
}

.user i {
  font-size: 1.2rem;
  margin-left: 0.25rem;
}

/* Para agregar los iconos de Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style> 