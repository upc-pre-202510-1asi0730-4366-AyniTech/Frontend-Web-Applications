import axios from 'axios'
import { API_CONFIG, CURRENT_ENV } from '@config/api.config'

const httpInstance = axios.create({
    baseURL: API_CONFIG[CURRENT_ENV].BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
})

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
);

export default httpInstance