import router from "@/router";
import axios from "axios";
const url = 'https://sduback1.pythonanywhere.com/'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config
})

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    const { status } = error.response;
    console.log(status);
    
    if (status === 401) {
        router.push('/')
    }
    throw error;
});

export const request = (params: any) => {
    return axios({
        baseURL: url,
        ...params
    })
}