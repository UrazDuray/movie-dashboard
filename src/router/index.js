import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: HomeView
    },
    {
      path: '/film/:id',
      name: 'film',
      component: () => import('../views/FilmView.vue')
    },

  ]
})

export default router
