import { createRouter, createWebHistory, type RouteRecordRaw, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Landing', component: () => import('../views/Landing.vue') },
  { path: '/signin', name: 'SignIn', component: () => import('../views/auth/SignIn.vue'), meta: { requiresGuest: true } },
  { path: '/signup', name: 'SignUp', component: () => import('../views/auth/SignUp.vue'), meta: { requiresGuest: true } },
  { path: '/dashboard', name: 'Dashboard', component: () => import('../views/dashboard/Dashboard.vue'), meta: { requiresAuth: true } },
  { path: '/tickets', name: 'Tickets', component: () => import('../views/dashboard/Tickets.vue'), meta: { requiresAuth: true } },
  { path: '/tickets/:id', name: 'TicketDetail', component: () => import('../views/dashboard/ViewAndEditTicket.vue'), meta: { requiresAuth: true } },
  { path: '/create-ticket', name: 'CreateTicket', component: () => import('../views/dashboard/CreateTicket.vue'), meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../components/ui/ErrorPage.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  const authStore = useAuthStore()
  console.log(from.fullPath)
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/signin')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
