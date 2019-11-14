import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Catagory = () => import('../views/category/Catagory.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Profile = () => import('../views/profile/Profile.vue')

Vue.use(Router)

const routes = [
  {
    path: "/",
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Catagory

  }, {
    path: '/cart',
    component: Cart
  }, {
    path: '/profile',
    component: Profile
  }
]
const router = new Router({
  // 配置路由和组件之间的关系
  routes,
  mode:'history',
  linkActiveClass:'active'
})
export default router
