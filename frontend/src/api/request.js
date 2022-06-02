import axios from 'axios';
import store from '../store/index'
import Cookies from 'js-cookie'
const axiosInstance = axios.create({
    baseURL : process.env.VUE_APP_RESTURL
})

axiosInstance.interceptors.request.use(
    async (request)=>{
        // console.log(store.getters['user/token'])
        const token = Cookies.get('token')
    if (token) {
        request.headers["Authorization"] = "Bearer " + token;
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