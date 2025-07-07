<template>
  <div class="register-wrapper">
    <div class="register-toolbar">
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

    <div class="register-content">

      <div class="register-hero">
        <img src="@/assets/image4.png" alt="Ilustración de registro" class="hero-image">
        <button class="change-plan-btn" @click="goToPlanSelector">
          {{ $t('register.changePlan') }}
        </button>
      </div>

      <div class="register-container">
        <h2>Registro de Usuario</h2>
        <form @submit.prevent="handleRegister" class="register-form">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              required
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="lastName">Apellido:</label>
            <input 
              type="text" 
              id="lastName" 
              v-model="formData.lastName" 
              required
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              required
              class="form-control"
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              v-model="formData.password" 
              required
              class="form-control"
            />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-register" :disabled="loading">
              {{ loading ? 'Registrando...' : 'Registrarse' }}
            </button>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>
        </form>

        <div class="login-link">
          {{ $t('register.account') }}
          <router-link to="/" class="login-button">
            {{ $t('register.login') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../services/authentication-api.service';
import {GoogleLogin} from "vue3-google-login";
import {useI18n} from "vue-i18n";

export default {
  components: {
    GoogleLogin
  },
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const {locale} = useI18n()
    const toggleLanguage = () => {
      locale.value = locale.value === 'es' ? 'en' : 'es'
    }

    const googleButtonConfig = ref({
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signup_with',
      shape: 'rectangular',
      logo_alignment: 'left',
      width: '300'
    });

    const loading = ref(false);
    const error = ref('');

    const formData = ref({
      name: '',
      lastName: '',
      email: '',
      password: ''
    });

    const handleRegister = async () => {
      try {
        loading.value = true;
        error.value = '';
        
        await authStore.register(formData.value);
        
        // Si el registro es exitoso, redirigir al login
        router.push('/login');
      } catch (err) {
        error.value = err.response?.data?.message || 'Error al registrar usuario';
      } finally {
        loading.value = false;
      }
    };

    const goToPlanSelector = () => {
      router.push('/seleccionar-plan');
    };

    return {
      formData,
      loading,
      error,
      handleRegister,
      googleButtonConfig,
      toggleLanguage,
      goToPlanSelector
    };
  }
};
</script>

<style scoped>
.register-wrapper {
  min-height: 100vh;
  background-color: #FFF5E0;
  display: flex;
  flex-direction: column;
}

.register-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #feeac5;
  color: #000000;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  justify-content: space-between;
}

.toolbar-button {
  background: none;
  border: none;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: auto;
}

.toolbar-spacer {
  flex: 1;
}

.toolbar-title {
  font-weight: 600;
  color: #333;
}

.language-selector {
  margin-left: auto;
  margin-right: 1rem;
}

.language-button {
  background: none;
  border: none;
  color: #302325;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem 0.8rem;
  border-radius: 20px;
  transition: all 0.3s;
}

.language-button:hover {
  background-color: rgba(255, 249, 231, 0.982);
}

.language-icon {
  font-size: 1.1rem;
}

.toolbar-user {
  color: #302325;
  font-weight: 600;
  margin-left: 1rem;
}

.register-content {
  display: flex;
  margin-top: 60px;
  flex: 1;
  padding: 2rem 0;
}

/* Sección de imagen */
.register-hero {
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;
}

.hero-image {
  max-width: 80%;
  max-height: 70vh;
  object-fit: contain;
}

.register-container {
  flex: 1;
  width: 100%;
  max-width: 500px;
  background-color: #FFF5E0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}

h2 {
  color: #333;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: 700;
  text-align: left;
}

.register-form {
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
  font-size: 0.95rem;
}

.form-control {
  width: 100%;
  padding: 0.9rem;
  border: 1px solid #D9D593;
  border-radius: 8px;
  font-size: 1rem;
}

.form-control:focus {
  border-color: #bc162a;
  box-shadow: 0 0 0 2px rgba(188, 22, 42, 0.2);
  outline: none;
}

.form-actions {
  margin-top: 1rem;
  text-align: center;
}

.btn-register {
  background-color: #c1121f;
  color: #ffffff;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.btn-register:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.btn-register:hover {
  background-color: #9e1223;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}

.login-link {
  margin-top: 2rem;
  text-align: center;
  color: #666;
}

.login-button {
  color: #c1121f;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.5rem;
}

.login-button:hover {
  text-decoration: underline;
}

/* Botón de Google */
.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: white;
  color: #302325;
  border: 1px solid #D9D593;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.social-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
}

/* Responsive */
@media (max-width: 768px) {
  .register-content {
    flex-direction: column;
    height: auto;
    padding: 1rem;
  }

  .register-hero {
    padding: 1rem;
    height: auto;
    flex: 0 0 auto;
    margin-bottom: 2rem;
  }

  .hero-image {
    max-width: 60%;
    max-height: 200px;
  }

  .register-container {
    padding: 1.5rem;
    max-width: 100%;
  }

  h2 {
    font-size: 1.5rem;
    text-align: center;
  }

  .btn-register, .google-btn {
    padding: 0.8rem;
  }

  .change-plan-btn {
    position: relative;
    bottom: auto;
    margin-top: 1rem;
  }
}

.change-plan-btn {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #c1121f;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.change-plan-btn:hover {
  background-color: #9e1223;
  transform: translateX(-50%) scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
</style>