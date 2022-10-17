
import axios from "axios";
import { getToken } from './../auth/index';
export const base_url="http://localhost:8080/api/v1";

export const myAxios=axios.create({
        baseURL:base_url
});

export const privateAxios=axios.create({
        baseURL:base_url
});

privateAxios.interceptors.request.use((config)=>{
        const token=getToken()
        config.headers.common.Authorization=`Bearer ${token}`
        return config;
});


