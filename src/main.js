import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import GoogleSignInPlugin from 'vue3-google-login'
import { createPinia } from 'pinia'
import {createI18n, useI18n} from "vue-i18n";
import {Button} from 'primevue'
import PrimeVue from 'primevue/config'
import i18n from "./i18n.js";
import 'primeicons/primeicons.css';
import es from '@/locals/en.json'
import en from '@/locals/es.json'

const app = createApp(App)

const i18n = createI18n({
    legacy: false,
    locale: 'es',
    fallbackLocale: 'en',
    messages: { en, es }
})

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

const pinia = createPinia()
app.use(pinia)
app.use(PrimeVue, {ripple: true})
app.component('pv-button', Button)
app.use(router)
app.use(i18n)
// Configurar Google Sign-In
app.use(GoogleSignInPlugin, {
    clientId: '151103277100-bg90frf3bb9cpcultp80btj8222ld9bn.apps.googleusercontent.com'
})
