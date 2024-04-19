import axios from "axios";
import { useTokenStore } from '@/stores/user'

export class Backend {

    static getBaseUrl() {
        return import.meta.env.VITE_URL_ENDPOINT;

    }

    static async post(path: string, data?: unknown) {
        const axiosClient = axios.create();
        axiosClient.interceptors.request.use(function (config) {
            const tokenStore = useTokenStore()
            if (tokenStore.getToken) {
                config.headers.Authorization = `Bearer ${tokenStore.getToken}`;
            }
            config.headers.Accept = "application/json";
            return config;
        });
        const result = await axiosClient.post(this.getBaseUrl() + path, data).then(function (response) {
            return response.data;
        }).catch(function (error) {
            return error.response;
        });
        return result.data;

    }

    static async get(path: string) {
        const axiosClient = axios.create();
        axiosClient.interceptors.request.use(function (config) {
            const tokenStore = useTokenStore()
            if (tokenStore.getToken) {
                config.headers.Authorization = `Bearer ${tokenStore.getToken}`;
            }
            config.headers.Accept = "application/json";
            return config;
        });
        const result = await axiosClient.get(this.getBaseUrl() + path);
        return result.data;
    }

}
