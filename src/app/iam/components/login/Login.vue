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
  <div class="login-container">
    <h1>{{ $t('login.login') }}</h1>

    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="email">{{ $t('login.email') }}</label>
        <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Ingresa tu correo electrónico"
            required
        />
      </div>

      <div class="form-group">
        <label for="password">{{ $t('login.password') }}</label>
        <input
            type="password"
            id="password"
            v-model="password"
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

      <button type="submit" class="login-button">{{ $t('login.login') }}</button>

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
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.js';
import {useI18n} from "vue-i18n";

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const rememberMe = ref(false);
    const router = useRouter();
    const authStore = useAuthStore();
    const {locale} = useI18n()

    const toggleLanguage = () => {
      locale.value = locale.value === 'es' ? 'en' : 'es'
    }

    const handleLogin = async () => {
      try {
        await authStore.login({
          email: email.value,
          password: password.value,
          remember: rememberMe.value
        });
        router.push('/');
      } catch (error) {
        console.error('Login error:', error);
        // Aquí  manejar el error, mostrar notificación, etc.
      }
    };

    const loginWithGoogle = () => {
      // Implementar lógica de autenticación con Google
      console.log('Login with Google');
    };

    return {
      email,
      password,
      rememberMe,
      handleLogin,
      loginWithGoogle,
      toggleLanguage
    };
  }
};
</script>

<style scoped>
.register-wrapper {
  min-height: 200vh;
  background-color: #F5E1A4;
}
.register-toolbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f5e1a4;
  color: #000000;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  justify-content: space-between;
}

.toolbar-button {
  background: none;
  border: none;
  color: #302325;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-right: auto;
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
  background-color: rgba(255,255,255,0.2);
}

.language-icon {
  font-size: 1.1rem;
}
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #302325;
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
  color: #302325;
  font-weight: bold;
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
  color: #020fff;
  text-decoration: none;
  font-size: 0.9rem;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  background-color: #EE7F27;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #BC162A;
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
  color: #302325;
  padding: 0.8rem;
  border: 1px solid #D9D593;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.google-button:hover {
  background-color: #F5E1A4;
}

.google-button img {
  width: 20px;
  height: 20px;
}

.register-link {
  margin-top: 1.5rem;
  color: #302325;
}

.register-link a {
  color: #BC162A;
  text-decoration: none;
  font-weight: bold;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>