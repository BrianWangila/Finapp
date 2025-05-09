import { createRouter, createWebHistory } from 'vue-router'
import AllTransactions from '../views/AllTransactions.vue'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../components/HomePage.vue'
import SignupPage from '../views/SignupPage.vue'
import MyCards from '../components/MyCards.vue'
import TransactionDetail from '../components/TransactionDetail.vue'
import { useAuthStore } from '@/stores/authStore'
import Settings from '../views/Settings.vue'
import Notifications from '@/components/Notifications.vue'


// const routes = [
//   { path: '/', redirect: '/login' },
//   { path: '/login', component: LoginPage },
//   { path: '/signup', component: SignupPage },
//   { path: '/home', component: HomePage, meta: { requiresAuth: true } },
//   { path: '/transactions', component: AllTransactions, meta: { requiresAuth: true } },
//   { path: '/my-cards', component: MyCards, meta: { requiresAuth: true } },
//   { path: '/transaction-detail/:id', name: 'TransactionDetail', component: TransactionDetail, meta: { requiresAuth: true } },
//   { path: '/settings', component: Settings, meta: { requiresAuth: true } },
//   { path: '/notifications', component: Notifications, meta: { requiresAuth: true } },
// ]

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/home', component: HomePage },
  { path: '/transactions', component: AllTransactions },
  { path: '/my-cards', component: MyCards },
  { path: '/transaction-detail/:id', name: 'TransactionDetail', component: TransactionDetail },
  { path: '/settings', component: Settings },
  { path: '/notifications', component: Notifications },
]


const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach(async (to, from, next) => {

  const authStore = useAuthStore()
  await authStore.restoreAuthState()

  
  if(to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ path: '/login' })

  } else if (to.path === '/login' && authStore.isAuthenticated) {
    next({ path: '/home' })

  } else {
    next()
  }
})

export default router