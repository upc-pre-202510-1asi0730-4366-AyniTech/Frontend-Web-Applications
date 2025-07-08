import axios from 'axios'
import { API_CONFIG, CURRENT_ENV } from '@config/api.config'

const httpInstance = axios.create({
    baseURL: API_CONFIG[CURRENT_ENV].BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

<<<<<<< HEAD
// Interceptor para agregar el token JWT automáticamente
httpInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // O el nombre que uses para guardar el JWT
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
=======
// Interceptor para agregar el token de autenticación
httpInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
>>>>>>> ae2e6ceaf66dc36fa188ea4af8a8fd77b5caec82
);

export default httpInstance