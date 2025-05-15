import { createApp } from 'vue'
import './style.css'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import i18n from './i18n.js'
import router from '../src/router/index.js'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(i18n)
app.mount('#app')
