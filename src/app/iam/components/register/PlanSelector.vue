<script setup>

</script>

<template>
  <div class="plan-selector">
    <h2>Seleccionar Plan</h2>
    <p>Encuentra el plan perfecto para tus necesidades</p>
    <div class="plans">
      <div class="plan-card">
        <h3>Plan Gratuito</h3>
        <p>S/ 0 <span>/mes</span></p>
        <ul>
          <li>✔ Hasta 30 productos registrados</li>
          <li>✔ 1 usuario administrador</li>
          <li>✔ Clasificación por etiquetas</li>
          <li>✔ Búsqueda y filtrado de productos</li>
          <li>✔ Publicidad discreta</li>
        </ul>
        <button>Empieza gratis</button>
      </div>
      <div class="plan-card destacado">
        <div class="recomendado">★ Recomendado</div>
        <h3>Plan Emprendedor</h3>
        <p>S/ 30 <span>/mes</span></p>
        <ul>
          <li>✔ Hasta 200 productos</li>
          <li>✔ Hasta 2 usuarios (admin + asistente)</li>
          <li>✔ Estadísticas básicas</li>
          <li>✔ Clasificación por categorías</li>
          <li>✔ Sin publicidad</li>
        </ul>
        <button>Acceder</button>
      </div>
      <div class="plan-card">
        <h3>Plan Negocio</h3>
        <p>S/ 70 <span>/mes</span></p>
        <ul>
          <li>✔ Productos ilimitados</li>
          <li>✔ Usuarios ilimitados</li>
          <li>✔ Estadísticas completas y gráficas</li>
          <li>✔ Historial de movimientos</li>
          <li>✔ Alertas por stock mínimo</li>
        </ul>
        <button>Acceder</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.plan-selector {
  text-align: center;
  padding: 2rem;
}
.plans {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}
.plan-card {
  background: #fff;
  border: 2px solid #f4a460;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  width: 300px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.plan-card.destacado {
  border: 2px solid #ff9800;
  position: relative;
}
.recomendado {
  background: #ff9800;
  color: #fff;
  font-weight: bold;
  padding: 0.2rem 0.8rem;
  border-radius: 12px;
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
}
.plan-card h3 {
  margin-bottom: 0.5rem;
}
.plan-card ul {
  text-align: left;
  margin: 1rem 0;
  padding: 0;
  list-style: none;
}
.plan-card li {
  margin-bottom: 0.5rem;
}
.plan-card button {
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}
.plan-card button:hover {
  background: #e68900;
}
</style>