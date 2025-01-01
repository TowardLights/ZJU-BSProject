import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
    },
    {
      path: '/shopping',
      name: 'shopping',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ShoppingView.vue'),
    },
    {
      path: '/user-center',
      name: 'user-center',
      component: () => import('../views/UserCenterView.vue'),
    },
    {
      path: '/history-price',
      name: 'history-price',
      component: () => import('../views/HistoryPriceView.vue'),
    }
  ],
})

export default router
