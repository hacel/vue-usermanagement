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
    meta: { requiresAuth: true }
  },
  {
    path: '/users/detail/:id',
    name: 'user_detail',
    component: User,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/users/edit/:id',
    name: 'user_edit',
    component: UserEdit,
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/users/new',
    name: 'user_new',
    component: UserEdit,
    meta: { requiresAuth: true },
    props: true,
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.getters.isAuthenticated) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.name === 'login') {
    next({ name: 'index' })
  } else {
    next()
  }
})

export default router
