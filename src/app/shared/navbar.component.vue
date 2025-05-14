<script setup>
// Puedes agregar lógica aquí si es necesario
</script>

<template>
  <header class="dashboard-header">
    <div class="logo-container">
      <img src="../../assets/logo.svg" alt="StockWise" class="logo" />
      <h1 class="logo-text">Stock<span class="logo-text-accent">Wise</span></h1>
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
  padding: 1rem 2rem;
  background-color: #fff5e0;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 70px;
  width: 100%;
  box-sizing: border-box;
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 50px;
  height: 50px;
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
  gap: 2rem;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
  margin-left: 3rem;
}

.nav-link {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 0.8rem;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #e63946;
}

.user i {
  font-size: 1.2rem;
  margin-left: 0.25rem;
}
</style>