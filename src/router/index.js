import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Users from '../views/Users.vue'
import User from '../views/User.vue'
import UserEdit from '../views/UserEdit.vue'
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
    path: '/users/detail/:id',
    name: 'user_detail',
    component: User,
    props: true,
  },
  {
    path: '/users/edit/:id',
    name: 'user_edit',
    component: UserEdit,
    props: true,
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
