import { createApp } from 'vue'
import Notifications from '@kyvg/vue3-notification'

import App from './App.vue'
import router from './router'
import store from './store'


createApp(App).use(Notifications).use(store).use(router).mount('#app')
