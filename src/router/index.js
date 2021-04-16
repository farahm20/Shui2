import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Flow from '../views/Flow.vue'
import Login from '../views/Login.vue'
import UserRemoved from '../views/UserRemoved.vue'
import NewStream from '../views/NewStream.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/flow',
    name: 'Flow',
    component: Flow
  },
  {
    path: '/userRemoved',
    name: 'UserRemoved',
    component: UserRemoved
  },
  {
    path: '/newStream',
    name: 'NewStream',
    component: NewStream
  }
]

const router = new VueRouter({
  routes
})

export default router
