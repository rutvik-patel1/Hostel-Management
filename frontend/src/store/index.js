import { createStore } from 'vuex';
import createPersistentStore from 'vuex-persistedstate';
import user from "./modules/user"
const store = createStore({
    plugins: [
      createPersistentStore({
        storage:window.sessionStorage
      })
    ],
    modules:{
      user
    }
})

export default store;