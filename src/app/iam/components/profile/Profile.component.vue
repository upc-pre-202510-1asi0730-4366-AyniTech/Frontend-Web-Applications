<template>
  <div class="profile-wrapper">
    <div class="profile-content">
      <div class="profile-container">
        <div class="profile-section">
          <h1>{{ $t('profile.title') }}</h1>
          
          <div class="profile-avatar">
            <img :src="avatarUrl" alt="foto de perfil" class="avatar-image" />
            <button class="edit-avatar-btn" @click="triggerAvatarUpload">
              <img src="@/assets/edit-icon.svg" alt="Editar" class="edit-icon">
            </button>
            <input type="file" ref="avatarInput" @change="onAvatarChange" accept="image/*" style="display: none;" />
          </div>
          
          <div class="profile-info">
            <div class="info-row">
              <span class="info-label">{{ $t('profile.name') }}:</span>
              <template v-if="!isEditingName">
                <span class="info-value">{{ userData.name }} {{ userData.lastName }}</span>
                <button class="edit-info-btn" @click="startEditingName">
                  <img src="@/assets/edit-icon.svg" alt="Editar" class="edit-icon">
                </button>
              </template>
              <template v-else>
                <div class="edit-name-container">
                  <input type="text" v-model="newName" placeholder="Nombre" class="info-input" />
                  <input type="text" v-model="newLastName" placeholder="Apellido" class="info-input" />
                  <div class="edit-name-actions">
                    <button class="btn-save" @click="saveName">Guardar</button>
                    <button class="btn-cancel" @click="cancelEditingName">Cancelar</button>
                  </div>
                </div>
              </template>
            </div>
            
  

            <div class="info-row">
              <span class="info-label">Rol:</span>
              <span class="info-value">{{ translatedRole }}</span>
            </div>
          </div>
          
          <div class="profile-actions">
     
            <button class="action-btn change-plan-btn" @click="goToPlanSelector">{{ $t('profile.changePlan') }}</button>
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
import { ref, onMounted, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../services/authentication-api.service';
import defaultAvatar from '@/assets/default-avatar.svg';

export default {
  name: 'Profile',
  setup() {
    const { locale, t } = useI18n();
    const router = useRouter();
    const authStore = useAuthStore();
    
    const toggleLanguage = () => {
      locale.value = locale.value === 'es' ? 'en' : 'es';
    };
    
    const userData = ref({
      name: '',
      lastName: '',
      email: '',
      role: ''
    });

    // Traducir el rol según el idioma
    const translatedRole = computed(() => {
      if (!userData.value.role) return '';
      
      const roles = {
        'Employee': {
          'es': 'Empleado',
          'en': 'Employee'
        },
        'Admin': {
          'es': 'Administrador',
          'en': 'Admin'
        }
      };

      return roles[userData.value.role]?.[locale.value] || userData.value.role;
    });
    
    onMounted(async () => {
      // Cargar datos del usuario desde el store
      const user = authStore.currentUser;
      console.log('User data:', user); // Para debug
      if (user) {
        userData.value = {
          name: user.name || '',
          lastName: user.lastName || '',
          email: user.email || '',
          role: user.role || ''
        };
        // Cargar configuración guardada
        loadSettings();
      } else {
        // Si no hay usuario, redirigir al login
        router.push('/login');
      }
    });
    
    const isEditingName = ref(false);
    const newName = ref('');
    const newLastName = ref('');

    const startEditingName = () => {
      isEditingName.value = true;
      newName.value = userData.value.name;
      newLastName.value = userData.value.lastName;
    };

    const saveName = async () => {
      try {
        // Aquí iría la llamada a la API para actualizar el nombre
        userData.value.name = newName.value;
        userData.value.lastName = newLastName.value;
        isEditingName.value = false;
      } catch (error) {
        console.error('Error al actualizar el nombre:', error);
      }
    };
    
    const cancelEditingName = () => {
      isEditingName.value = false;
    };
    
    const avatarInput = ref(null);
    const avatarUrl = ref(localStorage.getItem('userAvatar') || defaultAvatar);

    const triggerAvatarUpload = () => {
      avatarInput.value.click();
    };

    const onAvatarChange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        try {
          // Crear una URL temporal para la vista previa
          const tempUrl = URL.createObjectURL(file);
          avatarUrl.value = tempUrl;
          
          // Guardar en localStorage para persistencia
          const reader = new FileReader();
          reader.onload = (e) => {
            const base64Image = e.target.result;
            localStorage.setItem('userAvatar', base64Image);
          };
          reader.readAsDataURL(file);
          
          // Aquí iría la lógica para subir la imagen al servidor
          // const formData = new FormData();
          // formData.append('avatar', file);
          // await uploadAvatar(formData);
        } catch (error) {
          console.error('Error al actualizar la imagen de perfil:', error);
        }
      }
    };

    const settings = ref({
      notificationPermission: false,
      automaticAlerts: false,
      multipleFormatPermission: false,
      specificAlertPermission: false,
      minorRolesPermission: false
    });

    // Cargar configuración guardada
    const loadSettings = () => {
      const savedSettings = localStorage.getItem('userSettings');
      if (savedSettings) {
        settings.value = JSON.parse(savedSettings);
      }
    };

    // Guardar configuración cuando cambie
    const saveSettings = () => {
      localStorage.setItem('userSettings', JSON.stringify(settings.value));
    };

    // Vigilar cambios en cada configuración
    Object.keys(settings.value).forEach(setting => {
      watch(() => settings.value[setting], (newVal) => {
        saveSettings();
      });
    });
    
    const logout = async () => {
      try {
        authStore.logout();
        router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    const goToPlanSelector = () => {
      router.push('/seleccionar-plan');
    };
    
    return {
      toggleLanguage,
      userData,
      translatedRole,
      settings,
      logout,
      goToPlanSelector,
      isEditingName,
      newName,
      newLastName,
      startEditingName,
      saveName,
      cancelEditingName,
      avatarInput,
      avatarUrl,
      triggerAvatarUpload,
      onAvatarChange,
      locale
    };
  }
};
</script>

<style scoped>
.profile-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #FFF6E6;
  padding-top: 80px; /* Para dejar espacio para el navbar fijo */
}

.profile-content {
  display: flex;
  justify-content: center;
  flex: 1;
  padding: 2rem;
}

.profile-container {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  margin: 0 auto;
  flex-wrap: wrap;
}

.profile-section, .settings-section {
  background-color: white;
  border-radius: 15px;
  padding: 2.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  min-width: 300px;
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
  font-weight: 700;
  color: #333;
}

.profile-avatar {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 1rem 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.edit-avatar-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;
}

.edit-avatar-btn:hover {
  transform: scale(1.1);
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
  gap: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.info-label {
  font-weight: 600;
  min-width: 100px;
}

.info-value {
  flex: 1;
}

.edit-name-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.info-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.edit-name-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.btn-save, .btn-cancel {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.btn-save {
  background-color: #4CAF50;
  color: white;
}

.btn-cancel {
  background-color: #f44336;
  color: white;
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin-top: 1rem;
}

.action-btn {
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.change-profile-btn {
  background-color: #4CAF50;
  color: white;
}

.change-plan-btn {
  background-color: #2196F3;
  color: white;
}

.logout-btn {
  background-color: #f44336;
  color: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.settings-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.settings-icon img {
  width: 24px;
  height: 24px;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid #eee;
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
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
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

@media (max-width: 768px) {
  .profile-container {
    flex-direction: column;
  }

  .profile-section, .settings-section {
    min-width: 100%;
  }

  .info-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .info-label {
    min-width: auto;
  }
}
</style> 