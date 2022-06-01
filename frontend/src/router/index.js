import { createRouter, createWebHistory } from 'vue-router'
import store  from '../store/index'
const routes = [
  {
    path: '/',
    name: 'Home',
    redirect:'/login',
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'), 
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { requiresAuth: true },
    component: () => import('../views/admin/AdminDashboard.vue'),
    children:[
    
      {
        path:'student',
        name:'student',
        component: () => import('../views/admin/Student.vue'),
      },
      {
        path:'room',
        name:'room',
        component: () => import('../views/admin/Room.vue'),
      },
      {
        path:'addroom',
        name:'addroom',
        component: () => import('../views/admin/AddRoom.vue'),
      },
      {
        path:'allocate',
        name:'allocate',
        component: () => import('../views/admin/AllocateRoom.vue'),
      }

    ]

  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    // meta: { requiresAuth: true }
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach(async (to, from, next) => {
  if (!store.getters['user/token'] && to.path !== '/login' && to.matched.some((record) => record.meta.requiresAuth) ) {
    next('/login')
  }
  else{
    next() 
  }
});


export default router
