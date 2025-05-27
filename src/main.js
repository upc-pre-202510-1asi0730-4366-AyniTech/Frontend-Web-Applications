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

app.config.globalProperties.$filters = {
    currency(value) {
        if (!value) return '$0.00'
        return `$${parseFloat(value).toFixed(2)}`
    },
    formatDate(date) {
        if (!date) return ''
        // Formato DD/MM/YYYY
        const [day, month, year] = date.split('/')
        return `${day}/${month}/${year}`
    }
}

app.mount('#app')

if (import.meta.hot) {
    import.meta.hot.accept()
}