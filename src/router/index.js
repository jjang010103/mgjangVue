import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/UserView.vue'
import ProductView from '../views/ProductView.vue'
import OrderView from '../views/OrderVue.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/user',
      name: 'user',
      component: UserView
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView
    }
  ]
})

export default router
