import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const http = axios.create({
    'baseURL': API_BASE_URL
});

http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
http.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';

export default http;