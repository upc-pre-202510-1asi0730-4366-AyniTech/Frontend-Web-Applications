<template>
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
        Iniciar con Google
      </button>
    </form>

    <div class="register-link">
      {{ $t('login.account') }} <router-link to="/register">{{ $t('login.submit') }}</router-link>
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
        
        const response = await authStore.login(formData.value);
        
        // Redirigir según el rol del usuario
        if (response.role === 'Admin') {
          router.push('/admin/dashboard');
        } else if (response.role === 'Employee') {
          router.push('/dashboard');
        }
      } catch (err) {
        error.value = err.response?.data?.message || 'Error al iniciar sesión';
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
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}

.divider {
  position: relative;
  margin: 1rem 0;
  color: #302325;
}

.divider::before,
.divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background-color: #D9D593;
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
  gap: 0.5rem;
  background-color: white;
  color: #333;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.google-button:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.google-button img {
  width: 20px;
  height: 20px;
}

.register-link {
  margin-top: 1.5rem;
  color: #333;
}

.register-link a {
  color: #c1121f;
  text-decoration: none;
  font-weight: 600;
}

.register-link a:hover {
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