import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/auth-layout.vue'),
      children: [
        {
          path: '/',
          name: 'Auth',
          component: () => import('@/pages/auth-page.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('@/layouts/dashboard-layout.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/pages/dashboard-page.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Auth' && !localStorage.getItem('pb_auth')) {
    next({ name: 'Auth' })
  } else {
    next()
  }
})

export default router
