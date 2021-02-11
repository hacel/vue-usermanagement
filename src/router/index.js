import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
Vue.use(VueRouter)


const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/users/detail/:id',
    name: 'user_detail',
    component: User,
    props: true,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/users/edit/:id',
    name: 'user_edit',
    component: UserEdit,
    props: true,
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/users/new',
    name: 'user_new',
    component: UserEdit,
    props: true,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
