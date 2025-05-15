import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {Button} from 'primevue'
import PrimeVue from 'primevue/config'
import i18n from "./i18n.js";
import 'primeicons/primeicons.css';

const app = createApp(App)
app
    .use(PrimeVue, {ripple: true})
    .component('pv-button', Button)
    .use(i18n)
    .use(router)
    .mount('#app')
