import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.31.0.41:3333'
});

export default api;