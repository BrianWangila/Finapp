import { createRouter, createWebHistory } from 'vue-router'
import Home from '../App.vue'
import AllTransactions from '../views/AllTransactions.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/transactions', component: AllTransactions }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
