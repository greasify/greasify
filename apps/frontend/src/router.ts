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
          name: 'auth',
          component: () => import('@/pages/auth-page.vue')
        },
        {
          path: '/auth/callback',
          component: () => import('@/pages/auth-callback-page.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      component: () => import('@/layouts/dashboard-layout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/pages/dashboard-page.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAuth && !localStorage.getItem('pb_auth')) {
    return next({ name: 'auth' })
  }

  next()
})

export default router
