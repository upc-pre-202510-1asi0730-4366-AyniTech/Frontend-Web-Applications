import { defineStore } from 'pinia';
import { ref } from 'vue';
import AuthService from '@/app/iam/services/authentication-api.service.js'


export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const isAuthenticated = ref(false);

    const register = async (userData) => {
        try {
            const response = await AuthService.register(userData);
            user.value = response.data.user;
            isAuthenticated.value = true;
            return response;
        } catch (error) {
            throw error;
        }
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
        registerWithGoogle
    };
});