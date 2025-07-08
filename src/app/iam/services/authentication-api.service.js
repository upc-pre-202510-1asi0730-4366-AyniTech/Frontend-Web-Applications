import http from '@/shared/http-common';
import axios from 'axios';
import {authHandlers} from "../../../../server/handlers.js";
import { API_CONFIG, CURRENT_ENV } from '../../../../api.config';
import { defineStore } from 'pinia';

const useMockAPI = import.meta.env.VITE_USE_MOCK_API === 'true';

class AuthService {
    async register(userData){
        if(useMockAPI){
            return Promise.resolve(authHandlers.register( {
                first_name: userData.firstName,
                last_name: userData.lastName,
                email: userData.email,
                password: userData.password
            }));
        }
        return http.post('/auth/register', {
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            password: userData.password
        });
    }
    async login(credentials) {
        if (useMockAPI) {
            return Promise.resolve(authHandlers.login(credentials));
        }
        return http.post('/auth/login', credentials);
    }

    registerWithGoogle(googleToken) {
        return axios.post('/auth/registerWithGoogle', {
            token: googleToken,
        });
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => {
        // Intentar recuperar el estado de autenticación del localStorage
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');

        return {
            user: storedUser ? JSON.parse(storedUser) : null,
            token: storedToken || null,
            role: storedRole || null
        };
    },

    getters: {
        isAuthenticated: (state) => !!state.token && !!state.user,
        isEmployee: (state) => state.role === 'Employee',
        isAdmin: (state) => state.role === 'Admin',
        currentUser: (state) => state.user
    },

    actions: {
        async register(userData) {
            try {
                console.log('Intentando registrar usuario:', userData);
                const response = await http.post(API_CONFIG[CURRENT_ENV].ENDPOINTS.AUTH.SIGN_UP, {
                    name: userData.name,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: userData.password
                });
                
                console.log('Registro exitoso:', response.data);
                return response.data;
            } catch (error) {
                console.error('Error detallado del registro:', error.response || error);
                if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
                    throw new Error('No se pudo conectar con el servidor. Por favor, verifica que el backend esté corriendo en localhost:5159');
                }
                throw error;
            }
        },

        async login(credentials) {
            try {
                console.log('Intentando iniciar sesión:', credentials.email);
                const response = await http.post(API_CONFIG[CURRENT_ENV].ENDPOINTS.AUTH.SIGN_IN, {
                    email: credentials.email,
                    password: credentials.password
                });

                const { token, role, id, name, lastName } = response.data;
                
                // Guardar datos del usuario
                this.user = { id, name, lastName, role };
                this.token = token;
                this.role = role;

                // Guardar en localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('user', JSON.stringify(this.user));

                console.log('Login exitoso para:', name);
                return response.data;
            } catch (error) {
                console.error('Error detallado del login:', error.response || error);
                if (error.response?.status === 0 || error.code === 'ERR_NETWORK') {
                    throw new Error('No se pudo conectar con el servidor. Por favor, verifica que el backend esté corriendo en localhost:5159');
                } else if (error.response?.status === 401) {
                    throw new Error('Email o contraseña incorrectos');
                }
                throw error;
            }
        },

        logout() {
            // Limpiar estado
            this.user = null;
            this.token = null;
            this.role = null;

            // Limpiar localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
        },

        // Cargar usuario desde localStorage al iniciar la app
        initializeAuth() {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                this.user = JSON.parse(storedUser);
                this.token = localStorage.getItem('token');
                this.role = localStorage.getItem('role');
            }
        },

        async changeUserRole(userId, newRole) {
            try {
                const response = await http.put('/api/v1/authentication/change-role', {
                    userId,
                    newRole
                });
                
                if (response.data) {
                    // Actualizar el rol en el estado si el cambio fue exitoso
                    if (this.user && this.user.id === userId) {
                        this.user.role = newRole;
                    }
                }
                return response.data;
            } catch (error) {
                console.error('Error al cambiar el rol:', error);
                throw error;
            }
        }
    }
});

export default new AuthService();
