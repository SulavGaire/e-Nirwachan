import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
    // baseURL: 'http://192.168.132.23:8000',
    baseURL: 'http://192.168.16.101:8000',
    timeout: 10000,
});

export default instance;
