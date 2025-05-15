<template>
  <div class="register-wrapper">
      <div class="register-toolbar">
        <button @click="$router.back()" class="toolbar-button">
          &larr; {{ $t('toolbar.back') }}
        </button>

        <div class="toolbar-spacer"></div>
        <div class="toolbar-title">{{ $t('toolbar.register') }}</div>
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
        const {credentials} = response;
        const userData = await authStore.registerWithGoogle(credential);

        router.push('/login');
      }catch(error) {
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
        await authStore.register({
          firstName: formData.value.nombres,
          lastName: formData.value.apellidos,
          email: formData.value.email,
          password: formData.value.password
        });

        router.push('/');
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

.toolbar-user {
  color: #302325;
  font-weight: 600;
  margin-left: 1rem;
}
.register-content {
  display: flex;
  height: calc(100vh - 60px);
}

/* Sección de imagen */
.register-hero {
  flex: 0 0 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.hero-image {
  max-width: 80%;
  max-height: 70vh;
  object-fit: contain;
}

.register-container {
  flex: 1;
  width: 100%;
  max-width: 400px;
  background-color: #f5e1a4;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
  color: #302325;
  margin-bottom: 2rem;
  font-size: 1.8rem;
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
  color: #302325;
  font-weight: 600;
  font-size: 0.95rem;
}
input {
  width: 100%;
  padding: 0.9rem;
  border: 1px solid #D9D593;
  border-radius: 8px;
  font-size: 1rem;
  color: black;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  border: 1px solid #d9d593;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  background-color: #ffffff;
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
  background-color: #bc162a;
  color: #ffffff;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
  letter-spacing: 0.5px;
}

.submit-btn:hover {
  background-color: #ee7f27;
}


.login-link a {
  color: #646cff;
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
  .register-wrapper {
    flex-direction: column;
    height: auto;
  }

  .register-hero {
    padding: 1rem;
    height: 200px;
  }

  .register-container {
    padding: 2rem;
  }

  h1 {
    font-size: 1.7rem;
  }

  .submit-btn, .google-btn {
    padding: 1rem;
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
  background-color: #ee7f27;
  color: white;
  padding: 8px 20px;
  border: none;
  border-radius: 20px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s ease;
}

.change-plan-btn:hover {
  background-color: #9e1223;
  transform: translateX(-50%) scale(1.05);
}
</style>