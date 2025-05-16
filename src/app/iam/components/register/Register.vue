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
        <button class="change-plan-btn">{{ $t('register.changePlan') }}
        </button>
      </div>

      <div class="register-container">
        <h1>{{ $t('register.title') }}</h1>

        <form @submit.prevent="handleSubmit" class="register-form">
          <div class="form-group">
            <label>{{ $t('register.firstName') }}</label>
            <input
                type="text"
                id ="nombres"
                v-model="formData.nombres"
                placeholder= "Ingresa tus nombres"
                required
            >
          </div>

          <div class="form-group">
            <label>{{ $t('register.lastName') }}</label>
            <input
                type="text"
                id="apellidos"
                v-model="formData.apellidos"
                placeholder="Ingresa tus apellidos"
                required
            >
          </div>

          <div class="form-group">
            <label>{{ $t('register.email') }}</label>
            <input
                type="email"
                id="email"
                v-model="formData.email"
                placeholder="Ingresa tu correo electrónico"
                required
            >
          </div>

          <div class="form-group">
            <label>{{ $t('register.password') }}</label>
            <input
                type="password"
                id="password"
                v-model="formData.password"
                placeholder="Ingresa tu contraseña"
                required
            >
          </div>

          <div class="form-group">
            <label>{{ $t('register.confirmPassword') }}</label>
            <input
                type="password"
                id="confirmPassword"
                v-model="formData.confirmPassword"
                placeholder="Ingresa tu contraseña"
                required
            >
          </div>

          <div class="checkbox-group">
            <input
                type="checkbox"
                id="terms"
                v-model="formData.acceptedTerms"
                required
            >
            <label>{{ $t('register.conditions') }}</label>
          </div>

          <div class="social-login">
            <div class="divider">
              <span class="divider-line"></span>
              <span class="divider-text">o</span>
              <span class="divider-line"></span>
            </div>

            <GoogleLogin
                :callback="handleGoogleSignIn"
                :buttonConfig="googleButtonConfig"
                class="google-login-btn"
            />
          </div>

          <button type="submit" class="submit-btn">{{ $t('register.submit') }}
          </button>
        </form>

        <div class="login-link">
          {{ $t('register.account') }} <router-link to="/login">{{ $t('register.login') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
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

    const formData = ref({
      nombres: '',
      apellidos: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptedTerms: false,
      googleSignup: false
    });
    const handleGoogleSignIn = async (response) => {
      try {
        router.push('/login');
      } catch(error) {
        console.error('Google Sign-In error:', error);
        alert('Error al registrarse con Google. Por favor intenta nuevamente.');
      }
    };

    const handleSubmit = async () => {
      if (formData.value.password !== formData.value.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      try {
        router.push('/login');
      } catch (error) {
        console.error('Registration error:', error);
        alert('Error en el registro. Por favor intenta nuevamente.');
      }
    };

    return {
      formData,
      handleSubmit,
      googleButtonConfig,
      handleGoogleSignIn,
      toggleLanguage
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

h1 {
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
input {
  width: 100%;
  padding: 0.9rem;
  border: 1px solid #D9D593;
  border-radius: 8px;
  font-size: 1rem;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  border: 1px solid #d9d593;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  background-color: #ffffff;
  color: black;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #bc162a;
  box-shadow: 0 0 0 2px rgba(188, 22, 42, 0.2);
  outline: none;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 1rem 0;
}

.checkbox-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: #ee7f27;
}
.checkbox-group label {
  font-weight: 500;
  color: #302325;
  font-size: 0.9rem;
}

.submit-btn {
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
  margin-top: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-btn:hover {
  background-color: #9e1223;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.login-link {
  margin-top: 1.5rem;
  color: #333;
  text-align: center;
}

.login-link a {
  color: #c1121f;
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.3rem;
}

.login-link a:hover {
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

  h1 {
    font-size: 1.5rem;
    text-align: center;
  }

  .submit-btn, .google-btn {
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