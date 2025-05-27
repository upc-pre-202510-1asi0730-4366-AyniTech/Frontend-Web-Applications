<template>
  <div id="app">
    <!-- Navbar (ya tienes este componente) -->
    <Navbar v-if="showNavbar" />

    <!-- Contenido principal -->
    <main class="main-content" :class="{ 'with-navbar': showNavbar }">
      <router-view />
    </main>

    <!-- Loading overlay -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-spinner">
        <div class="spinner"></div>
        <p>{{ $t('common.loading') || 'Cargando...' }}</p>
      </div>
    </div>

    <!-- Notification system -->
    <div v-if="notification.show" class="notification" :class="notification.type">
      <div class="notification-content">
        <span class="notification-message">{{ notification.message }}</span>
        <button @click="closeNotification" class="notification-close">×</button>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './app/shared/navbar.component.vue';

export default {
  name: 'App',
  components: {
    Navbar
  },
  data() {
    return {
      isLoading: false,
      notification: {
        show: false,
        message: '',
        type: 'info' // 'success', 'error', 'warning', 'info'
      }
    }
  },
  computed: {
    showNavbar() {
      // Mostrar navbar en todas las rutas excepto login u otras específicas
      const hiddenNavbarRoutes = ['/login', '/register']
      return !hiddenNavbarRoutes.includes(this.$route.path)
    }
  },
  methods: {
    // Método global para mostrar notificaciones
    showNotification(message, type = 'info', duration = 3000) {
      this.notification = {
        show: true,
        message,
        type
      }

      setTimeout(() => {
        this.closeNotification()
      }, duration)
    },

    closeNotification() {
      this.notification.show = false
    },

    // Método global para mostrar/ocultar loading
    setLoading(loading) {
      this.isLoading = loading
    }
  },

  // Proporcionar métodos globalmente
  provide() {
    return {
      showNotification: this.showNotification,
      setLoading: this.setLoading
    }
  },

  mounted() {
    // Escuchar eventos globales
    this.$router.beforeEach((to, from, next) => {
      this.setLoading(true)
      next()
    })

    this.$router.afterEach(() => {
      this.setLoading(false)
    })
  }
}
</script>

<style>
/* Reset y estilos globales */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  /* Remover el background del body para que cada página controle su fondo */
}

#app {
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  width: 100%;
  min-height: 100vh; /* Asegurar que ocupe toda la altura */
  display: flex;
  flex-direction: column;
}

.main-content.with-navbar {
  min-height: calc(100vh - 60px); /* Ajustar según la altura de tu navbar */
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-spinner {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #f97316;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Notification system */
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 300px;
  max-width: 500px;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
}

.notification.success {
  background: #d1fae5;
  border-left: 4px solid #10b981;
  color: #065f46;
}

.notification.error {
  background: #fee2e2;
  border-left: 4px solid #ef4444;
  color: #991b1b;
}

.notification.warning {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  color: #92400e;
}

.notification.info {
  background: #dbeafe;
  border-left: 4px solid #3b82f6;
  color: #1e40af;
}

.notification-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.notification-message {
  flex: 1;
  margin-right: 1rem;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.notification-close:hover {
  opacity: 1;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Utilidades globales */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1rem; }
.mt-5 { margin-top: 1.25rem; }

.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-5 { margin-bottom: 1.25rem; }

.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.p-5 { padding: 1.25rem; }

.hidden {
  display: none;
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .notification {
    left: 10px;
    right: 10px;
    top: 10px;
    min-width: auto;
  }

  .main-content.with-navbar {
    min-height: calc(100vh - 50px);
  }
}

/* Transiciones para router */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* Estilos para formularios */
.form-error {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.form-success {
  color: #10b981;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>