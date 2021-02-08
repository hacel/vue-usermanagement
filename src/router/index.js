import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  },
  {
    path: '/users/:id',
    name: 'user',
    component: User
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
