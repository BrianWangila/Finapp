import { createRouter, createWebHistory } from 'vue-router'
import AllTransactions from '../views/AllTransactions.vue'
import LoginPage from '../views/LoginPage.vue'
import HomePage from '../components/HomePage.vue'
import SignupPage from '../views/SignupPage.vue'
import MyCards from '../components/MyCards.vue'
import TransactionDetail from '../components/TransactionDetail.vue'
import { useTransactionStore } from '../stores/transactionStore'
import { useAuthStore } from '@/stores/authStore'


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/home', component: HomePage, meta: { requiresAuth: true } },
  { path: '/transactions', component: AllTransactions, meta: { requiresAuth: true }},
  { path: '/my-cards', component: MyCards, meta: { requiresAuth: true } },
  { path: '/transaction-detail/:id', component: TransactionDetail, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if(to.meta.requiresAuth && !auth.isAuthenticated) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router