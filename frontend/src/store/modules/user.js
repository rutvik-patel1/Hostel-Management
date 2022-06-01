import { login } from '../../api/auth'

const state = {
    token:"",
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
        // console.log(credentials)
        const { email , password } = credentials
        return new Promise((resolve,reject) => {
            login({ email: email, password: password })
                .then((response) => {
                    const { data } = response;
                    console.log(data)
                    commit("SET_TOKEN", data.token);
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
    logout({commit}){

    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}