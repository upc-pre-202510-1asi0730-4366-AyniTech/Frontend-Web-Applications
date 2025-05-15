import { defineStore } from 'pinia';
import { ref } from 'vue';
import AuthService from '@iam/services/authentication-api.service.js'
import {useRouter} from "vue-router";


export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const user = ref(null);
    const isAuthenticated = ref(false);

    const register = async (userData) => {
        try {
            const response = await AuthService.register(userData);
            user.value = response.data.user;
            isAuthenticated.value = true;
            localStorage.setItem('authUser', JSON.stringify(response.data.user));
            router.push('/home');
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    const login = async (credentials) => {
        try {
            const response = await AuthService.login(credentials);
            user.value = response.data.user;
            isAuthenticated.value = true;
            localStorage.setItem('authUser', JSON.stringify(response.data.user));
            router.push('/home');
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        user.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('authUser');
    };

    const registerWithGoogle = async (googleToken) => {
        try {
            const response = await AuthService.registerWithGoogle(googleToken);
            user.value = response.data.user;
            isAuthenticated.value = true;
            return response.data;
        }catch(error) {
            console.error('Google registration error:',error);
            throw error;
        }
    };

    return {
        user,
        isAuthenticated,
        register,
        registerWithGoogle,
        logout,
        login
    };
});