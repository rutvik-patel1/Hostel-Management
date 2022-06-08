import { details, login } from '../../api/auth'
import Cookies from 'js-cookie'
const state = {
    token: Cookies.get('token'),
    email:"",
    isAdmin:false,
}
const getters = {
    token(state){
        return state.token
    },
    email(state){
        return state.email
    },
    isAdmin(state){
        return state.isAdmin
    }
}
const mutations = {
    SET_TOKEN(state,token){
      state.token = token
    },
    SET_EMAIL(state,email){
        state.email = email
    },
    SET_ISADMIN(state,payload){
        state.isAdmin = payload
    },
    RESET_STATE(state){
        state.token = ""
        state.email = ""
        state.isAdmin = false
    }
}
const actions = {
    login({commit},credentials){
    
        const { email , password } = credentials
        return new Promise((resolve,reject) => {
            const payload = { 
                email: email, 
                password: password
             }
            login(payload).then((response) =>{ 
                    const data  = response.data;
                    console.log("data",data)
                    commit("SET_TOKEN", data.token);
                    Cookies.set('token',data.token,{expires: 1});
                    commit("SET_EMAIL",email)
                    if(data.role == 'admin'){
                        commit("SET_ISADMIN",true)
                    }
                    
                })
                .then((data)=>{
                    resolve(data);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    },
    getInfo({ commit}) {
        return new Promise((resolve, reject) => {
            details()
                .then((response) => {
                    const data  = response.data.data;
                    console.log("ahdfsdbffdgsjdfgbjdslfbgajf",data)
                    commit("SET_EMAIL",data.email)
                    if(data.role == 'admin'){
                        commit("SET_ISADMIN",true)
                    }
                    resolve(data)
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}