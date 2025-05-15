import axios from '@/shared/http-common';

class AuthService {
    register(userData) {
        return axios.post('/auth/register', {
            first_name: userData.firstName,
            last_name: userData.lastName,
            email: userData.email,
            password: userData.password
        });
    }

    registerWithGoogle(googleToken) {
        return axios.post('/auth/registerWithGoogle', {
            token: googleToken,
        });
    }

    // Otros métodos de autenticación
}
export default new AuthService();
