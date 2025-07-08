import axios from 'axios'

const httpInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
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