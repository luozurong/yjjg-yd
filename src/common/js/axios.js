import axios from 'axios'
import baseURL from '../../config/interfaceUrl'

const service = axios.create({
    baseURL: baseURL,              
    timeout: 300000                
});

service.interceptors.request.use(config => {
    return config;
},error => {});

service.interceptors.response.use(response => {
    return response.data;          //返回数据
},error => {})

export default service