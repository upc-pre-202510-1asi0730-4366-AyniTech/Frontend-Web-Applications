<template>
  <div class="modal-backdrop" v-if="visible">
    <div class="modal-content">
      <img
          class="icono-alerta"
          src="https://cdn-icons-png.flaticon.com/512/732/732220.png"
          alt="Excel"
      />
      <h3 class="titulo">¿Exportar a Excel?</h3>
      <p class="mensaje">{{ mensaje || 'Se generará un archivo con los datos actuales.' }}</p>
      <div class="modal-actions">
        <button class="cancelar" @click="$emit('cancelar')">Cancelar</button>
        <button class="continuar" @click="$emit('confirmar')">Exportar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['visible', 'mensaje'])
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  max-width: 320px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icono-alerta {
  width: 60px;
  margin-bottom: 1rem;
}

.titulo {
  font-size: 1.3rem;
  font-weight: 700;
  color: #000;
  margin: 0;
}

.mensaje {
  font-size: 0.95rem;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  color: #555;
}

.modal-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
}

button.cancelar {
  background-color: #c0392b;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
}

button.continuar {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  flex: 1;
}
</style>
