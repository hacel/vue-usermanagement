import Vue from 'vue'
import store from '../store'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
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
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/users',
    name: 'users',
    component: Users,
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

router.beforeEach((to, from, next) => {
  let public_routes = ['index', 'login']
  // console.log(to)
  // console.log(store.getters.isAuthenticated)
  if (!public_routes.includes(to.name) && !store.getters.isAuthenticated) next({ name: 'login' })
  // else if (to.name == 'login' && store.getters.isAuthenticated) next({ name: 'index' })
  // desnt work i think because of the same problem that makes refreshing take you to login
  // isAuthenticated gets read before state.token is initialized
  else next()
})

export default router
