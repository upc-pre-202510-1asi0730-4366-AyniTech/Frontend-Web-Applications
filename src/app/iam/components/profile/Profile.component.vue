<template>
    
  <div class="profile-wrapper">
    <!-- Barra de herramientas -->
    <div class="profile-toolbar">
      <button @click="$router.back()" class="toolbar-button">
        &larr; {{ $t('toolbar.back') }}
      </button>

      <div class="toolbar-spacer"></div>
      <div class="toolbar-title">{{ $t('toolbar.soport') }}</div>
      <div class="toolbar-spacer"></div>

      <div class="language-switcher">
        <button @click="toggleLanguage" class="language-button">
          <span class="language-icon">🌐</span>
          <span class="language-text">{{ $t('toolbar.language') }}</span>
        </button>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="profile-content">
      <div class="profile-container">
        <div class="profile-section">
          <h1>{{ $t('profile.title') }}</h1>
          
          <div class="profile-avatar">
            <img src="@/app/iam/assets/default-avatar.svg" alt="foto de perfil" class="avatar-image" />            
            <button class="edit-avatar-btn">
              <img src="@/assets/edit-icon.svg" alt="Editar" class="edit-icon">
            </button>
          </div>
          
          <div class="profile-info">
            <div class="info-row">
              <span class="info-label">{{ $t('profile.name') }}:</span>
              <span class="info-value">{{ userData.name }}</span>
              <button class="edit-info-btn">
                <img src="@/assets/edit-icon.svg" alt="Editar" class="edit-icon">
              </button>
            </div>
            
            <div class="info-row">
              <span class="info-label">{{ $t('profile.jobTitle') }}:</span>
              <span class="info-value">{{ userData.jobTitle }}</span>
              <button class="edit-info-btn">
                <img src="@/assets/edit-icon.svg" alt="Editar" class="edit-icon">
              </button>
            </div>
          </div>
          
          <div class="profile-actions">
            <button class="action-btn change-profile-btn">{{ $t('profile.changeProfile') }}</button>
            <button class="action-btn change-plan-btn">{{ $t('profile.changePlan') }}</button>
          </div>
        </div>
        
        <div class="settings-section">
          <div class="settings-header">
            <h2>{{ $t('profile.settings') }}</h2>
            <div class="settings-icon">
              <img src="@/assets/settings-icon.svg" alt="Ajustes" class="settings-gear-icon">
            </div>
          </div>
          
          <div class="settings-list">
            <div class="setting-item">
              <span class="setting-text">{{ $t('profile.notificationPermission') }}</span>
              <label class="toggle-switch">
                <input type="checkbox" v-model="settings.notificationPermission">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <span class="setting-text">{{ $t('profile.automaticAlerts') }}</span>
              <label class="toggle-switch">
                <input type="checkbox" v-model="settings.automaticAlerts">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <span class="setting-text">{{ $t('profile.multipleFormatPermission') }}</span>
              <label class="toggle-switch">
                <input type="checkbox" v-model="settings.multipleFormatPermission">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <span class="setting-text">{{ $t('profile.specificAlertPermission') }}</span>
              <label class="toggle-switch">
                <input type="checkbox" v-model="settings.specificAlertPermission">
                <span class="toggle-slider"></span>
              </label>
            </div>
            
            <div class="setting-item">
              <span class="setting-text">{{ $t('profile.minorRolesPermission') }}</span>
              <label class="toggle-switch">
                <input type="checkbox" v-model="settings.minorRolesPermission">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { locale } = useI18n();
    
    const toggleLanguage = () => {
      locale.value = locale.value === 'es' ? 'en' : 'es';
    };
    
    const userData = ref({
      name: 'Jose',
      jobTitle: 'Administrador'
    });
    
    const settings = ref({
      notificationPermission: true,
      automaticAlerts: false,
      multipleFormatPermission: true,
      specificAlertPermission: false,
      minorRolesPermission: false
    });
    
    return {
      toggleLanguage,
      userData,
      settings
    };
  }
};
</script>

<style scoped>
.profile-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 50vh;
  background-color: #FFF6E6;
}

.profile-toolbar {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.toolbar-button {
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  color: #333;
}

.toolbar-spacer {
  flex: 1;
}

.toolbar-title {
  font-size: 1.1rem;
  font-weight: 500;
}

.language-switcher {
  display: flex;
}

.language-button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.language-icon {
  margin-right: 0.5rem;
}

.profile-content {
  display: flex;
  justify-content: center;
  flex: 1;
  padding: 2rem;
  margin-top: 4rem;
}

.profile-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.profile-section {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.profile-section h1 {
  font-size: 1.8rem;
  margin: 0;
  align-self: flex-start;
}

.profile-avatar {
  position: relative;
  width: 120px;
  height: 120px;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background-color: #e0e0e0;
}

.edit-avatar-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.edit-icon {
  width: 16px;
  height: 16px;
}

.profile-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: flex;
  align-items: center;
}

.info-label {
  font-weight: 500;
  width: 150px;
}

.info-value {
  flex: 1;
}

.edit-info-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-actions {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
}

.action-btn {
  padding: 0.8rem;
  border-radius: 5px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  width: 100%;
}

.change-profile-btn {
  background-color: #D32F2F;
  color: white;
}

.change-plan-btn {
  background-color: #E67E22;
  color: white;
}

.settings-section {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.settings-header h2 {
  font-size: 1.5rem;
  margin: 0;
}

.settings-gear-icon {
  width: 24px;
  height: 24px;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.setting-text {
  font-size: 1rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .toggle-slider {
  background-color: #4CAF50;
}

input:checked + .toggle-slider:before {
  transform: translateX(26px);
}
</style> 