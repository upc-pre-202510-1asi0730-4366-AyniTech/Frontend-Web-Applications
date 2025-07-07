<template>
  <div class="login-wrapper">
    <div class="register-toolbar">


      <div class="language-switcher">
        <button @click="toggleLanguage" class="language-button">
          <span class="language-icon">🌐</span>
          <span class="language-text">{{ $t('toolbar.language') }}</span>
        </button>
      </div>
    </div>

    <div class="login-container">
      <h1>{{ $t('login.login') }}</h1>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="email">{{ $t('login.email') }}</label>
          <input 
            type="email" 
            id="email" 
            v-model="formData.email"
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">{{ $t('login.password') }}</label>
          <input 
            type="password" 
            id="password" 
            v-model="formData.password"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <div class="options">
          <div class="remember-me">
            <input type="checkbox" id="remember" v-model="rememberMe" />
            <label>{{ $t('login.remember') }}</label>
          </div>

          <router-link to="/forgot-password" class="forgot-password">
            {{ $t('login.password?') }}
          </router-link>
        </div>

        <button type="submit" class="login-button" :disabled="loading">
          {{ loading ? 'Iniciando sesión...' : $t('login.login') }}
        </button>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="divider">o</div>

        <button type="button" class="google-button" @click="loginWithGoogle">
          <img src="@/assets/google-icon.png" alt="Google Icon" />
          {{ $t('login.google') }}
        </button>
      </form>

      <div class="register-link">
        {{ $t('login.account') }}
        <router-link to="/register" class="register-button">
          {{ $t('login.submit') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../services/authentication-api.service';
import { useI18n } from "vue-i18n";

export default {
  name: 'Login',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const loading = ref(false);
    const error = ref('');
    const rememberMe = ref(false);
    const { locale } = useI18n();

    const formData = ref({
      email: '',
      password: ''
    });

    const toggleLanguage = () => {
      locale.value = locale.value === 'es' ? 'en' : 'es';
    };

    const handleLogin = async () => {
      try {
        loading.value = true;
        error.value = '';
        
        await authStore.login(formData.value);
        
        // Redirigir al dashboard después del login exitoso
        router.push('/dashboard');
      } catch (err) {
        error.value = err.message || 'Error al iniciar sesión';
      } finally {
        loading.value = false;
      }
    };

    const loginWithGoogle = () => {
      // Implementación pendiente
      console.log('Login con Google pendiente de implementar');
    };

    return {
      formData,
      loading,
      error,
      rememberMe,
      handleLogin,
      loginWithGoogle,
      toggleLanguage
    };
  }
};
</script>

<style scoped>
.login-wrapper {
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

.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  margin-top: 80px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
}

label {
  color: #333;
  font-weight: 600;
}

input[type="email"],
input[type="password"] {
  padding: 0.8rem;
  border: 1px solid #D9D593;
  border-radius: 4px;
  background-color: #ffffff;
  color: black;
}

input[type="email"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #ee7f27;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.forgot-password {
  color: #c1121f;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  background-color: #c1121f;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-button:hover {
  background-color: #9e1223;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.login-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
}

.error-message {
  color: #c1121f;
  background-color: #ffe6e6;
  padding: 0.8rem;
  border-radius: 4px;
  text-align: center;
}

.divider {
  margin: 1.5rem 0;
  text-align: center;
  position: relative;
  color: #666;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: #ddd;
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.google-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background-color: white;
  border: 1px solid #ddd;
  padding: 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.google-button:hover {
  background-color: #f5f5f5;
}

.google-button img {
  width: 24px;
  height: 24px;
}

.register-link {
  margin-top: 2rem;
  text-align: center;
  color: #666;
}

.register-button {
  color: #c1121f;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.5rem;
}

.register-button:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .login-container {
    padding: 1rem;
    margin-top: 40px;
  }

  h1 {
    margin-bottom: 1.5rem;
  }

  .login-button, .google-button {
    padding: 0.8rem;
  }
}
</style>