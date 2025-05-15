<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t, locale } = useI18n();
const router = useRouter();

const toggleLanguage = () => {
  locale.value = locale.value === 'es' ? 'en' : 'es';
};

const navigateTo = (route) => {
  router.push(route);
};
</script>

<template>
  <header class="dashboard-header">
    <div class="logo-container" @click="navigateTo('/dashboard')">
      <img src="@/assets/logo.svg" alt="StockWise" class="logo" />
    </div>
    <nav class="main-nav">
      <a @click="navigateTo('/dashboard')" class="nav-link">{{ $t('navbar.home') }}</a>
      <a class="nav-link search">
        <i class="pi pi-search"></i> {{ $t('navbar.search') }}
      </a>
      <a class="nav-link">
        <i class="pi pi-bell"></i> {{ $t('navbar.alerts') }}
      </a>
      <a class="nav-link">{{ $t('navbar.support') }}</a>
      
      <a @click="navigateTo('/profile')" class="nav-link user">
        {{ $t('navbar.profile') }} <i class="pi pi-user"></i>
      </a>
      <div class="language-switcher">
        <button @click="toggleLanguage" class="language-button">
          <span class="language-icon">🌐</span>
        </button>
      </div>
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
  cursor: pointer;
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
  cursor: pointer;
}

.nav-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #e63946;
}

.user i {
  font-size: 1.2rem;
  margin-left: 0.25rem;
}

.language-switcher {
  margin: 0 0.5rem;
}

.language-button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.language-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.language-icon {
  font-size: 1.1rem;
}

/* Para agregar los iconos de Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');
</style> 