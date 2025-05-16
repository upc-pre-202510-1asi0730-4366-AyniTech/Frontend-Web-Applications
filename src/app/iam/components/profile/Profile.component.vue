<template>
  <NavbarComponent />  
  <div class="profile-wrapper">
    <!-- Contenido principal -->
    <div class="profile-content">
      <div class="profile-container">
        <div class="profile-section">
          <h1>{{ $t('profile.title') }}</h1>
          
          <div class="profile-avatar">
            <img src='@/assets/default-avatar.svg' alt="foto de perfil" class="avatar-image" />
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
            <button class="action-btn logout-btn" @click="logout">{{ $t('profile.logout') }}</button>
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
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { locale } = useI18n();
    const router = useRouter();
    
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
    
    const logout = () => {
      // Aquí podría ir la lógica para cerrar sesión, limpiar datos, etc.
      router.push('/');
    };
    
    return {
      toggleLanguage,
      userData,
      settings,
      logout
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
  padding-top: 80px; /* Para dejar espacio para el navbar fijo */
}

.profile-content {
  display: flex;
  justify-content: center;
  flex: 1;
}

.profile-container {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

.profile-section, .settings-section {
  background-color: white;
  border-radius: 15px;
  padding: 2.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  min-width: 380px;
  flex: 1;
  transition: transform 0.3s, box-shadow 0.3s;
}

.profile-section:hover, .settings-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.profile-section {
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
  margin-bottom: 0.5rem;
  width: 100%;
}

.info-label {
  font-weight: 500;
  width: 150px;
  color: #666;
}

.info-value {
  flex: 1;
  font-weight: 600;
  color: #333;
  font-size: 1.1rem;
}

.edit-info-btn {
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.edit-info-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.profile-actions {
  display: flex;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.8rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  width: 100%;
  transition: transform 0.2s, background-color 0.2s, box-shadow 0.2s;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.change-profile-btn {
  background-color: #D32F2F;
  color: white;
}

.change-profile-btn:hover {
  background-color: #b71c1c;
}

.change-plan-btn {
  background-color: #E67E22;
  color: white;
}

.change-plan-btn:hover {
  background-color: #d35400;
}

.logout-btn {
  background-color: #747474;
  color: white;
  margin-top: 1rem;
}

.logout-btn:hover {
  background-color: #D32F2F;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f1f1;
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
  padding: 0.8rem 0;
  border-bottom: 1px solid #f1f1f1;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-text {
  font-size: 1rem;
  color: #333;
  line-height: 1.4;
  flex: 1;
  padding-right: 1rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 56px;
  height: 28px;
  flex-shrink: 0;
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
  background-color: #ddd;
  transition: .4s;
  border-radius: 34px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input:checked + .toggle-slider {
  background-color: #4CAF50;
}

input:checked + .toggle-slider:before {
  transform: translateX(28px);
}
</style> 