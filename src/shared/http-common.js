import axios from 'axios';
import { API_CONFIG, CURRENT_ENV } from '../../api.config';

const token = localStorage.getItem('token');

const http = axios.create({
    baseURL: API_CONFIG[CURRENT_ENV].BASE_URL,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000 // 10 segundos de timeout
});

// Interceptor para añadir el token a las peticiones
http.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Log de la petición para debugging
        console.log('Realizando petición a:', config.baseURL + config.url);
        return config;
    },
    (error) => {
        console.error('Error en la petición:', error);
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de autenticación y red
http.interceptors.response.use(
    (response) => {
        console.log('Respuesta exitosa de:', response.config.url);
        return response;
    },
    (error) => {
        if (error.response) {
            // El servidor respondió con un código de error
            console.error('Error del servidor:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
            
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
        } else if (error.request) {
            // La petición fue hecha pero no se recibió respuesta
            console.error('Error de red - No hay respuesta:', {
                url: error.config?.url,
                method: error.config?.method,
                baseURL: error.config?.baseURL
            });
        } else {
            // Algo sucedió en la configuración de la petición
            console.error('Error de configuración:', error.message);
        }
        return Promise.reject(error);
    }
);

export default http;