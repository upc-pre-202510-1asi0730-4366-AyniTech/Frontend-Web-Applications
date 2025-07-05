import axios from 'axios';
import { API_CONFIG } from '../../api.config';

const http = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
    }
});

export default http;