import axios from 'axios';
import store from '../store/index'

const axiosInstance = axios.create({
    baseURL : process.env.VUE_APP_RESTURL
})

axiosInstance.interceptors.request.use(
    async (request)=>{
        console.log(store.getters['user/token'])
    if (await store.getters['user/token']) {
        request.headers["Authorization"] = "Bearer " + store.getters['user/token'];
      }
      request.headers['Access-Control-Allow-Origin'] = '*'
      return request;
    },
    (error) => {
      console.log("error from interceptor request",error);
      return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("error from interceptor response",error)
        return Promise.reject(error);
    }

)

export default axiosInstance