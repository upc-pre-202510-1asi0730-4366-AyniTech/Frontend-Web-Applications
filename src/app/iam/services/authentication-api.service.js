import http from '@/shared/http-common';
import axios from 'axios';
import {authHandlers} from "../../../../server/handlers.js";

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

    // Otros métodos de autenticación
}
export class AuthenticationApiService {
    constructor() {
        this.endpoint = '/users';
    }

    login(email, password) {
        return http.get(`${this.endpoint}?email=${email}&password=${password}`);
    }



    register(name, lastname, email,  password) {
        const user ={
            name,  lastname,email, password };

        return http.post(this.endpoint, user)
    }
}
export default new AuthService();
