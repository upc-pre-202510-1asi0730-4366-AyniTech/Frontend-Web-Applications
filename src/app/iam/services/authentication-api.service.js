/*import http from '@/shared/http-common';
import axios from 'axios';
import {authHandlers} from "../../../../server/handlers.js";
import authApi from "@iam/services/authentication-api.service.js";

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
        return http.post('/auth/login', { email, password });
    }



    register(name, lastname, email,  password) {
        const user ={
            name,  lastname,email, password };

        return http.post(this.endpoint, user)
    }
}
export default new AuthService();*/

import http from '@/shared/http-common';

const API_BASE = import.meta.env.VITE_API_BASE_URL
const SIGN_IN = import.meta.env.VITE_SIGN_IN_PATH
const SIGN_UP = import.meta.env.VITE_SIGN_UP_PATH

export default class AuthenticationApiService {
    /**
     * Login user
     * @param {{email: string, password: string}} credentials
     * @returns {Promise<any>}
     */
    static async login(credentials) {
        const url = `${API_BASE}${SIGN_IN}`; // ej: http://localhost:3000/api/sign-in
        const res = await http.post(url, credentials);
        return res.data;
    }


    /**
     * Register user
     * @param {string} name
     * @param {string} lastname
     * @param {string} email
     * @param {string} password
     * @returns {Promise<any>}
     */
    static async register(name, lastname, email, password) {
        const url = `${API_BASE}${SIGN_UP}`
        const user = { name, lastname, email, password }
        const res = await http.post(url, user)
        return res.data
    }
}
