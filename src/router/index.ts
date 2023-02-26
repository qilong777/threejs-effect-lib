import { createRouter, createWebHistory } from 'vue-router'
import Stage from '../views/stage/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/stage'
    },
    {
      path: '/stage',
      name: 'stage',
      component: Stage
    }
  ]
})

export default router
